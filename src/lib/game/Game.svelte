<script lang="ts">
	import { KeyboardManager } from '$lib/game/keyboardManager';
	import { GameMapManager } from '$lib/game/mapManager/mapManager';
	import MapRender from '$lib/game/MapRender.svelte';
	import Hotbar from './hotbar/Hotbar.svelte';
	import { ObjectiveManager } from './objectiveManager/objectiveManager';

	const {
		map
	}: {
		map: GameMapManager;
	} = $props();

	const objectiveManager = new ObjectiveManager();
	const keyboardManager = new KeyboardManager();

	$effect(() => {
		document.addEventListener('keydown', (e) => {
			keyboardManager.keyDown(e);
		});
		document.addEventListener('keyup', (e) => {
			keyboardManager.keyUp(e);
		});
		document.addEventListener('mousemove', (e) => {
			map.setCursorPosition(e.clientX, e.clientY);
		});

		document.addEventListener('click', () => {
			map.handleClick();
		});
	});

	keyboardManager.onKeyDown('r', () => {
		map.rotatePlacementDirection();
	});
</script>

<MapRender mapManager={map} {keyboardManager} {objectiveManager} />
<Hotbar mapManager={map} />

<style lang="scss">
	:global(body) {
		background: black;
		margin: 0;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
