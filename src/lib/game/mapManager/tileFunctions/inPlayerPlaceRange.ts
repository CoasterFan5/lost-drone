import type { GameMapManager } from '../mapManager';
import type { TileData } from '../tileManager';

const PLACE_DISTANCE = 5;

export const tileInPlayerPlaceRange = (
	data: TileData,
	args: {
		map: GameMapManager;
	}
) => {
	const playerPosition = args.map.getPlayerPosition();

	return (
		Math.abs(playerPosition.tile.x - data.x) <= PLACE_DISTANCE &&
		Math.abs(playerPosition.tile.y - data.y) <= PLACE_DISTANCE
	);
};
