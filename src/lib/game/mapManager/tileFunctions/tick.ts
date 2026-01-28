import { gameBuildingBehaviorMap } from '$lib/game/gameBuildings/gameBuildingBehaviorBase';
import type { ObjectiveManager } from '$lib/game/objectiveManager/objectiveManager';
import { GameMapManager } from '../mapManager';
import type { TileData } from '../tileManager';

export const tickTile = (
	data: TileData,
	args: {
		mapManager: GameMapManager;
		objectiveManager: ObjectiveManager;
		delta: number;
		tickId: number;
	}
) => {
	if (data.building) {
		gameBuildingBehaviorMap[data.building].tick(
			data,
			args.delta,
			args.mapManager,
			args.objectiveManager
		);
		data.lastTouchedByTick = args.tickId;
	}
};
