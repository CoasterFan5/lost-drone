import type { FacingDirection, TileData } from '../tileManager';

export const tileSetFacing = (data: TileData, d: FacingDirection) => {
	data.facing = d;
};
