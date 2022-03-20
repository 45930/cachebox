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
	import TilePrompt from './_tilePrompt.svelte';
	import LineBreak from '$lib/lineBreak.svelte';
	import TileInteractions from './_tileInteractions.svelte';
	import TileMovements from './_tileMovements.svelte';
	import { afterNavigate } from '$app/navigation';

	import Canvas from '../canvas/index.svelte';

	export let tile;

	afterNavigate(() => {
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
	<Canvas {tileConfig} />
	<div class="relative bottom-36">
		<div
			id="tile-prompt"
			class="p-2 mb-12 rounded border-neutral-200 border-solid border-2 bg-white opacity-80"
		>
			<TilePrompt prompt={tileConfig.prompt} />
		</div>
		<LineBreak />
		<div
			id="tile-movements"
			class="w-2xl mb-4 p-2 rounded border-neutral-200 border-solid border-2"
		>
			<TileMovements movements={tileConfig.movements} />
		</div>
	</div>
</div>
