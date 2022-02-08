<script lang="ts">
	import { deployedSnappsStore } from '$lib/stores/deployedSnappStore';

	import type { MontyHallSnappInterface } from 'src/global';
	import { onMount } from 'svelte';
	import SnappCard from './_SnappCard.svelte';

	let isSnarkyLoaded = false;
	let isSomethingDeployed = false;
	let deployedSnapps = $deployedSnappsStore;

	onMount(async () => {
		loadSnarky().then(() => {
			deploySnapp();
		});
	});

	const deploySnapp = async function () {
		if (Object.keys(deployedSnapps).length == 0) {
			let snappSourceCode = await import('$lib/snapps/montyHallSnapp');
			const storeState = deployedSnapps;

			const montyHallSnapp: MontyHallSnappInterface = await snappSourceCode.deploy();

			storeState[montyHallSnapp.address.toJSON()['g']['x'].slice(0, 10)] = montyHallSnapp;
			deployedSnappsStore.set(storeState);
		}
		isSomethingDeployed = true;
	};

	const loadSnarky = async function () {
		console.log('loading snarky');
		let snappSourceCode = await import('$lib/snapps/montyHallSnapp');
		await snappSourceCode.load();
		isSnarkyLoaded = true;
		console.log('loaded snarky!');
	};
</script>

<div>
	<div class="justify-center mx-auto mb-16">
		<p class="text-xl font-bold">Available Adventures</p>
	</div>
	<div class="container flex justify-center">
		{#if isSomethingDeployed}
			<div class="w-full grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
				{#each Object.keys(deployedSnapps) as address}
					<SnappCard {address} />
				{/each}
			</div>
		{:else}
			<div>Waiting for snarky to load...</div>
		{/if}
	</div>
</div>
