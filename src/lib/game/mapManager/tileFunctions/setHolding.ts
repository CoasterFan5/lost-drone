import { gameBuildingBehaviorMap } from '$lib/game/gameBuildings/gameBuildingBehaviorBase';
import type { GameItem } from '../mapManager';
import type { TileData } from '../tileManager';

export const tileSetHolding = (
	data: TileData,
	args: {
		item: GameItem;
	}
) => {
	if (data.building) {
		gameBuildingBehaviorMap[data.building].placeAction?.(data);
	}
	data.holding = args.item;
	if (data.building) {
		gameBuildingBehaviorMap[data.building].postPlaceAction?.(data);
	}
};
