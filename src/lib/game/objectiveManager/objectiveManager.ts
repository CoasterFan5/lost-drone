export const trackers = [
	'wasd',
	'iron_ore_harvested',
	'smelt',
	'craft_circuit_board',
	'map'
] as const;
type RequirementTracker = Partial<Record<ObjectiveTracker, number>>;

export type ObjectiveTracker = (typeof trackers)[number];

export type ObjectiveTarget = {
	name: string;
	label: string;
	start?: RequirementTracker;
	requirements: RequirementTracker;
};

const objectives: {
	name: string;
	targets: ObjectiveTarget[];
}[] = [
	{
		name: 'Tutorial',
		targets: [
			{
				name: 'wasd',
				label: 'Usd WASD to move around.',
				start: {
					wasd: 500
				},
				requirements: {
					wasd: 500
				}
			},
			{
				name: 'building',
				label: 'Use the bottom bar to build a miner and harvest one iron ore.',
				requirements: {
					iron_ore_harvested: 1
				}
			},
			{
				name: 'smelting',
				label: 'Smelt the iron ore in a furnace',
				requirements: {
					smelt: 1
				}
			},
			{
				name: 'crafting',
				label: 'Craft 3 circuit boards',
				start: {
					craft_circuit_board: 3
				},
				requirements: {
					craft_circuit_board: 3
				}
			}
		]
	},
	{
		name: 'Map the world',
		targets: [
			{
				name: '10map',
				label: 'Make 10 mapping data items',
				start: {
					map: 10
				},
				requirements: { map: 10 }
			}
		]
	}
];

export class ObjectiveManager {
	private currentObjective = 0;
	private currentTarget = 0;
	private currentTally: RequirementTracker = {};

	constructor() {
		this.updateRequirements();
	}

	private updateRequirements() {
		this.currentTally = this.getCurrentTarget().requirements;
	}

	getCurrentObjectiveName() {
		return objectives[this.currentObjective].name;
	}

	getCurrentTarget() {
		return objectives[this.currentObjective].targets[this.currentTarget];
	}

	addScoreToObjectiveTracker(tracker: ObjectiveTracker, score?: number) {
		if (!score) {
			score = 1;
		}

		if (this.currentTally[tracker]) {
			this.currentTally[tracker] -= 1;
		}

		if (this.checkIfObjectiveComplete()) {
			this.advanceObjective();
		}
	}

	checkIfObjectiveComplete() {
		let done = true;
		for (const key in this.currentTally) {
			const item = this.currentTally[key as ObjectiveTracker];
			if (item != undefined && item > 0) {
				done = false;
			}
		}
		return done;
	}

	advanceObjective() {
		if (objectives[this.currentObjective].targets[this.currentTarget + 1] != undefined) {
			this.currentTarget += 1;
			this.updateRequirements();
			return;
		}

		if (objectives[this.currentObjective + 1] != undefined) {
			this.currentObjective += 1;
			this.currentTarget = 0;
			this.updateRequirements();
			return;
		}
	}

	getProgress(): number {
		const currentTarget = this.getCurrentTarget();
		if (!currentTarget.start) {
			return 0;
		}

		let sum = 0;
		let items = 0;

		for (const key in currentTarget.start) {
			const realKey = key as ObjectiveTracker;
			sum += 1 - currentTarget.requirements[realKey]! / currentTarget.start[realKey]!;
			items += 1;
		}

		return sum / items;
	}
}
