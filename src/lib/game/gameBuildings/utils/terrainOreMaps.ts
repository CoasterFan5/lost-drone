import type { GameItem } from '$lib/game/mapManager/mapManager';
import type { TerrainType } from '$lib/game/mapManager/tileManager';

export const terrainOresMap: Partial<Record<TerrainType, GameItem>> = {
	iron_ore: 'ironOre',
	copper_ore: 'copperOre'
};
