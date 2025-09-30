import { getNextTile } from './utils/getDirectionTile';
import imageData from '$lib/assets/Miner.png';

import {
	GameBuilding,
	type IsValidPlacementParams,
	type TickMethodParams
} from './utils/BehaviorBase';
import type { TerrainType } from '../mapManager/tileManager';
import type { GameItem } from '../mapManager/mapManager';

const terrainOresMap: Partial<Record<TerrainType, GameItem>> = {
	iron_ore: 'ironOre',
	copper_ore: 'copperOre'
};

export class Miner extends GameBuilding {
	name = 'Miner';
	description = "Mines ores it's placed on top of";
	private htmlImage: HTMLImageElement | undefined = undefined;
	private cooldown = 0;
	private DEFAULT_COOLDOWN = 5_000;
	constructor() {
		super();
		this.cooldown = this.DEFAULT_COOLDOWN;
	}

	new() {
		return new Miner();
	}

	tick({ thisTile, mapManager, x, y, delta, objectiveManager }: TickMethodParams) {
		this.cooldown -= delta;
		if (this.cooldown <= 0) {
			const nt = getNextTile(x, y, thisTile.data.facing, mapManager);
			if (nt && !nt.data.holding && nt.data.building) {
				if (!!thisTile.data.terrain && terrainOresMap[thisTile.data.terrain]) {
					nt.setHolding(terrainOresMap[thisTile.data.terrain]!);
					if (thisTile.data.terrain == 'iron_ore') {
						objectiveManager.addScoreToObjectiveTracker('iron_ore_harvested');
					}
				}
				this.cooldown = this.DEFAULT_COOLDOWN;
			}
		}
	}

	placeAction() {}

	getRenderer() {
		if (!this.htmlImage) {
			this.htmlImage = new Image();
			this.htmlImage.src = imageData;
		}
		return this.htmlImage;
	}

	override isValidPlacement({ tile }: IsValidPlacementParams): boolean {
		return !!tile.data.terrain && !!terrainOresMap[tile.data.terrain];
	}
}
