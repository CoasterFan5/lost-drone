import type { GameData } from '../mapManager/gameData';

const newGameData = {
	meta: {
		name: 'New Game',
		seed: 0,
		id: Date.now().toString(16),
		version: 1
	},
	data: {
		map: {},
		playerData: {
			x: 0,
			y: 0,
			facing: 0
		},
		tickables: {}
	}
};

const LOCAL_STORAGE_KEYS = {
	activeGame: 'activeGame'
};

export const saveManager = {
	saveGame(data: GameData) {
		const s = JSON.stringify(data);
		localStorage.setItem(data.meta.id, s);
		this.setActiveGame(data.meta.id);
	},
	hasSaveGame() {
		return !!localStorage.getItem(LOCAL_STORAGE_KEYS.activeGame);
	},
	tryLoad() {
		const activeGame = localStorage.getItem(LOCAL_STORAGE_KEYS.activeGame);
		if (!activeGame) {
			return { ...newGameData };
		}

		const d = localStorage.getItem(activeGame);
		if (!d) {
			return { ...newGameData };
		}

		return JSON.parse(d) as GameData;
	},
	setActiveGame(id: string) {
		localStorage.setItem(LOCAL_STORAGE_KEYS.activeGame, id);
	}
};
