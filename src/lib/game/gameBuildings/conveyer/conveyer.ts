import { tileManager, type TileData } from '$lib/game/mapManager/tileManager';
import type { GameBuildingBehavior } from '../gameBuildingBehaviorBase';
import { getNextTile } from '../utils/getDirectionTile';

import imageData from '$lib/assets/Belt.png';

let htmlImage: HTMLImageElement | undefined = undefined;
const DEFAULT_COOLDOWN = 250;

export const conveyorBehavior: GameBuildingBehavior = {
	name: 'Conveyor',
	description: 'Moves items',
	initBuildingData: () => {
		return {
			cooldownTimer: DEFAULT_COOLDOWN
		};
	},
	tick: (tileData, delta, mapManager) => {
		// handle cooldown
		if (!tileData.buildingData) {
			return;
		}
		tileData.buildingData.cooldownTimer -= delta;
		if (tileData.buildingData.cooldownTimer > 0) {
			return;
		}

		const nextTile = getNextTile(tileData.x, tileData.y, tileData.facing, mapManager);
		if (tileData.holding && nextTile.building) {
			if (
				tileManager.canHoldItem(nextTile, {
					item: tileData.holding
				})
			) {
				tileManager.setHolding(nextTile, {
					item: tileData.holding
				});
				tileManager.clearHolding(tileData);
			}
		}
	},
	getRenderer: () => {
		if (!htmlImage) {
			htmlImage = new Image();
			htmlImage.src = imageData;
		}
		return htmlImage;
	},
	canHoldItem: (tileData: TileData) => {
		return !tileData.holding;
	},
	postPlaceAction(tileData) {
		if (!tileData.buildingData) {
			return;
		}
		tileData.buildingData.cooldownTimer = DEFAULT_COOLDOWN;
	},
	isValidPlacement: () => {
		return true;
	}
};
