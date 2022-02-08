<script lang="ts">
	import { goto } from '$app/navigation';
	import type { DeployedSnappInterface } from 'src/global';
	import { deployedSnappsStore } from '$lib/stores/deployedSnappStore';

	export let address: string;
	let deployedSnapps = $deployedSnappsStore;
	let snappConfig = deployedSnapps[address];

	const routeToSnapp = function (address: string) {
		goto(`/puzzles/${address}`);
	};
</script>

<div
	on:click={() => routeToSnapp(address)}
	class="max-w-xs h-64 justify-center bg-blue-100 rounded-lg border border-gray-200 mb-6 py-5 cursor-pointer"
>
	<div class="flex justify-center">
		<p class="text-lg font-semibold mb-6">{snappConfig.title}</p>
	</div>
	<div class="flex justify-center">
		<p class="">{snappConfig.subtitle}</p>
	</div>
</div>
