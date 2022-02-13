<script lang="ts">
	import { deployedSnappsStore } from '$lib/stores/deployedSnappStore';
	import { loadSnarky as loadSnarkyGlobal, snarkyStore } from '$lib/stores/minaStore';

	import type { DeployedSnappInterface, MontyHallSnappInterface } from 'src/global';
	import { onMount } from 'svelte';
	import SnappCard from './_SnappCard.svelte';

	let isSnarkyLoaded = $snarkyStore;
	let deployedSnapps = $deployedSnappsStore;
	let shouldRenderSnarkyComponents = false;

	onMount(async () => {
		loadSnarky().then(() => {
			shouldRenderSnarkyComponents = true;
		});
	});

	const deploySnapp = async function () {
		if (Object.keys(deployedSnapps).length == 0) {
			let snappSourceCode = await import('$lib/snapps/montyHallSnapp');
			let storeState = deployedSnapps;

			const montyHallSnapp: MontyHallSnappInterface = await snappSourceCode.deploy();

			storeState[montyHallSnapp.address.toJSON()['g']['x'].slice(0, 10)] = montyHallSnapp;
			deployedSnappsStore.set(storeState);

			snappSourceCode = await import('$lib/snapps/snappWithString');
			storeState = deployedSnapps;

			const snappWithString: DeployedSnappInterface = await snappSourceCode.deploy();

			storeState[snappWithString.address.toJSON()['g']['x'].slice(0, 10)] = snappWithString;
			deployedSnappsStore.set(storeState);
		}
	};

	const loadSnarky = async function () {
		if (!isSnarkyLoaded) {
			await loadSnarkyGlobal();
			await deploySnapp();
		}
	};
</script>

<div>
	<div class="justify-center mx-auto mb-16">
		<p class="text-xl font-bold">Available Puzzles</p>
	</div>
	<div class="container flex justify-center">
		{#if shouldRenderSnarkyComponents}
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
