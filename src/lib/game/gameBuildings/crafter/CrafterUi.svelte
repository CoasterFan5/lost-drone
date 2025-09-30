<script lang="ts">
	import { itemImageMap } from '$lib/game/colorMaps';
	import UiBase from '$lib/game/uiManager/UiBase.svelte';
	import type { UiManager } from '$lib/game/uiManager/uiManager';
	import type { Crafter } from './crafter';
	import { craftingRecipieNames, craftingRecipies, type RecipieName } from './recipies';

	const {
		crafter,
		uiManager
	}: {
		uiManager: UiManager;
		crafter: Crafter;
	} = $props();

	let selectedRecipie: RecipieName | undefined = $state(crafter.getRecipie());
</script>

<UiBase>
	<div class="wrap">
		<div class="recipieOptions">
			{#each craftingRecipieNames as rName (rName)}
				{@const recipieDetails = craftingRecipies[rName]}
				<button
					class="recipie itemBox"
					onclick={() => {
						selectedRecipie = rName;
					}}
				>
					<img src={itemImageMap[recipieDetails.product].src} alt={recipieDetails.product} />
				</button>
			{/each}
		</div>
		<div class="recipieDetails">
			{#if selectedRecipie}
				{@const recipieDetails = craftingRecipies[selectedRecipie]}
				<div class="top">
					<p>{recipieDetails.prettyName}</p>
					<div class="recipieRequirements">
						{#each recipieDetails.requirements as req, i (i)}
							<div class="inputs itemBox">
								<img src={itemImageMap[req].src} alt={req} />
							</div>
						{/each}
						<div class="arrow itemBox">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
								><path
									fill="currentColor"
									d="M14.422 5.487a.75.75 0 0 0-1.06-.034v5.797H4.5a.75.75 0 0 0 0 1.5h8.862v5.797a.75.75 0 0 0 1.06-.034l5.625-6a.75.75 0 0 0 0-1.026z"
								/></svg
							>
						</div>

						<div class="outputs itemBox">
							<img src={itemImageMap[recipieDetails.product].src} alt={recipieDetails.product} />
						</div>
					</div>
				</div>

				<button
					onclick={() => {
						crafter.setRecipie(selectedRecipie!);
						uiManager.clearUi();
					}}
				>
					Confirm
				</button>
			{/if}
		</div>
	</div>
</UiBase>

<style lang="scss">
	.wrap {
		width: 50%;
		height: 50%;
		background: var(--gray);
		display: flex;
		flex-direction: row;
		align-items: start;
		justify-content: start;
		color: var(--white);
	}

	.itemBox {
		--c: var(--gray2);
		--cW: color-mix(in srgb, 1% white, var(--gray2));
		box-sizing: border-box;
		background-image: linear-gradient(0deg, var(--cW), var(--c));
		border-top: 1px solid rgba(0, 0, 0, 0.25);
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		aspect-ratio: 1/1;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.recipieOptions {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(4rem, 1fr));
		width: 100%;
		padding: 0.25rem;
		gap: 0.1rem;
	}

	.recipie {
		all: unset;

		padding: 0.25rem;
		width: 100%;
		aspect-ratio: 1/1;
		box-sizing: border-box;
		background-image: linear-gradient(0deg, var(--cW), var(--c));
		border-top: 1px solid rgba(0, 0, 0, 0.25);
		border-bottom: 1px solid rgba(255, 255, 255, 0.15);

		img {
			height: 100%;
			width: 100%;
		}
	}

	.recipieDetails {
		width: 30rem;
		border-left: 1px solid black;
		padding: 1rem;
		box-sizing: border-box;
		height: 100%;
		display: flex;
		flex-direction: column;

		.top {
			height: 100%;
			flex-grow: 1;
			display: flex;
			flex-direction: column;
		}

		button {
			all: unset;
			color: var(--white);
			padding: 0.5rem;
			box-sizing: border-box;
			border-radius: 0.1rem;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			border: 1px solid var(--gray2);
			background: var(--gray2);
			cursor: pointer;

			&:hover {
				background: var(--gray);
			}
		}
	}

	.recipieRequirements {
		display: flex;
		flex-direction: row;
		gap: 0.25rem;
		height: 2.25rem;

		.arrow {
			aspect-ratio: 1/1;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 0;
			font-size: 2rem;
			color: white;
		}
	}
</style>
