<script lang="ts">
	import { onMount } from 'svelte';
	import { session } from '$app/stores';

	onMount(async () => {
		await getSession();
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

<div>Playing</div>
