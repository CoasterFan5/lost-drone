import { gameBuildingBehaviorMap } from '$lib/game/gameBuildings/gameBuildingBehaviorBase';
import type { GameItem } from '../mapManager';
import type { TileData } from '../tileManager';

export const tileCanHoldItem = (
	data: TileData,
	args: {
		item: GameItem;
	}
) => {
	if (data.building) {
		return gameBuildingBehaviorMap[data.building].canHoldItem(data, args.item);
	} else {
		return !data.holding;
	}
};
