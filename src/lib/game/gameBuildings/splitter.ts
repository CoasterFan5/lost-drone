import { GameBuilding, type TickMethodParams } from './utils/BehaviorBase';
import imageData from '$lib/assets/Splitter.png';
import { getNextTile, getRightTIle } from './utils/getDirectionTile';

export class Splitter extends GameBuilding {
	name = 'Splitter';
	private DEFAULT_COOLDOWN = 1_000;
	private cooldown = 0;
	private htmlImage: HTMLImageElement | undefined = undefined;
	private lastDirection: 'top' | 'side' = 'side';
	description = 'Distributes items to both sides';

	constructor() {
		super();
		this.cooldown = this.DEFAULT_COOLDOWN;
	}

	new() {
		return new Splitter();
	}

	override tick({ thisTile, mapManager, x, y, delta }: TickMethodParams) {
		this.cooldown -= delta;
		if (this.cooldown <= 0) {
			if (this.lastDirection == 'side') {
				this.lastDirection = 'top';
				const nextTile = getNextTile(x, y, thisTile.data.facing, mapManager);
				if (nextTile && !nextTile.data.holding && thisTile.data.holding && nextTile.data.building) {
					nextTile.setHolding(thisTile.data.holding);
					thisTile.clearHolding();
					this.cooldown = this.DEFAULT_COOLDOWN;
				}
			} else {
				this.lastDirection = 'side';
				const nextTile = getRightTIle(x, y, thisTile.data.facing, mapManager);
				if (nextTile && !nextTile.data.holding && thisTile.data.holding && nextTile.data.building) {
					nextTile.setHolding(thisTile.data.holding);
					thisTile.clearHolding();
					this.cooldown = this.DEFAULT_COOLDOWN;
				}
			}
		}
	}

	override placeAction() {
		this.cooldown = this.DEFAULT_COOLDOWN;
	}

	override getRenderer() {
		if (!this.htmlImage) {
			this.htmlImage = new Image();
			this.htmlImage.src = imageData;
		}
		return this.htmlImage;
	}
}
