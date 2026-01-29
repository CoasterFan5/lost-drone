import { createNoise2D, type NoiseFunction2D } from 'simplex-noise';
import { UiManager } from '../uiManager/uiManager';
import { tileManager, type FacingDirection, type TerrainType, type TileData } from './tileManager';
import { getTileSize } from './tileSize';
import { ObjectiveManager } from '../objectiveManager/objectiveManager';
import { normalizeToTile } from '$lib/utils/normalize';
import type { GameData } from './gameData';
import Alea from 'alea';
import type { GameBuilding } from '../gameBuildings/gameBuildings';
import { gameBuildingBehaviorMap } from '../gameBuildings/gameBuildingBehaviorBase';
import { saveManager } from '../saveManager/saveManager';

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
		building?: GameBuilding;
		facing?: 'n' | 'e' | 's' | 'w';
		cooldown?: number;
		holding?: GameItem;
	};
};

export type GameMapType = Record<number, Record<number, TileData>>;

export class GameMapManager {
	private noisePatterns: Record<TerrainType, NoiseFunction2D>;
	private gameData: GameData;
	public uiManager: UiManager = new UiManager();
	private canvasDimensions: {
		width: number;
		height: number;
	} = { width: 0, height: 0 };

	private cursorData: {
		x: number;
		y: number;
		selectedBuilding?: GameBuilding;
		selectedDirection: FacingDirection;
	} = { x: 0, y: 0, selectedDirection: 'n' };

	constructor() {
		this.gameData = saveManager.tryLoad();

		this.noisePatterns = {
			iron_ore: createNoise2D(Alea(this.gameData.meta.seed)),
			copper_ore: createNoise2D(Alea(this.gameData.meta.seed + 1))
		};

		console.log(this.gameData.data.tickables);

		setInterval(() => {
			saveManager.saveGame(this.gameData);
		}, 5_000);
	}

	getTile(x: number, y: number) {
		if (this.gameData.data.map[x] && this.gameData.data.map[x][y]) {
			return this.gameData.data.map[x][y];
		} else {
			return this.generateTile(x, y);
		}
	}

	generateTile(x: number, y: number) {
		if (!this.gameData.data.map[x]) {
			this.gameData.data.map[x] = {};
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

		this.gameData.data.map[x][y] = {
			facing: 'n',
			x,
			y,
			terrain: terrain
		};
		return this.gameData.data.map[x][y];
	}

	setCanvasDimensions(width: number, height: number) {
		this.canvasDimensions.width = width;
		this.canvasDimensions.height = height;
	}

	tick(delta: number, tickId: number, objectiveManager: ObjectiveManager) {
		for (const item in this.gameData.data.tickables) {
			const tickable = this.gameData.data.tickables[item];
			const tileData = this.gameData.data.map[tickable.x][tickable.y];
			tileManager.tick(tileData, {
				mapManager: this,
				objectiveManager,
				delta,
				tickId
			});
		}
	}

	place(tileData: TileData, x: number, y: number) {
		this.gameData.data.map[x][y] = tileData;

		if (tileData.building) {
			this.gameData.data.tickables[`${x}-${y}`] = {
				x,
				y,
				tileData: tileData
			};
		}
	}

	getPlayerData() {
		return this.gameData.data.playerData;
	}

	getPlayerPosition() {
		return {
			raw: {
				x: this.gameData.data.playerData.x,
				y: this.gameData.data.playerData.y
			},
			tile: {
				x: Math.floor(this.gameData.data.playerData.x / getTileSize()),
				y: Math.floor(this.gameData.data.playerData.y / getTileSize())
			}
		};
	}

	addPlayerPosition(x: number, y: number) {
		this.gameData.data.playerData.x += x;
		this.gameData.data.playerData.y += y;
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
				const inRange = tileManager.inPlayerPlaceRange(currentTile, {
					map: this
				});
				if (this.cursorData.selectedBuilding) {
					const validPlacement =
						gameBuildingBehaviorMap[this.cursorData.selectedBuilding].isValidPlacement(currentTile);

					if (validPlacement && inRange) {
						this.place(
							{
								building: this.cursorData.selectedBuilding,
								buildingData:
									gameBuildingBehaviorMap[this.cursorData.selectedBuilding].initBuildingData(),
								facing: this.cursorData.selectedDirection,
								x: currentTile.x,
								y: currentTile.y,
								terrain: currentTile.terrain
							},
							currentTile.x,
							currentTile.y
						);
					}
				} else {
					tileManager.onClick(currentTile, this);
				}
			} else if (e.button == 2) {
				this.place(
					{
						terrain: currentTile.terrain,
						facing: 'n',
						x: currentTile.x,
						y: currentTile.y
					},
					currentTile.x,
					currentTile.y
				);
			}
		}
	}
}
