import type { GameMapType } from './mapManager';
import type { TileData } from './tileManager';

export type GameData = {
	meta: {
		id: string;
		version: number;
		name: string;
		seed: number;
	};
	data: {
		map: GameMapType;
		playerData: {
			x: number;
			y: number;
			facing: number;
		};
		tickables: Record<
			string,
			{
				x: number;
				y: number;
				tileData: TileData;
			}
		>;
	};
};
