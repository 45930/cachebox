<script lang="ts">
	import { locationStore } from '$lib/stores/locationStore';
	import TilePrompt from './[tile_id]/_tilePrompt.svelte';
	import LineBreak from '$lib/lineBreak.svelte';
	import TileInteractions from './[tile_id]/_tileInteractions.svelte';
	import TileMovements from './[tile_id]/_tileMovements.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { openModal } from 'svelte-modals';
	import ClearingKeypadModal from '$lib/modals/clearingKeypadModal.svelte';
	import { loadSnarky, snarkyStore, deployedSnappsStore } from '$lib/stores/minaStore';

	$: isSnarkyLoaded = false;

	onMount(async () => {
		checkSnarkyLoaded();
	});

	const checkSnarkyLoaded = function () {
		if (!isSnarkyLoaded) {
			loadSnarky().then(() => {
				isSnarkyLoaded = true;
			});
		}
	};

	const openClearingModal = () => {
		openModal(ClearingKeypadModal, { onSubmit: onClearingModalSubmit });
	};

	const onClearingModalSubmit = async (key: string) => {
		const escapeGameSnapp = $deployedSnappsStore;
		const winner = await escapeGameSnapp.guessGateKey(key);

		if (winner == 'winner') {
			console.log('winner');
		} else {
			console.log('loser');
		}
	};

	$: tileConfig = $locationStore['clearing'];
</script>

<div class="container flex justify-center flex-wrap">
	<TilePrompt prompt={tileConfig.prompt} />
	<LineBreak />
	{#if isSnarkyLoaded}
		<button on:click={() => openClearingModal()}>Inspect Keypad</button>
	{/if}
	<LineBreak />
	<TileInteractions interactions={tileConfig.interactions} />
	<TileMovements movements={tileConfig.movements} />
</div>
