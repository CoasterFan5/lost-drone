import { tileManager } from '$lib/game/mapManager/tileManager';
import type { GameBuildingBehavior } from '../gameBuildingBehaviorBase';
import { getNextTileFromThisTile } from '../utils/getDirectionTile';
import imageData from '$lib/assets/Mapping Relay.png';

let htmlImage: HTMLImageElement | undefined = undefined;

const DEFAULT_COOLDOWN = 5_000;

export const mappingRelayBehavior: GameBuildingBehavior = {
	name: 'Mapping Relay',
	description: 'Takes in data drives and outputs mapping data',
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

			if (
				tileManager.canHoldItem(nextTile, {
					item: 'mappingData'
				})
			) {
				tileManager.setHolding(nextTile, {
					item: 'mappingData'
				});
				tileManager.clearHolding(tileData);
				objectiveManager.addScoreToObjectiveTracker('map');
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
		return !tileData.holding && item == 'dataDrive';
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
