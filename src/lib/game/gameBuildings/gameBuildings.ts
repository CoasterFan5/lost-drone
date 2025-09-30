import { CommunicationsRelay } from './communicationsRelay';
import { Conveyer } from './conveyer';
import { Crafter } from './crafter/crafter';
import { Furnace } from './furnace';
import { MappingRelay } from './mappingRelay';
import { Miner } from './miner';
import { Splitter } from './splitter';
import type { GameBuilding } from './utils/BehaviorBase';

export const gameBuildings = [
	'Conveyer',
	'Miner',
	'Furnace',
	'Splitter',
	'Crafter',
	'MappingRelay',
	'CommunicationRelay'
] as const;

export type GameBuildingName = (typeof gameBuildings)[number];

export const gameBuildingBehavior: Record<GameBuildingName, new () => GameBuilding> = {
	Conveyer: Conveyer,
	Furnace: Furnace,
	Miner: Miner,
	Splitter: Splitter,
	Crafter: Crafter,
	MappingRelay: MappingRelay,
	CommunicationRelay: CommunicationsRelay
};
