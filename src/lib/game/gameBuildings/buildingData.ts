import type { GameItem } from '../mapManager/mapManager';
import type { RecipeName } from './utils/recipes';

export type BuildingData = {
	cooldownTimer: number;
	inventory?: Partial<Record<GameItem, number>>;
	selectedRecipe?: RecipeName;
};
