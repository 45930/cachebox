<script lang="ts">
	import { locationStore } from '$lib/stores/locationStore';
	import TilePrompt from './[tile_id]/_tilePrompt.svelte';
	import LineBreak from '$lib/lineBreak.svelte';
	import TileInteractions from './[tile_id]/_tileInteractions.svelte';
	import TileMovements from './[tile_id]/_tileMovements.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { openModal } from 'svelte-modals';
	import KeypadModal from '$lib/modals/keypadModal.svelte';
	import { loadSnarky, snarkyStore, deployedSnappsStore } from '$lib/stores/minaStore';
	import LabHall from '$lib/canvases/static.svelte';
	import type { Signature } from 'snarkyjs';
	import { session } from '$app/stores';
	import type { KeyProof } from '$lib/snarkyUtils/keyProof';

	onMount(async () => {
		checkSnarkyLoaded();
	});

	const checkSnarkyLoaded = function () {
		if (!$snarkyStore) {
			loadSnarky();
		}
	};

	const addProofToSession = async function (proof: KeyProof) {
		const sessionResp = await fetch('/gameState', {
			headers: { 'content-type': 'application/json' },
			method: 'PUT',
			body: JSON.stringify({
				labProof: proof
			})
		});

		const data = await sessionResp.json();

		$session = data;
	};

	const openClearingModal = () => {
		openModal(KeypadModal, { onSubmit: onClearingModalSubmit });
	};

	const onClearingModalSubmit = async (key: string) => {
		const escapeGameSnapp = $deployedSnappsStore;
		const winner = await escapeGameSnapp.guessLabKey(key);

		if (!winner) {
			goto('/play/loser');
		} else {
			await addProofToSession(winner);
			goto('/play/winner');
		}
	};

	$: tileConfig = $locationStore['lab_hall'];
</script>

<div class="container flex justify-center flex-wrap">
	<LabHall templateName="lab_hall" />
	<div class="relative bottom-36">
		<div
			id="tile-prompt"
			class="p-2 mb-12 rounded border-neutral-200 border-solid border-2 bg-white opacity-80"
		>
			<TilePrompt prompt={tileConfig.prompt} />
		</div>
		<LineBreak />
		{#if $snarkyStore}
			<button on:click={() => openClearingModal()}>Inspect Keypad</button>
		{:else}
			<p>Waiting for snarky...</p>
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
