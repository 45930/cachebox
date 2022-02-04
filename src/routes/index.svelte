<script lang="ts">
	import { snappConfigsStore } from '$lib/stores';
	import type { DeployedSnappInterface } from 'src/global';
	import SnappCard from './_SnappCard.svelte';

	const snappConfigs: DeployedSnappInterface[] = $snappConfigsStore;
</script>

<div>
	<div class="justify-center mx-auto mb-16">
		<p class="text-xl font-bold">Available Adventures</p>
	</div>
	<div class="container flex justify-center">
		<div class="w-full grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
			{#each snappConfigs as snappConfig}
				<SnappCard {snappConfig} />
			{/each}
		</div>
	</div>
</div>
