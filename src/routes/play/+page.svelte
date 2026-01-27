<script>
	import Game from '$lib/game/Game.svelte';
	import { GameMapManager } from '$lib/game/mapManager/mapManager';

	const map = new GameMapManager();
</script>

<Game {map} />
