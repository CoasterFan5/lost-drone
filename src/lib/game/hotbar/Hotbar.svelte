<script lang="ts">
	import { gameBuildingBehavior, gameBuildings } from '../gameBuildings/gameBuildings';
	import type { GameMapManager } from '../mapManager/mapManager';

	const {
		mapManager
	}: {
		mapManager: GameMapManager;
	} = $props();

	let hoveredName: string | undefined = $state(undefined);
</script>

<div class="wrap">
	{#if hoveredName}
		{hoveredName}
	{/if}
	<div
		class="buildings"
		onmouseleave={() => {
			hoveredName = undefined;
		}}
		role={null}
	>
		{#each gameBuildings as b (b)}
			{@const building = new gameBuildingBehavior[b]()}
			{@const buildingImage = building.getRenderer()}
			<button
				class="item"
				onclick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					mapManager.setSelectedBuilding(building);
				}}
				onmouseenter={() => {
					hoveredName = building.name;
				}}
			>
				<img src={buildingImage.src} alt={b} />
			</button>
		{/each}
	</div>
</div>

<style lang="scss">
	.wrap {
		position: fixed;
		display: flex;
		flex-direction: column;
		left: 50%;
		bottom: 1rem;
		transform: translate(-50%, 0);
		color: var(--white);
		align-items: center;
		justify-content: center;
	}

	.buildings {
		display: flex;
		flex-direction: row;

		border: 3px solid black;
		border-right: 0px solid black;
	}
	.item {
		all: unset;
		display: flex;
		box-sizing: border-box;
		height: 50px;
		width: 53px;
		background: rgba(0, 0, 0, 0.2);
		border-right: 3px solid black;
		display: flex;
		align-items: center;
		justify-content: center;

		&:hover {
			background: rgba(0, 0, 0, 0.6);
		}
	}
</style>
