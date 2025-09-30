import type { ObjectiveTarget } from './objectiveManager';

export const objectives: {
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
				label: 'Make 10 mapping data item',
				start: {
					map: 10
				},
				requirements: { map: 10 }
			}
		]
	},
	{
		name: 'Houston?',
		targets: [
			{
				name: '10com',
				label: 'Make 10 communication modules',
				start: {
					com: 10
				},
				requirements: { com: 10 }
			}
		]
	},
	{
		name: 'Transmit Location',
		targets: [
			{
				name: '10com',
				label: 'Put 100 mapping modules into the communications relay.',
				start: {
					communicationsRelay: 100
				},
				requirements: { communicationsRelay: 100 }
			}
		]
	},
	{
		name: 'Congratulations',
		targets: [
			{
				name: 'finalMessage',
				label: 'The star ship is on the way. (There is nothing after this point)',
				requirements: { impossible: 1 }
			}
		]
	}
];
