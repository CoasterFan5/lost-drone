import { tileManager } from '$lib/game/mapManager/tileManager';
import type { GameBuildingBehavior } from '../gameBuildingBehaviorBase';
import { furnaceRecipes } from '../utils/furnaceRecipies';
import { getNextTileFromThisTile } from '../utils/getDirectionTile';
import imageData from '$lib/assets/Smelter.png';

let htmlImage: HTMLImageElement | undefined = undefined;
const DEFAULT_COOLDOWN = 2_000;

export const furnaceBehavior: GameBuildingBehavior = {
	name: 'Furnace',
	description: 'Smelt ores',
	tick(tileData, delta, mapManager, objectiveManager) {
		if (!tileData.buildingData) {
			return;
		}

		if (!tileData.holding) {
			return;
		}

		tileData.buildingData.cooldownTimer -= delta;
		if (tileData.buildingData.cooldownTimer <= 0) {
			const nextTile = getNextTileFromThisTile(tileData, mapManager);
			const product = furnaceRecipes[tileData.holding];

			if (
				product &&
				tileManager.canHoldItem(nextTile, {
					item: product
				})
			) {
				tileManager.setHolding(nextTile, {
					item: product
				});
				tileManager.clearHolding(tileData);
				objectiveManager.addScoreToObjectiveTracker('smelt');
			}
		}
	},
	placeAction(tileData) {
		if (!tileData.buildingData) {
			return;
		}
		tileData.buildingData.cooldownTimer = DEFAULT_COOLDOWN;
	},
	getRenderer() {
		if (!htmlImage) {
			htmlImage = new Image();
			htmlImage.src = imageData;
		}
		return htmlImage;
	},
	canHoldItem(tileData, item) {
		return !tileData.holding && !!furnaceRecipes[item];
	},
	isValidPlacement() {
		return true;
	},
	initBuildingData() {
		return {
			cooldownTimer: DEFAULT_COOLDOWN
		};
	}
};
