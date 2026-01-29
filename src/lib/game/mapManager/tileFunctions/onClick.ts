import { gameBuildingBehaviorMap } from '$lib/game/gameBuildings/gameBuildingBehaviorBase';
import type { GameMapManager } from '../mapManager';
import type { TileData } from '../tileManager';

export const tileOnClick = (data: TileData, mapManager: GameMapManager) => {
	if (data.building) {
		gameBuildingBehaviorMap[data.building].onClick?.(data, mapManager);
	}
};
