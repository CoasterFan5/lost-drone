<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '@fontsource/ibm-plex-mono';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}

<style lang="scss">
	:global(body) {
		font-family: 'IBM Plex Mono', monospace;
		--gray: #323232;
		--gray2: #414a4c;
		--white: #f5f5f5;
	}
</style>
