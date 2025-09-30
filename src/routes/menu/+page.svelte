<script lang="ts">
</script>

<button class="wrap">
	<div class="menu">
		<h2>Lost Drone Protocol</h2>
		<a href="/play"><h3>Play</h3></a>
		<a href="https://github.com/CoasterFan5/duke-jam-4" target="_blank"><h3>Source Code</h3></a>
	</div>
</button>

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

	a {
		background: var(--gray2);
		border: 1px solid var(--gray2);
		color: var(--white);
		text-decoration: none;
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
			margin: 0;
		}
	}
</style>
