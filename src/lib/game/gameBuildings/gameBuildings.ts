export const gameBuildings = [
	'Conveyer',
	'Miner',
	'Furnace',
	'Crafter',
	'MappingRelay',
	'CommunicationRelay'
] as const;

export type GameBuilding = (typeof gameBuildings)[number];
