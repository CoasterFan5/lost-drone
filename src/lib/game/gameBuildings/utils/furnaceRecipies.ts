import type { GameItem } from '$lib/game/mapManager/mapManager';

export const furnaceRecipies: Partial<Record<GameItem, GameItem>> = {
	ironOre: 'ironPlate',
	copperOre: 'copperPlate'
};
