import type { FacingDirection } from '../mapManager/tileManager';
import { tileSize } from '../mapManager/tileSize';

export const imageManipulationValues: Record<
	FacingDirection,
	{
		r: number;
		xOffset: number;
		yOffset: number;
	}
> = {
	n: {
		r: 0,
		xOffset: 0,
		yOffset: 0
	},
	e: {
		r: Math.PI / 2,
		xOffset: 0,
		yOffset: -tileSize
	},
	s: {
		r: Math.PI,
		xOffset: -tileSize,
		yOffset: -tileSize
	},
	w: {
		r: Math.PI * 1.5,
		xOffset: -tileSize,
		yOffset: 0
	}
};
