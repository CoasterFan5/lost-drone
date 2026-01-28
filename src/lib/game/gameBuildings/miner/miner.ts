import type { GameBuildingBehavior } from '../gameBuildingBehaviorBase';
import { getNextTile } from '../utils/getDirectionTile';
import { terrainOresMap } from '../utils/terrainOreMaps';

let htmlImage: HTMLImageElement | undefined = undefined;
import imageData from '$lib/assets/Miner.png';
import { tileManager } from '$lib/game/mapManager/tileManager';

const DEFAULT_COOLDOWN = 5_000;

export const minerBehavior: GameBuildingBehavior = {
	name: 'Miner',
	description: "Mines ores it's placed on top of",
	initBuildingData: () => {
		return {
			cooldownTimer: DEFAULT_COOLDOWN
		};
	},
	getRenderer() {
		if (!htmlImage) {
			htmlImage = new Image();
			htmlImage.src = imageData;
		}
		return htmlImage;
	},
	tick: (tileData, delta, mapManager, objectiveManager) => {
		const buildingData = tileData.buildingData;
		if (!buildingData) {
			return;
		}
		buildingData.cooldownTimer -= delta;

		if (buildingData.cooldownTimer <= 0) {
			buildingData.cooldownTimer = DEFAULT_COOLDOWN;

			if (!tileData.terrain) {
				return;
			}

			const ore = terrainOresMap[tileData.terrain];

			if (!ore) {
				return;
			}

			const nextTile = getNextTile(tileData.x, tileData.y, tileData.facing, mapManager);
			if (
				tileManager.canHoldItem(nextTile, {
					item: ore
				})
			)
				tileManager.setHolding(nextTile, {
					item: ore
				});
			if (tileData.terrain == 'iron_ore') {
				objectiveManager.addScoreToObjectiveTracker('iron_ore_harvested');
			}
		}
	},
	canHoldItem: () => {
		return false;
	},
	isValidPlacement(tileData): boolean {
		return !!tileData.terrain && !!terrainOresMap[tileData.terrain];
	}
};
