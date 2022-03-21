<script lang="ts">
	import { onMount } from 'svelte';
	import { session } from '$app/stores';
	import { goto } from '$app/navigation';

	onMount(async () => {
		await getSession();

		if ($session.user != 'null_user') {
			const tile = $session.tile || 'beach_landing';
			goto(`/play/${tile}`);
		} else {
			goto('/');
		}
	});

	const getSession = async function () {
		const sessionResp = await fetch('/gameState', {
			headers: { 'content-type': 'application/json' },
			method: 'GET'
		});

		const data = await sessionResp.json();

		$session = data;
	};
</script>

<div class="contianer" />
