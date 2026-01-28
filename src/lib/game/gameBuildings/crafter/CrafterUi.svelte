<script lang="ts">
	import { itemImageMap } from '$lib/game/colorMaps';
	import { type GameItem } from '$lib/game/mapManager/mapManager';
	import type { TileData } from '$lib/game/mapManager/tileManager';
	import UiBase from '$lib/game/uiManager/UiBase.svelte';
	import type { UiManager } from '$lib/game/uiManager/uiManager';
	import { craftingRecipeNames, craftingRecipes, type RecipeName } from '../utils/recipes';

	const {
		crafterData,
		uiManager
	}: {
		uiManager: UiManager;
		crafterData: TileData;
	} = $props();

	let selectedRecipe: RecipeName | undefined = $state(crafterData.buildingData?.selectedRecipe);
</script>

<UiBase>
	<div class="wrap">
		<div class="recipeOptions">
			{#each craftingRecipeNames as rName (rName)}
				{@const recipeDetails = craftingRecipes[rName]}
				<button
					class="recipe itemBox"
					onclick={() => {
						selectedRecipe = rName;
					}}
				>
					<img src={itemImageMap[recipeDetails.product].src} alt={recipeDetails.product} />
				</button>
			{/each}
		</div>
		<div class="recipeDetails">
			{#if selectedRecipe}
				{@const recipeDetails = craftingRecipes[selectedRecipe]}
				<div class="top">
					<p>{recipeDetails.prettyName}</p>
					<div class="recipeRequirements">
						{#each Object.entries(recipeDetails.requirements) as [item], i (i)}
							<div class="inputs itemBox">
								<img src={itemImageMap[item as GameItem].src} alt={item} />
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
							<img src={itemImageMap[recipeDetails.product].src} alt={recipeDetails.product} />
						</div>
					</div>
				</div>

				<button
					onclick={() => {
						if (!crafterData.buildingData) {
							crafterData.buildingData = {
								cooldownTimer: 0
							};
						}
						crafterData.buildingData.selectedRecipe = selectedRecipe;
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

	.recipeOptions {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(4rem, 1fr));
		width: 100%;
		padding: 0.25rem;
		gap: 0.1rem;
	}

	.recipe {
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

	.recipeDetails {
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

	.recipeRequirements {
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
