import { getNextTile } from './utils/getDirectionTile';
import imageData from '$lib/assets/Mapping Relay.png';
import {
	GameBuilding,
	type CanAcceptItemParams,
	type TickMethodParams
} from './utils/BehaviorBase';

export class MappingRelay extends GameBuilding {
	private htmlImage: HTMLImageElement | undefined = undefined;
	private cooldown = 0;
	private DEFAULT_COOLDOWN = 5_000;

	constructor() {
		super();
		this.cooldown = this.DEFAULT_COOLDOWN;
	}

	new() {
		return new MappingRelay();
	}

	tick({ thisTile, mapManager, x, y, delta }: TickMethodParams) {
		this.cooldown -= delta;
		if (this.cooldown <= 0) {
			const nextTile = getNextTile(x, y, thisTile.data.facing, mapManager);
			if (
				nextTile &&
				thisTile.data.holding &&
				thisTile.data.holding == 'dataDrive' &&
				nextTile.canHoldItem('mappingData')
			) {
				nextTile.setHolding('mappingData');
				thisTile.clearHolding();
			}
		}
	}

	placeAction() {
		this.cooldown = this.DEFAULT_COOLDOWN;
	}

	getRenderer() {
		if (!this.htmlImage) {
			this.htmlImage = new Image();
			this.htmlImage.src = imageData;
		}
		return this.htmlImage;
	}

	canAcceptItem({ tile, itemName }: CanAcceptItemParams) {
		return !tile.data.holding && itemName == 'dataDrive';
	}
}
