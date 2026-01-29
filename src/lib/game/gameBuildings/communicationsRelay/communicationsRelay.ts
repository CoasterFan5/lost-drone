import type { GameBuildingBehavior } from '../gameBuildingBehaviorBase';
import imageData from '$lib/assets/Communications Relay.png';

let htmlImage: HTMLImageElement | undefined = undefined;

export const communicationsRelayBehavior: GameBuildingBehavior = {
	name: 'Communications Relay',
	description: 'Takes in mapping modules and transmits them to the Starship.',
	tick(tileData, delta, mapManager, objectiveManager) {
		if (tileData.holding) {
			tileData.holding = undefined;
			objectiveManager.addScoreToObjectiveTracker('communicationsRelay');
		}
	},
	placeAction() {},
	getRenderer() {
		if (!htmlImage) {
			htmlImage = new Image();
			htmlImage.src = imageData;
		}
		return htmlImage;
	},
	canHoldItem(tileData, item) {
		return !tileData.holding && item == 'mappingModule';
	},
	isValidPlacement() {
		return true;
	},
	initBuildingData() {
		return {
			cooldownTimer: 0
		};
	}
};
