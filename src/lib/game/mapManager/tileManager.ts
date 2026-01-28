import type { BuildingData } from '../gameBuildings/buildingData';
import type { GameBuilding } from '../gameBuildings/gameBuildings';
import type { GameItem } from './mapManager';
import { tileCanHoldItem } from './tileFunctions/canHolditem';
import { tileClearHolding } from './tileFunctions/clearHolding';
import { tileInPlayerPlaceRange } from './tileFunctions/inPlayerPlaceRange';
import { tileOnClick } from './tileFunctions/onClick';
import { tileSetFacing } from './tileFunctions/setFacing';
import { tileSetHolding } from './tileFunctions/setHolding';
import { tickTile } from './tileFunctions/tick';

export type FacingDirection = 'n' | 'e' | 's' | 'w';
export const terrainTypes = ['iron_ore', 'copper_ore'] as const;
export type TerrainType = (typeof terrainTypes)[number];

export type TileData = {
	building?: GameBuilding;
	buildingData?: BuildingData;
	facing: FacingDirection;
	holding?: GameItem;
	lastTouchedByTick?: number;
	x: number;
	y: number;
	terrain?: TerrainType;
};

export const tileManager = {
	tick: tickTile,
	canHoldItem: tileCanHoldItem,
	setHolding: tileSetHolding,
	clearHolding: tileClearHolding,
	setFacing: tileSetFacing,
	inPlayerPlaceRange: tileInPlayerPlaceRange,
	onClick: tileOnClick
};
