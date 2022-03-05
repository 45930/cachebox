<script context="module">
	export const load = async function ({ url, params, fetch, session, context }) {
		return {
			props: {
				tile: params.tile_id
			}
		};
	};
</script>

<script lang="ts">
	import { locationStore } from '$lib/stores/locationStore';
	import TilePrompt from '../_tilePrompt.svelte';
	import LineBreak from '$lib/lineBreak.svelte';
	import TileInteractions from '../_tileInteractions.svelte';
	import TileMovements from '../_tileMovements.svelte';
	import { onMount } from 'svelte';

	export let tile;

	onMount(() => {
		fetch('/gameState', {
			headers: { 'content-type': 'application/json' },
			method: 'PUT',
			body: JSON.stringify({
				tile: tile
			})
		});
	});

	$: tileConfig = $locationStore[tile];
</script>

<div class="container flex justify-center flex-wrap">
	<TilePrompt prompt={tileConfig.prompt} />
	<LineBreak />
	<TileInteractions interactions={tileConfig.interactions} />
	<TileMovements movements={tileConfig.movements} />
</div>
