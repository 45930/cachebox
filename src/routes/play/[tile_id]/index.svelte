<script context="module">
	export const load = async function ({ url, params, fetch, session, context }) {
		let tileType = '';

		switch (params.tile_id) {
			case 'beach_landing':
			case 'beach_1':
			case 'beach_2':
				tileType = 'beach';
				break;
			case 'cliff_top':
				tileType = 'cliff';
				break;
			case 'shack':
				tileType = 'shack';
				break;
			default:
				tileType = 'static';
		}

		return {
			props: {
				tile: params.tile_id,
				tileType: tileType
			}
		};
	};
</script>

<script lang="ts">
	import { locationStore } from '$lib/stores/locationStore';
	import TilePrompt from './_tilePrompt.svelte';
	import LineBreak from '$lib/lineBreak.svelte';
	import TileMovements from './_tileMovements.svelte';
	import { afterNavigate } from '$app/navigation';

	import Beach from '$lib/canvases/beach.svelte';

	import Canvas from '../canvas/index.svelte';
	import Static from '$lib/canvases/static.svelte';
	import Shack from '$lib/canvases/shack.svelte';
	import Cliff from '$lib/canvases/cliff.svelte';

	export let tile;
	export let tileType;

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
	{#if tileType == 'beach'}
		<Beach templateName={tile} />
	{:else if tileType == 'cliff'}
		<Cliff templateName={tile} />
	{:else if tileType == 'shack'}
		<Shack />
	{:else}
		<Static templateName={tile} />
	{/if}
	<div class="relative bottom-36">
		{#if tileConfig.prompt.length > 0}
			<div
				id="tile-prompt"
				class="p-2 mb-12 rounded border-neutral-200 border-solid border-2 bg-white opacity-80"
			>
				<TilePrompt prompt={tileConfig.prompt} />
			</div>
		{:else}
			<div id="tile-prompt" class="p-2 mb-36" />
		{/if}
		<LineBreak />
		<div
			id="tile-movements"
			class="w-2xl mb-4 p-2 rounded border-neutral-200 border-solid border-2"
		>
			<TileMovements movements={tileConfig.movements} />
		</div>
	</div>
</div>
