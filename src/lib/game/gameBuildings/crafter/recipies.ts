import type { GameItem } from '$lib/game/mapManager/mapManager';

export const craftingRecipieNames = ['ironGear', 'ironRod', 'circuitBoard', 'dataDrive'] as const;
export type RecipieName = (typeof craftingRecipieNames)[number];

export const craftingRecipies: Record<
	RecipieName,
	{
		requirements: GameItem[];
		product: GameItem;
	}
> = {
	ironGear: {
		requirements: ['ironPlate', 'ironPlate'],
		product: 'ironGear'
	},
	ironRod: {
		requirements: ['ironPlate'],
		product: 'ironRod'
	},
	circuitBoard: {
		requirements: ['ironPlate', 'copperPlate'],
		product: 'circuitBoard'
	},
	dataDrive: {
		requirements: ['circuitBoard', 'ironPlate'],
		product: 'dataDrive'
	}
} as const;
