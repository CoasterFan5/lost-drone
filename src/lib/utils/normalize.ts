import { getTileSize } from '$lib/game/mapManager/tileSize';

/*
  Takes a number and converts it to be the offset of a tile
*/
export const normalizeToTile = (val: number) => {
	const trueValue = val % getTileSize();
	if (trueValue < 0) {
		return trueValue + getTileSize();
	} else {
		return trueValue;
	}
};
