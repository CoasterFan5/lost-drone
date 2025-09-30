let tileSize = 48;

export const getTileSize = () => {
	return tileSize;
};

export const setTileSize = (n: number) => {
	tileSize = Math.max(16, Math.min(Math.round(n), 256));
};
