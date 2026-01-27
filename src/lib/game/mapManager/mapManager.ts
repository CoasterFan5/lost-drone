import { createNoise2D, type NoiseFunction2D } from 'simplex-noise';
import { type GameBuildingName } from '../gameBuildings/gameBuildings';
import type { GameBuilding } from '../gameBuildings/utils/BehaviorBase';
import { UiManager } from '../uiManager/uiManager';
import { TileManager, type FacingDirection, type TerrainType } from './tileManager';
import { getTileSize } from './tileSize';
import type { ObjectiveManager } from '../objectiveManager/objectiveManager';
import { normalizeToTile } from '$lib/utils/normalize';

export const itemList = [
	'ironOre',
	'ironPlate',
	'ironGear',
	'ironRod',
	'copperOre',
	'copperPlate',
	'circuitBoard',
	'dataDrive',
	'mappingData',
	'communicationsModule',
	'mappingModule'
] as const;
export type GameItem = (typeof itemList)[number];

export type Tile = {
	data: {
		building?: GameBuildingName;
		facing?: 'n' | 'e' | 's' | 'w';
		cooldown?: number;
		holding?: GameItem;
	};
};

export type GameMapType = Record<number, Record<number, TileManager>>;

export class GameMapManager {
	size = 100;
	private noisePatterns: Record<TerrainType, NoiseFunction2D> = {
		iron_ore: createNoise2D(),
		copper_ore: createNoise2D()
	};
	public uiManager: UiManager = new UiManager();
	private map: GameMapType;
	private canvasDimensions: {
		width: number;
		height: number;
	} = { width: 0, height: 0 };
	private playerData: {
		x: number;
		y: number;
		facing: number;
	};
	private cursorData: {
		x: number;
		y: number;
		selectedBuilding?: GameBuilding;
		selectedDirection: FacingDirection;
	} = { x: 0, y: 0, selectedDirection: 'n' };

	private tickables: Record<
		string,
		{
			x: number;
			y: number;
			tileManager: TileManager;
		}
	> = {};

	constructor() {
		this.map = {};
		this.playerData = {
			x: 0,
			y: 0,
			facing: 0
		};
	}

	getTile(x: number, y: number) {
		if (this.map[x] && this.map[x][y]) {
			return this.map[x][y];
		} else {
			return this.generateTile(x, y);
		}
	}

	generateTile(x: number, y: number) {
		if (!this.map[x]) {
			this.map[x] = {};
		}

		let terrain: TerrainType | undefined = undefined;
		let highest = 0;

		for (const ttype in this.noisePatterns) {
			const terrainType = ttype as TerrainType;
			const value = this.noisePatterns[terrainType](x / 10, y / 10);
			if (value > 0.8 && value > highest) {
				highest = value;
				terrain = terrainType;
			}
		}

		this.map[x][y] = new TileManager({
			facing: 'n',
			x,
			y,
			terrain: terrain
		});
		return this.map[x][y];
	}

	getSize() {
		return this.size;
	}

	setCanvasDimensions(width: number, height: number) {
		this.canvasDimensions.width = width;
		this.canvasDimensions.height = height;
	}

	tick(delta: number, tickId: number, objectiveManager: ObjectiveManager) {
		for (const item in this.tickables) {
			const tile = this.tickables[item];
			tile.tileManager.tick({
				mapManager: this,
				objectiveManager,
				x: tile.x,
				y: tile.y,
				delta,
				tickId
			});
		}
	}

	place(item: TileManager, x: number, y: number) {
		this.map[x][y] = item;

		if (item.data.building) {
			this.tickables[`${x}-${y}`] = {
				x,
				y,
				tileManager: item
			};
		}
	}

	getPlayerData() {
		return this.playerData;
	}

	getPlayerPosition() {
		return {
			raw: {
				x: this.playerData.x,
				y: this.playerData.y
			},
			tile: {
				x: Math.floor(this.playerData.x / getTileSize()),
				y: Math.floor(this.playerData.y / getTileSize())
			}
		};
	}

	addPlayerPosition(x: number, y: number) {
		this.playerData.x += x;
		this.playerData.y += y;
	}

	setCursorPosition(x: number, y: number) {
		this.cursorData.x = x;
		this.cursorData.y = y;
	}

	getTileDetails() {
		const xTiles = Math.ceil(this.canvasDimensions.width / getTileSize());
		const yTiles = Math.ceil(this.canvasDimensions.height / getTileSize());

		const xTilesHalf = Math.floor(xTiles / 2);
		const yTilesHalf = Math.floor(yTiles / 2);

		return {
			xTiles,
			yTiles,
			xTilesHalf,
			yTilesHalf
		};
	}

	getOffsets() {
		const playerPos = this.getPlayerPosition();
		const xOffsetTiles = playerPos.tile.x;
		const xOffsetPx = normalizeToTile(playerPos.raw.x % getTileSize());

		const yOffsetTiles = playerPos.tile.y;
		const yOffsetPx = normalizeToTile(playerPos.raw.y % getTileSize());

		return {
			xOffsetTiles,
			xOffsetPx,
			yOffsetTiles,
			yOffsetPx
		};
	}

	getCursorPosition() {
		const offsets = this.getOffsets();

		return {
			raw: {
				x: this.cursorData.x,
				y: this.cursorData.y
			},
			tile: {
				x: Math.floor((this.cursorData.x + offsets.xOffsetPx) / 48),
				y: Math.floor((this.cursorData.y + offsets.yOffsetPx) / 48)
			}
		};
	}

	setSelectedBuilding(building: GameBuilding) {
		this.cursorData.selectedBuilding = building;
	}

	clearSelectedBuilding() {
		this.cursorData.selectedBuilding = undefined;
	}

	getSelectedBuilding() {
		return this.cursorData.selectedBuilding;
	}

	getSelectedTile() {
		const cursorData = this.getCursorPosition();
		const offsets = this.getOffsets();
		const tileDetails = this.getTileDetails();
		return this.getTile(
			cursorData.tile.x + offsets.xOffsetTiles - tileDetails.xTilesHalf,
			cursorData.tile.y + offsets.yOffsetTiles - tileDetails.yTilesHalf
		);
	}

	rotatePlacementDirection() {
		switch (this.cursorData.selectedDirection) {
			case 'n': {
				this.cursorData.selectedDirection = 'e';
				break;
			}
			case 'e': {
				this.cursorData.selectedDirection = 's';
				break;
			}
			case 's': {
				this.cursorData.selectedDirection = 'w';
				break;
			}
			case 'w': {
				this.cursorData.selectedDirection = 'n';
				break;
			}
		}
	}

	getRotationDirection() {
		return this.cursorData.selectedDirection;
	}

	handleClick(e: MouseEvent) {
		const currentTile = this.getSelectedTile();

		if (currentTile) {
			if (e.button == 0) {
				const inRange = currentTile.inPlayerPlaceRange({ map: this });
				if (this.cursorData.selectedBuilding) {
					const validPlacement = this.cursorData.selectedBuilding.isValidPlacement({
						tile: currentTile,
						gameManager: this
					});

					if (validPlacement && inRange) {
						this.place(
							new TileManager({
								building: this.cursorData.selectedBuilding.new(),
								facing: this.cursorData.selectedDirection,
								x: currentTile.data.x,
								y: currentTile.data.y,
								terrain: currentTile.data.terrain
							}),
							currentTile.data.x,
							currentTile.data.y
						);
					}
				} else {
					currentTile.onClick({
						mapManager: this
					});
				}
			} else if (e.button == 2) {
				this.place(
					new TileManager({
						terrain: currentTile.data.terrain,
						facing: 'n',
						x: currentTile.data.x,
						y: currentTile.data.y
					}),
					currentTile.data.x,
					currentTile.data.y
				);
			}
		}
	}
}
