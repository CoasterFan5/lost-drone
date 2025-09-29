import type { GameItem } from './mapManager/mapManager';
import ironOreImageData from '$lib/assets/items/iron_ore.png';
import ironPlateImageData from '$lib/assets/items/Iron Plate.png';
import ironGearImageData from '$lib/assets/items/Iron Gear.png';
import ironRodImageData from '$lib/assets/items/Iron Rod.png';
import copperOreImageData from '$lib/assets/items/Copper Ore.png';
import copperPlateImageData from '$lib/assets/items/Copper Plate.png';
import circuitBoardImageData from '$lib/assets/items/CircuitBoard.png';
import dataDriveImageData from '$lib/assets/items/Data Drive.png';
import mappingDataImageData from '$lib/assets/items/Mapping Data.png';

const ironOreImage = new Image();
ironOreImage.src = ironOreImageData;

const ironPlateImage = new Image();
ironPlateImage.src = ironPlateImageData;

const ironGearImage = new Image();
ironGearImage.src = ironGearImageData;

const ironRodImage = new Image();
ironRodImage.src = ironRodImageData;

const copperOreImage = new Image();
copperOreImage.src = copperOreImageData;

const copperPlateImage = new Image();
copperPlateImage.src = copperPlateImageData;

const circuitBoardImage = new Image();
circuitBoardImage.src = circuitBoardImageData;

const dataDriveImage = new Image();
dataDriveImage.src = dataDriveImageData;

const mappingDataImage = new Image();
mappingDataImage.src = mappingDataImageData;

export const itemImageMap: Record<GameItem, HTMLImageElement> = {
	ironOre: ironOreImage,
	ironPlate: ironPlateImage,
	ironGear: ironGearImage,
	ironRod: ironRodImage,
	copperOre: copperOreImage,
	copperPlate: copperPlateImage,
	circuitBoard: circuitBoardImage,
	dataDrive: dataDriveImage,
	mappingData: mappingDataImage
};
