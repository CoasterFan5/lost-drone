import imageData from '$lib/assets/Communications Relay.png';
import {
	GameBuilding,
	type CanAcceptItemParams,
	type TickMethodParams
} from './utils/BehaviorBase';

export class CommunicationsRelay extends GameBuilding {
	name = 'Communications Relay';
	description = 'Takes in mapping modules and transmits them to the Starship.';
	private htmlImage: HTMLImageElement | undefined = undefined;

	constructor() {
		super();
	}

	new() {
		return new CommunicationsRelay();
	}

	tick({ thisTile, objectiveManager }: TickMethodParams) {
		if (thisTile.data.holding) {
			thisTile.data.holding = undefined;
			objectiveManager.addScoreToObjectiveTracker('communicationsRelay');
		}
	}

	placeAction() {}

	getRenderer() {
		if (!this.htmlImage) {
			this.htmlImage = new Image();
			this.htmlImage.src = imageData;
		}
		return this.htmlImage;
	}

	canAcceptItem({ tile, itemName }: CanAcceptItemParams) {
		return !tile.data.holding && itemName == 'mappingModule';
	}
}
