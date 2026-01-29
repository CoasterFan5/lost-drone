import { gameBuildingBehaviorMap } from '$lib/game/gameBuildings/gameBuildingBehaviorBase';
import type { TileData } from '../tileManager';

export const tileClearHolding = (data: TileData) => {
	if (data.building) {
		gameBuildingBehaviorMap[data.building].placeAction?.(data);
	}
	data.holding = undefined;
	if (data.building) {
		gameBuildingBehaviorMap[data.building].postPlaceAction?.(data);
	}
};
