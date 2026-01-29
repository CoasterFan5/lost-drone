import type { GameMapManager } from '$lib/game/mapManager/mapManager';
import type { FacingDirection, TileData } from '$lib/game/mapManager/tileManager';

export const getPrevTile = (
	x: number,
	y: number,
	facing: FacingDirection,
	gameMapManager: GameMapManager
) => {
	switch (facing) {
		case 'n': {
			return gameMapManager.getTile(x, y + 1);
		}
		case 's': {
			return gameMapManager.getTile(x, y - 1);
		}
		case 'e': {
			return gameMapManager.getTile(x - 1, y);
		}
		case 'w': {
			return gameMapManager.getTile(x + 1, y - 1);
		}
	}
};

/**
 *
 * @param x - The tilebase x
 * @param y - The tilebase y
 * @param facing - North south east west
 * @param gameMapManager
 * @returns
 */
export const getNextTile = (
	x: number,
	y: number,
	facing: FacingDirection,
	gameMapManager: GameMapManager
) => {
	switch (facing) {
		case 'n': {
			return gameMapManager.getTile(x, y - 1);
		}
		case 's': {
			return gameMapManager.getTile(x, y + 1);
		}
		case 'e': {
			return gameMapManager.getTile(x + 1, y);
		}
		case 'w': {
			return gameMapManager.getTile(x - 1, y);
		}
	}
};

export const getNextTileFromThisTile = (tileData: TileData, gameMapManager: GameMapManager) => {
	return getNextTile(tileData.x, tileData.y, tileData.facing, gameMapManager);
};

export const getRightTIle = (
	x: number,
	y: number,
	facing: FacingDirection,
	gameMapManager: GameMapManager
) => {
	switch (facing) {
		case 'n': {
			return gameMapManager.getTile(x + 1, y);
		}
		case 's': {
			return gameMapManager.getTile(x - 1, y);
		}
		case 'e': {
			return gameMapManager.getTile(x, y + 1);
		}
		case 'w': {
			return gameMapManager.getTile(x, y - 1);
		}
	}
};
