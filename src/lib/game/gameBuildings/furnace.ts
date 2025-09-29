import { getNextTile } from './utils/getDirectionTile';
import imageData from '$lib/assets/Smelter.png';
import type { GameItem } from '../mapManager/mapManager';
import {
	GameBuilding,
	type CanAcceptItemParams,
	type TickMethodParams
} from './utils/BehaviorBase';

const productMap: Partial<Record<GameItem, GameItem>> = {
	ironOre: 'ironPlate',
	copperOre: 'copperPlate'
} as const;

export class Furnace extends GameBuilding {
	name = 'Furnace';
	private htmlImage: HTMLImageElement | undefined = undefined;
	private cooldown = 0;
	private DEFAULT_COOLDOWN = 2_000;

	constructor() {
		super();
	}

	new() {
		return new Furnace();
		this.cooldown = this.DEFAULT_COOLDOWN;
	}

	tick({ thisTile, mapManager, x, y, delta }: TickMethodParams) {
		this.cooldown -= delta;
		if (this.cooldown <= 0) {
			const nextTile = getNextTile(x, y, thisTile.data.facing, mapManager);
			if (
				nextTile &&
				thisTile.data.holding &&
				productMap[thisTile.data.holding] &&
				nextTile.canHoldItem(productMap[thisTile.data.holding]!)
			) {
				const product = productMap[thisTile.data.holding];
				if (product) {
					nextTile.setHolding(product);
					thisTile.clearHolding();
				}
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
		return !tile.data.holding && productMap[itemName] != undefined;
	}
}
