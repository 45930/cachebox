<script lang="ts">
	import { locationStore } from '$lib/stores/locationStore';
	import LineBreak from '$lib/lineBreak.svelte';
	import TileMovements from './[tile_id]/_tileMovements.svelte';
	import { afterNavigate, goto } from '$app/navigation';

	import Static from '$lib/canvases/static.svelte';
	import { session } from '$app/stores';
	import type { Signature } from 'snarkyjs';

	import { loadSnarky, snarkyStore } from '$lib/stores/minaStore';
	import { onMount } from 'svelte';
	import { openModal } from 'svelte-modals';
	import HintsModal from '$lib/modals/hintsModal.svelte';
	import WinnersModal from '$lib/modals/winnersModal.svelte';

	const tile = 'in_shack';

	onMount(async () => {
		checkSnarkyLoaded();
	});

	afterNavigate(async () => {
		await updateSession();
	});

	const updateSession = async function () {
		const sessionResp = await fetch('/gameState', {
			headers: { 'content-type': 'application/json' },
			method: 'PUT',
			body: JSON.stringify({
				hasVisitedClearing: true
			})
		});

		const data = await sessionResp.json();

		$session = data;
	};

	const checkSnarkyLoaded = function () {
		if (!$snarkyStore) {
			loadSnarky();
		}
	};

	$: tileConfig = $locationStore[tile];

	const openHintsModal = () => {
		openModal(HintsModal);
	};

	const openWinnersModal = () => {
		openModal(WinnersModal);
	};
</script>

<div class="container flex justify-center flex-wrap">
	<Static templateName={tile} />
	<div class="relative bottom-96 bg-white p-10 opacity-80 w-2xl h-80 text-center mx-auto">
		Welcome to the shack. Find hints or check the proofs of past winners here.
		<LineBreak />
		<div class="flex justify-between mt-8 mb-48">
			<div on:click={() => openHintsModal()} class="p-12 border border-solid border-black rounded">
				Hints
			</div>
			<div
				on:click={() => openWinnersModal()}
				class="p-12 border border-solid border-black rounded"
			>
				Winners
			</div>
		</div>
		<div
			id="tile-movements"
			class="w-2xl mb-4 p-2 rounded border-neutral-200 border-solid border-2"
		>
			<TileMovements movements={tileConfig.movements} />
		</div>
	</div>
</div>
