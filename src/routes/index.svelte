<script lang="ts">
	import { onMount } from 'svelte';
	import { session } from '$app/stores';

	import { openModal } from 'svelte-modals';

	import NewGameModal from '$lib/modals/newGameModal.svelte';
	import { goto } from '$app/navigation';

	onMount(async () => {
		await getSession();

		if ($session.user != 'null_user') {
			goto(`/play`);
		} else {
			openNewGameModal();
		}
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

<div class="contianer" />
