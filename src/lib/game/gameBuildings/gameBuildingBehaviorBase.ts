import type { TileData } from '$lib/game/mapManager/tileManager';
import type { GameItem, GameMapManager } from '../mapManager/mapManager';
import type { ObjectiveManager } from '../objectiveManager/objectiveManager';
import type { BuildingData } from './buildingData';
import { communicationsRelayBehavior } from './communicationsRelay/communicationsRelay';
import { conveyerBehavior } from './conveyer/conveyer';
import { crafterBehavior } from './crafter/crafter';
import { furnaceBehavior } from './furnace/furnace';
import type { GameBuilding } from './gameBuildings';
import { mappingRelayBehavior } from './mappingRelay/mappingRelay';
import { minerBehavior } from './miner/miner';

export type GameBuildingBehavior = {
	name: string;
	description: string;
	getRenderer: () => HTMLImageElement;
	initBuildingData: () => BuildingData;
	tick: (
		tileData: TileData,
		delta: number,
		gameMapManager: GameMapManager,
		objectiveManager: ObjectiveManager
	) => void;
	canHoldItem: (tileData: TileData, item: GameItem) => boolean;
	placeAction?: (tileData: TileData) => void;
	postPlaceAction?: (tileData: TileData) => void;
	isValidPlacement: (tileData: TileData) => boolean;
	onClick?: (tileData: TileData, mapManager: GameMapManager) => void;
	getUi?: () => void;
};

export const gameBuildingBehaviorMap: Record<GameBuilding, GameBuildingBehavior> = {
	Miner: minerBehavior,
	Conveyer: conveyerBehavior,
	Furnace: furnaceBehavior,
	Crafter: crafterBehavior,
	MappingRelay: mappingRelayBehavior,
	CommunicationRelay: communicationsRelayBehavior
};
