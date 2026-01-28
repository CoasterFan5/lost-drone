<script lang="ts">
	import type { GameItem, GameMapManager } from './mapManager/mapManager';
	import playerImage from '$lib/assets/Player.png';
	import cursorImage from '$lib/assets/cursor.png';
	import cursorOutOfRangeImageData from '$lib/assets/cursor_out_of_range.png';
	import cursorGoodImageData from '$lib/assets/cursor_good.png';
	import cursorInteractImageData from '$lib/assets/cursor_interact.png';
	import groundTile from '$lib/assets/ground.png';
	import { KeyboardManager } from './keyboardManager';
	import { tickPlayerMovement } from './playerManager/tickPlayerMovement';
	import { getTileSize } from './mapManager/tileSize';
	import { renderTiles } from './renderHelpers/renderTiles';
	import { imageManipulationValues } from './renderHelpers/imageManipulationValues';
	import { itemImageMap } from './colorMaps';
	import { ObjectiveManager, type ObjectiveTarget } from './objectiveManager/objectiveManager';
	import { tileManager, type TileData } from './mapManager/tileManager';
	import { gameBuildingBehaviorMap } from './gameBuildings/gameBuildingBehaviorBase';

	let uiKey = $state(0);
	let hoveringTile: TileData | undefined = $state(undefined);
	let objectiveName: string = $state('');
	let target: ObjectiveTarget | undefined = $state();
	let progress: number = $state(0);

	const {
		mapManager,
		keyboardManager,
		objectiveManager
	}: {
		objectiveManager: ObjectiveManager;
		mapManager: GameMapManager;
		keyboardManager: KeyboardManager;
	} = $props();

	let canvas: HTMLCanvasElement | undefined = $state();

	let groundTileHtmlImage: HTMLImageElement | undefined = undefined;

	const tickRender = () => {
		if (!groundTileHtmlImage) {
			groundTileHtmlImage = new Image();
			groundTileHtmlImage.src = groundTile;
		}

		if (canvas) {
			canvas.height = canvas.clientHeight;
			canvas.width = canvas.clientWidth;

			mapManager.setCanvasDimensions(canvas.width, canvas.height);

			const ctx = canvas.getContext('2d');
			if (ctx) {
				const tileDetails = mapManager.getTileDetails();
				const offsets = mapManager.getOffsets();

				renderTiles({
					canvas,
					ctx,
					mapManager,
					...tileDetails,
					...offsets
				});
				ctx.fillStyle = 'black';

				//render ghost
				const cPos = mapManager.getCursorPosition();
				const building = mapManager.getSelectedBuilding();
				if (building) {
					const imageManipulation = imageManipulationValues[mapManager.getRotationDirection()];
					ctx.save();
					ctx.translate(
						cPos.tile.x * getTileSize() - offsets.xOffsetPx,
						cPos.tile.y * getTileSize() - offsets.yOffsetPx
					);
					ctx.rotate(imageManipulation.r);
					ctx.globalAlpha = 0.5;
					const buildingImage = gameBuildingBehaviorMap[building].getRenderer();
					ctx.drawImage(
						buildingImage,
						imageManipulation.xOffset,
						imageManipulation.yOffset,
						getTileSize(),
						getTileSize()
					);
					ctx.restore();
				}

				//render cursor

				const selectedTile = mapManager.getSelectedTile();
				hoveringTile = selectedTile;
				const cursorHtmlImage = new Image();
				const selectedBuilding = mapManager.getSelectedBuilding();
				if (selectedBuilding && selectedTile) {
					if (
						tileManager.inPlayerPlaceRange(selectedTile, {
							map: mapManager
						}) &&
						gameBuildingBehaviorMap[selectedBuilding].isValidPlacement(selectedTile)
					) {
						cursorHtmlImage.src = cursorGoodImageData;
					} else {
						cursorHtmlImage.src = cursorOutOfRangeImageData;
					}
				} else {
					if (
						selectedTile &&
						selectedTile.building &&
						gameBuildingBehaviorMap[selectedTile.building].onClick
					) {
						hoveringTile = selectedTile;
						cursorHtmlImage.src = cursorInteractImageData;
					} else {
						cursorHtmlImage.src = cursorImage;
					}
				}

				ctx.drawImage(
					cursorHtmlImage,
					Math.floor(cPos.tile.x * getTileSize() - offsets.xOffsetPx),
					Math.floor(cPos.tile.y * getTileSize() - offsets.yOffsetPx),
					getTileSize(),
					getTileSize()
				);

				//render player
				const playerHtmlImage = new Image();
				playerHtmlImage.src = playerImage;
				mapManager.getPlayerData();
				ctx.drawImage(
					playerHtmlImage,
					canvas.clientWidth / 2 - getTileSize() / 2,
					canvas.clientHeight / 2 - getTileSize() / 2,
					getTileSize(),
					getTileSize()
				);

				// render ui elements
				if (mapManager.uiManager.needsRendering()) {
					uiKey += 1;
				}

				//objectives
				objectiveName = objectiveManager.getCurrentObjectiveName();
				target = objectiveManager.getCurrentTarget();
				progress = objectiveManager.getProgress();
			}
		}
	};

	let lastD = 0;
	const renderTickWrap = (d: number) => {
		const diff = d - lastD;
		mapManager.tick(diff, d, objectiveManager);
		tickPlayerMovement(keyboardManager, mapManager, diff, objectiveManager);
		lastD = d;

		if (diff > 16.6666666667) {
			console.warn('17ms tick');
		}

		tickRender();
		requestAnimationFrame((d) => {
			renderTickWrap(d);
		});
	};

	$effect(() => {
		renderTickWrap(0);
	});
</script>

{#key uiKey}
	{@const details = mapManager.uiManager.getUi()}
	{@const CustomComp = details?.component}
	{#if CustomComp}
		<CustomComp {...details.props} />
	{/if}
{/key}
<div class="hoverManager">
	<div class="section">
		<p>Objective: <span class="objective">{objectiveName}</span></p>
		<p>{target?.label}</p>
		{#if target?.start != undefined}
			<div class="progress" style="--p: {progress * 100}%"></div>
		{/if}
	</div>
	{#if hoveringTile?.terrain != undefined}
		<div class="section">
			<p>Terrain: {hoveringTile?.terrain}</p>
		</div>
	{/if}
	{#if hoveringTile?.building}
		<div class="section">
			<p>Hovering: <span class="objective">{hoveringTile.building}</span></p>
			{#if hoveringTile.buildingData?.inventory}
				{@const i = Object.entries(hoveringTile.buildingData.inventory)}
				{#if i.length > 0}
					<p>Holding:</p>
					{#each i as [item, quanitity], index (index)}
						<div class="inventoryItem">
							<img src={itemImageMap[item as GameItem].src} alt={item} />
							<span class="label">{item}({quanitity})</span>
						</div>
					{/each}
				{/if}
			{/if}
		</div>
	{/if}
</div>
<canvas bind:this={canvas}> </canvas>

<style lang="scss">
	canvas {
		width: 100%;
		height: 100vh;
	}

	.hoverManager {
		position: fixed;
		display: flex;
		flex-direction: column;
		right: 0px;
		top: 0px;
		padding: 0.5rem;
		width: 20rem;
		background: var(--gray);
		color: var(--white);
		gap: 0.25rem;

		p {
			margin: 0;
			text-align: left;
		}

		.progress {
			width: 100%;
			background: #002400;
			height: 0.5rem;
			position: relative;
			border-radius: 0.1rem;

			&::after {
				content: '';
				position: absolute;
				left: 0px;
				top: 0px;
				width: var(--p);
				height: 100%;
				background: #008000;
				border-radius: 0.1rem;
			}
		}

		.inventoryItem {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: start;
			position: relative;
			aspect-ratio: 1/1;
			height: 2rem;
			width: 100%;

			.label {
				position: relative;
				right: 0px;
				bottom: 0px;
				background: rgba(0, 0, 0, 0.25);
			}
		}
	}
</style>
