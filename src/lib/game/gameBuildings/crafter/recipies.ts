import type { GameItem } from '$lib/game/mapManager/mapManager';

export const craftingRecipieNames = [
	'ironGear',
	'ironRod',
	'circuitBoard',
	'dataDrive',
	'communicationsModule'
] as const;
export type RecipieName = (typeof craftingRecipieNames)[number];

export const craftingRecipies: Record<
	RecipieName,
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
		requirements: ['circuitBoard', 'ironPlate'],
		product: 'dataDrive'
	},
	communicationsModule: {
		prettyName: 'Communications Module',
		requirements: ['dataDrive', 'ironRod'],
		product: 'communicationsModule'
	}
} as const;
