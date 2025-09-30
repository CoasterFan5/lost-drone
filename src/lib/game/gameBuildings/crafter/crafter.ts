import type { GameItem } from '../../mapManager/mapManager';
import imageData from '$lib/assets/Crafter.png';
import {
	GameBuilding,
	type CanAcceptItemParams,
	type GetUiParams,
	type OnClickParams,
	type PlaceActionParams,
	type TickMethodParams
} from '../utils/BehaviorBase';
import { getNextTile } from '../utils/getDirectionTile';
import CrafterUi from './CrafterUi.svelte';
import { craftingRecipies, type RecipieName } from './recipies';

let image: HTMLImageElement | undefined = undefined;

export class Crafter extends GameBuilding {
	name = 'Crafter';
	private storage: Partial<Record<GameItem, { count: number; max: number }>> = {
		ironPlate: {
			max: 4,
			count: 0
		}
	};

	private selectedRecipie?: RecipieName = 'ironGear';

	constructor() {
		super();
	}

	override new() {
		return new Crafter();
	}

	override tick({ x, y, thisTile, mapManager }: TickMethodParams) {
		if (this.selectedRecipie) {
			const recipie = craftingRecipies[this.selectedRecipie];

			const realCounts: Partial<Record<GameItem, { seen: boolean; realCount: number }>> = {};
			let allowed = true;

			for (const item of recipie.requirements) {
				if (this.storage[item]) {
					if (!realCounts[item]) {
						realCounts[item] = {
							seen: true,
							realCount: this.storage[item].count
						};
					}
					realCounts[item].realCount -= 1;
					if (realCounts[item].realCount < 0) {
						allowed = false;
						break;
					}
				}
			}

			if (allowed) {
				const product = recipie.product;
				const nextTile = getNextTile(x, y, thisTile.data.facing, mapManager);
				if (nextTile && nextTile.canHoldItem(product)) {
					nextTile.setHolding(product);
					for (const item of recipie.requirements) {
						if (this.storage[item]) {
							this.storage[item].count -= 1;
						}
					}
				}
			}
		}
	}

	override placeAction(): void {}

	override postPlaceAction({ thisTile }: PlaceActionParams): void {
		if (thisTile.data.holding) {
			if (this.storage[thisTile.data.holding]) {
				this.storage[thisTile.data.holding]!.count += 1;
				thisTile.clearHolding();
			}
		}
	}

	override getRenderer(): HTMLImageElement {
		if (!image) {
			image = new Image();
			image.src = imageData;
		}
		return image;
	}

	override canAcceptItem({ tile, itemName }: CanAcceptItemParams): boolean {
		if (tile.data.holding) {
			return false;
		}

		if (!this.storage[itemName]) {
			return false;
		}

		if (this.storage[itemName].count >= this.storage[itemName].max) {
			return false;
		}

		return true;
	}

	override getUi({ uiManager }: GetUiParams) {
		return {
			component: CrafterUi,
			props: {
				uiManager,
				crafter: this
			}
		};
	}

	onClick({ mapManager }: OnClickParams): void {
		mapManager.uiManager.setUi(
			this.getUi({
				uiManager: mapManager.uiManager
			})
		);
	}

	setRecipie(name: RecipieName) {
		this.storage = {};
		for (const req of craftingRecipies[name].requirements) {
			if (!this.storage[req]) {
				this.storage[req] = {
					max: 2,
					count: 0
				};
			} else {
				this.storage[req].count += 2;
			}
		}
		this.selectedRecipie = name;
	}

	getInventory(): [GameItem, number][] {
		const i: [GameItem, number][] = [];
		for (const invItem in this.storage) {
			const record = this.storage[invItem as GameItem];
			if (record && record.count > 0) {
				i.push([invItem as GameItem, record.count]);
			}
		}
		return i;
	}
}
