import type { GameItem } from '$lib/game/mapManager/mapManager';

export const furnaceRecipes: Partial<Record<GameItem, GameItem>> = {
	ironOre: 'ironPlate',
	copperOre: 'copperPlate'
};
