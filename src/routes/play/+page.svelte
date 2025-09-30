<script>
	import Game from '$lib/game/Game.svelte';
	import { GameMapManager } from '$lib/game/mapManager/mapManager';

	const map = new GameMapManager();
	map.generate(100);
</script>

<Game {map} />
