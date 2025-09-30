import type { KeyboardManager } from '../keyboardManager';
import type { GameMapManager } from '../mapManager/mapManager';
import { getTileSize } from '../mapManager/tileSize';
import type { ObjectiveManager } from '../objectiveManager/objectiveManager';

export const tickPlayerMovement = (
	keyManager: KeyboardManager,
	mapManager: GameMapManager,
	delta: number,
	objectiveManager: ObjectiveManager
) => {
	const playerSpeed = getTileSize() * 4; //px / s
	const realDelta = delta / 1_000;
	if (keyManager.isKeyActive('S') || keyManager.isKeyActive('arrowdown')) {
		mapManager.addPlayerPosition(0, realDelta * playerSpeed);
		objectiveManager.addScoreToObjectiveTracker('wasd');
	}
	if (keyManager.isKeyActive('W') || keyManager.isKeyActive('arrowup')) {
		mapManager.addPlayerPosition(0, -realDelta * playerSpeed);
		objectiveManager.addScoreToObjectiveTracker('wasd');
	}
	if (keyManager.isKeyActive('A') || keyManager.isKeyActive('arrowleft')) {
		mapManager.addPlayerPosition(-realDelta * playerSpeed, 0);
		objectiveManager.addScoreToObjectiveTracker('wasd');
	}
	if (keyManager.isKeyActive('D') || keyManager.isKeyActive('arrowright')) {
		mapManager.addPlayerPosition(realDelta * playerSpeed, 0);
		objectiveManager.addScoreToObjectiveTracker('wasd');
	}

	if (keyManager.isKeyActive('escape')) {
		mapManager.clearSelectedBuilding();
		if (mapManager.uiManager.hasUi()) {
			mapManager.uiManager.clearUi();
		}
	}
};
