import { itemImageMap } from '../colorMaps';
import type { GameMapManager } from '../mapManager/mapManager';
import { getTileSize } from '../mapManager/tileSize';
import { imageManipulationValues } from './imageManipulationValues';
import ironOreImageData from '$lib/assets/tiles/iron_ore.png';
import copperOreImageData from '$lib/assets/tiles/Copper Ore.png';
import { gameBuildingBehaviorMap } from '../gameBuildings/gameBuildingBehaviorBase';

const ironOreTileImage = new Image();
ironOreTileImage.src = ironOreImageData;

const copperOreTileImage = new Image();
copperOreTileImage.src = copperOreImageData;

type RenderTilesParams = {
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	mapManager: GameMapManager;
	xTiles: number;
	yTiles: number;
	xTilesHalf: number;
	yTilesHalf: number;
	xOffsetTiles: number;
	xOffsetPx: number;
	yOffsetTiles: number;
	yOffsetPx: number;
};

export const renderTiles = ({
	ctx,
	mapManager,
	xTiles,
	yTiles,
	xTilesHalf,
	yTilesHalf,
	xOffsetTiles,
	yOffsetTiles,
	xOffsetPx,
	yOffsetPx
}: RenderTilesParams) => {
	for (let x = -1; x < xTiles + 1; x++) {
		for (let y = -1; y < yTiles + 1; y++) {
			const tileData = mapManager.getTile(
				x + xOffsetTiles - xTilesHalf,
				y + yOffsetTiles - yTilesHalf
			);

			const trueRenderX = Math.floor(x * getTileSize() - xOffsetPx);
			const trueRenderY = Math.floor(y * getTileSize() - yOffsetPx);

			ctx.fillStyle = '#43264C';
			ctx.fillRect(trueRenderX, trueRenderY, getTileSize(), getTileSize());

			if (tileData.terrain) {
				switch (tileData.terrain) {
					case 'iron_ore': {
						ctx.drawImage(ironOreTileImage, trueRenderX, trueRenderY, getTileSize(), getTileSize());
						break;
					}
					case 'copper_ore': {
						ctx.drawImage(
							copperOreTileImage,
							trueRenderX,
							trueRenderY,
							getTileSize(),
							getTileSize()
						);
						break;
					}
				}
			}

			if (tileData.building) {
				const renderer = gameBuildingBehaviorMap[tileData.building].getRenderer();
				ctx.save();
				const manipulationValues = imageManipulationValues[tileData.facing];
				ctx.translate(trueRenderX, trueRenderY);
				ctx.rotate(manipulationValues.r);
				ctx.translate(manipulationValues.xOffset, manipulationValues.yOffset);
				ctx.drawImage(renderer, 0, 0, getTileSize(), getTileSize());
				ctx.restore();
			}

			if (tileData.holding) {
				const img = itemImageMap[tileData.holding];
				ctx.drawImage(img, trueRenderX, trueRenderY, getTileSize(), getTileSize());
			}
		}
	}

	return;
};
