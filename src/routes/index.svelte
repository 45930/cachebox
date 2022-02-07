<script lang="ts">
	import type { DeployedSnappInterface, MontyHallSnappInterface } from 'src/global';
	import { onMount } from 'svelte';
	import SnappCard from './_SnappCard.svelte';

	let isSnarkyLoaded = false;
	let snappConfigs: DeployedSnappInterface[] = [];

	onMount(async () => {
		let snappSourceCode = await import('$lib/snapps/montyHallSnapp');
		console.log('loading snarky');
		await snappSourceCode.load();
		console.log('loaded snarky!');
		const montyHallSnapp: MontyHallSnappInterface = await snappSourceCode.deploy();
		snappConfigs.push(montyHallSnapp);
		isSnarkyLoaded = true;
	});

	const deploySnapp = async function () {
		let snappSourceCode = await import('$lib/snapps/verySimpleSnapp');
		await snappSourceCode.deploy();
	};
</script>

<div>
	<div class="justify-center mx-auto mb-16">
		<p class="text-xl font-bold">Available Adventures</p>
	</div>
	<div class="container flex justify-center">
		{#if isSnarkyLoaded}
			<button on:click={() => deploySnapp()}>Click Me</button>
			<div class="w-full grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
				{#each snappConfigs as snappConfig}
					<SnappCard {snappConfig} />
				{/each}
			</div>
		{:else}
			<div>Waiting for snarky to load...</div>
		{/if}
	</div>
</div>
