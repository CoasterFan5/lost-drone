import type { GameBuilding } from '../gameBuildings/utils/BehaviorBase';
import type { ObjectiveManager } from '../objectiveManager/objectiveManager';
import type { GameItem, GameMapManager } from './mapManager';

export type FacingDirection = 'n' | 'e' | 's' | 'w';
export const terrainTypes = ['iron_ore', 'copper_ore'] as const;
export type TerrainType = (typeof terrainTypes)[number];

type TileManagerData = {
	building?: GameBuilding;
	facing: FacingDirection;
	holding?: GameItem;
	lastTouchedByTick?: number;
	x: number;
	y: number;
	terrain?: TerrainType;
};

export class TileManager {
	data: TileManagerData;
	constructor(args: TileManagerData) {
		this.data = args;
	}

	tick(args: {
		mapManager: GameMapManager;
		objectiveManager: ObjectiveManager;
		x: number;
		y: number;
		delta: number;
		tickId: number;
	}) {
		if (this.data.building) {
			this.data.building.tick({ ...args, ...{ thisTile: this } });
			this.data.lastTouchedByTick = args.tickId;
		}
	}

	canHoldItem(item: GameItem) {
		if (this.data.building) {
			return this.data.building.canAcceptItem({
				itemName: item,
				tile: this
			});
		} else {
			return !this.data.holding;
		}
	}

	setHolding(item: GameItem) {
		if (this.data.building) {
			this.data.building.placeAction?.({ thisTile: this });
		}
		this.data.holding = item;
		if (this.data.building) {
			this.data.building.postPlaceAction({ thisTile: this });
		}
	}

	clearHolding() {
		if (this.data.building) {
			this.data.building.placeAction?.({ thisTile: this });
		}
		this.data.holding = undefined;
	}

	setFacing(d: FacingDirection) {
		this.data.facing = d;
	}

	inPlayerPlaceRange({ map }: { map: GameMapManager }): boolean {
		// get the player x y in tiles
		const playerPosition = map.getPlayerPosition();

		return (
			Math.abs(playerPosition.tile.x - this.data.x) <= 5 &&
			Math.abs(playerPosition.tile.y - this.data.y) <= 5
		);
	}

	onClick({ mapManager }: { mapManager: GameMapManager }) {
		this.data.building?.onClick({ mapManager, tileManager: this });
	}
}
