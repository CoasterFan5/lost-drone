import type { GameItem } from '$lib/game/mapManager/mapManager';

export const craftingRecipeNames = [
	'ironGear',
	'ironRod',
	'circuitBoard',
	'dataDrive',
	'communicationsModule',
	'mappingModule'
] as const;
export type RecipeName = (typeof craftingRecipeNames)[number];

export const craftingRecipes: Record<
	RecipeName,
	{
		prettyName: string;
		requirements: GameItem[];
		product: GameItem;
	}
> = {
	ironGear: {
		prettyName: 'Iron Gear',
		requirements: ['ironPlate', 'ironPlate'],
		product: 'ironGear'
	},
	ironRod: {
		prettyName: 'Iron Rod',
		requirements: ['ironPlate'],
		product: 'ironRod'
	},
	circuitBoard: {
		prettyName: 'Circuit Board',
		requirements: ['ironPlate', 'copperPlate'],
		product: 'circuitBoard'
	},
	dataDrive: {
		prettyName: 'Data Drive',
		requirements: ['circuitBoard', 'ironGear'],
		product: 'dataDrive'
	},
	communicationsModule: {
		prettyName: 'Communications Module',
		requirements: ['dataDrive', 'ironRod'],
		product: 'communicationsModule'
	},
	mappingModule: {
		prettyName: 'Mapping Module',
		requirements: ['communicationsModule', 'mappingData'],
		product: 'mappingModule'
	}
} as const;
