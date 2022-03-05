<script lang="ts">
	import { onMount } from 'svelte';
	import { session } from '$app/stores';

	import { openModal } from 'svelte-modals';

	import NewGameModal from '$lib/modals/newGameModal.svelte';
	import { goto } from '$app/navigation';

	let newPlayerName: string;

	onMount(async () => {
		await getSession();
	});

	const getSession = async function () {
		const sessionResp = await fetch('/gameState', {
			headers: { 'content-type': 'application/json' },
			method: 'GET'
		});

		const data = await sessionResp.json();

		console.log(data);
		$session = data;
	};

	const openNewGameModal = function () {
		openModal(NewGameModal, { getSession: getSession });
	};
</script>

<div class="justify-center flex flex-wrap">
	<div
		on:click={() => openNewGameModal()}
		class="justify-center mx-auto mb-16 border-2 border-solid border-sky-800 rounded px-2 py-2"
	>
		<p class="text-xl font-bold">NEW GAME</p>
	</div>
	<div class="w-full" />
	{#if $session && $session.user != 'null_user'}
		<div
			on:click={() => goto('/play/beach_landing')}
			class="justify-center mx-auto mb-16 border-2 border-solid border-sky-800 rounded px-2 py-2"
		>
			<p class="text-xl font-bold">CONTINUE GAME</p>
			<p>Current Game State: {JSON.stringify($session)}</p>
		</div>
	{/if}
</div>
