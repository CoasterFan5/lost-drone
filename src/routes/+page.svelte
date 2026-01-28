<script lang="ts">
	import { goto } from '$app/navigation';
	import { saveManager } from '$lib/game/saveManager/saveManager';

	const continueGame = () => {
		goto('/play');
	};

	const newGame = () => {
		saveManager.setActiveGame(Date.now().toString(16));
		goto('/play');
	};

	const hasSaveGame = saveManager.hasSaveGame();
</script>

<div class="wrap">
	<div class="menu">
		<h2>Lost Drone Protocol</h2>
		{#if hasSaveGame}
			<button class="button" onclick={continueGame}><h3>Continue</h3> </button>
		{/if}
		<button class="button" onclick={newGame}><h3>New Game</h3> </button>
		<a class="button" href="https://github.com/CoasterFan5/lost-drone" target="_blank"
			><h3>Source Code</h3></a
		>
		<p>Warning: Mobile is not supported at this time.</p>
	</div>
</div>

<style lang="scss">
	.wrap {
		all: unset;
		box-sizing: border-box;
		background: var(--gray);
		padding: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		height: 100dvh;
		width: 100%;
		color: var(--white);
	}

	.menu {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		align-items: center;
		justify-content: center;
		width: 20rem;
	}

	.button {
		border: 1px solid var(--gray2);
		margin: 0;
		outline: 0px;
		box-sizing: border-box;
		font-weight: 500;
		line-height: normal;
		font-size: 1rem;
		text-decoration: none;

		background: var(--gray2);
		color: var(--white);
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		transition: all cubic-bezier(0.455, 0.03, 0.515, 0.955) 0.1s;

		&:hover {
			background: var(--gray);
		}

		h3 {
			font-family: var(--font);
			margin: 0;
			font-weight: 500;
			text-decoration: none;
		}
	}
</style>
