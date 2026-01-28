import { tileManager, type TileData } from '$lib/game/mapManager/tileManager';
import type { GameBuildingBehavior } from '../gameBuildingBehaviorBase';
import imageData from '$lib/assets/Crafter.png';
import { craftingRecipes } from '../utils/recipes';
import type { GameItem } from '$lib/game/mapManager/mapManager';
import { getNextTileFromThisTile } from '../utils/getDirectionTile';
import CrafterUi from './CrafterUi.svelte';
let image: HTMLImageElement | undefined = undefined;

const getInventory = (tileData: TileData) => {
	if (!tileData.buildingData) {
		tileData.buildingData = {
			cooldownTimer: 0,
			inventory: {}
		};
	}

	if (!tileData.buildingData.inventory) {
		tileData.buildingData.inventory = {};
	}

	return tileData.buildingData.inventory;
};

export const crafterBehavior: GameBuildingBehavior = {
	name: 'Crafter',
	description: 'Crafts items. Click to select a recipie.',
	tick(tileData, delta, mapManager, objectiveManager) {
		if (!tileData.buildingData?.selectedRecipe) {
			return;
		}
		const recipie = tileData.buildingData.selectedRecipe;
		const inventory = getInventory(tileData);
		for (const key in craftingRecipes[recipie].requirements) {
			const item = key as GameItem;
			if ((inventory[item] ?? 0) < craftingRecipes[recipie].requirements[item]!) {
				return;
			}
		}
		const product = craftingRecipes[recipie].product;
		const nextTile = getNextTileFromThisTile(tileData, mapManager);
		if (
			!tileManager.canHoldItem(nextTile, {
				item: product
			})
		) {
			return;
		}

		// were crafting it
		for (const key in craftingRecipes[recipie].requirements) {
			const item = key as GameItem;
			inventory[item]! -= craftingRecipes[recipie].requirements[item]!;
		}
		tileManager.setHolding(nextTile, {
			item: product
		});

		if (product == 'circuitBoard') {
			objectiveManager.addScoreToObjectiveTracker('craft_circuit_board');
		} else if (product == 'communicationsModule') {
			objectiveManager.addScoreToObjectiveTracker('com');
		}
	},
	postPlaceAction(tileData) {
		if (tileData.holding) {
			const inventory = getInventory(tileData);
			if (!inventory[tileData.holding]) {
				inventory[tileData.holding] = 1;
			} else {
				inventory[tileData.holding]! += 1;
			}
			tileManager.clearHolding(tileData);
		}
	},
	getRenderer() {
		if (!image) {
			image = new Image();
			image.src = imageData;
		}
		return image;
	},
	isValidPlacement() {
		return true;
	},
	canHoldItem(tileData, item) {
		if (tileData.holding) {
			return false;
		}

		if (!tileData.buildingData?.selectedRecipe) {
			return false;
		}

		const recipie = craftingRecipes[tileData.buildingData.selectedRecipe];
		const max = (recipie.requirements[item] ?? 0) * 2;
		if ((getInventory(tileData)[item] ?? 0) >= max || max == 0) {
			console.log(getInventory(tileData));
			return false;
		}

		return true;
	},
	initBuildingData() {
		return {
			cooldownTimer: 0,
			inventory: {}
		};
	},
	onClick(tileData, mapManager) {
		mapManager.uiManager.setUi({
			component: CrafterUi,
			props: {
				uiManager: mapManager.uiManager,
				crafterData: tileData
			}
		});
	}
};
