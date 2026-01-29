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
		requirements: Partial<Record<GameItem, number>>;
		product: GameItem;
	}
> = {
	ironGear: {
		prettyName: 'Iron Gear',
		requirements: {
			ironPlate: 2
		},
		product: 'ironGear'
	},
	ironRod: {
		prettyName: 'Iron Rod',
		requirements: {
			ironPlate: 1
		},
		product: 'ironRod'
	},
	circuitBoard: {
		prettyName: 'Circuit Board',
		requirements: {
			ironPlate: 1,
			copperPlate: 1
		},
		product: 'circuitBoard'
	},
	dataDrive: {
		prettyName: 'Data Drive',
		requirements: {
			circuitBoard: 1,
			ironGear: 1
		},
		product: 'dataDrive'
	},
	communicationsModule: {
		prettyName: 'Communications Module',
		requirements: {
			dataDrive: 1,
			ironRod: 1
		},
		product: 'communicationsModule'
	},
	mappingModule: {
		prettyName: 'Mapping Module',
		requirements: {
			communicationsModule: 1,
			mappingData: 1
		},
		product: 'mappingModule'
	}
} as const;
