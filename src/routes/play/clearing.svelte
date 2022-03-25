<script lang="ts">
	import { locationStore } from '$lib/stores/locationStore';
	import TilePrompt from './[tile_id]/_tilePrompt.svelte';
	import LineBreak from '$lib/lineBreak.svelte';
	import TileInteractions from './[tile_id]/_tileInteractions.svelte';
	import TileMovements from './[tile_id]/_tileMovements.svelte';
	import { onMount } from 'svelte';
	import { afterNavigate, goto } from '$app/navigation';
	import { openModal } from 'svelte-modals';
	import ClearingKeypadModal from '$lib/modals/clearingKeypadModal.svelte';
	import { loadSnarky, snarkyStore, deployedSnappsStore } from '$lib/stores/minaStore';
	import Clearing from '$lib/canvases/jungle.svelte';
	import { session } from '$app/stores';
	import type { Signature } from 'snarkyjs';

	$: isSnarkyLoaded = false;

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

	const addSignatureToSession = async function (sig: Signature) {
		const sessionResp = await fetch('/gameState', {
			headers: { 'content-type': 'application/json' },
			method: 'PUT',
			body: JSON.stringify({
				gateSignature: sig
			})
		});

		const data = await sessionResp.json();

		$session = data;
	};

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

		if (!winner) {
			goto('/play/loser');
		} else {
			await addSignatureToSession(winner);
			goto('/play/lab_hall');
		}
	};

	$: tileConfig = $locationStore['clearing'];
</script>

<div class="container flex justify-center flex-wrap">
	<Clearing templateName="clearing" />
	<div class="relative bottom-36">
		<div
			id="tile-prompt"
			class="p-2 mb-12 rounded border-neutral-200 border-solid border-2 bg-white opacity-80"
		>
			<TilePrompt prompt={tileConfig.prompt} />
		</div>
		<LineBreak />
		{#if isSnarkyLoaded}
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
