<script lang="ts">
	import { goto } from '$app/navigation';
	import type { DeployedSnappInterface } from 'src/global';

	export let snappConfig: DeployedSnappInterface;

	const routeToSnapp = function (snappAddress: string) {
		goto(`/puzzles/${snappAddress}`);
	};
</script>

<div
	on:click={() => routeToSnapp(snappConfig.address)}
	class="max-w-xs h-64 justify-center bg-blue-100 rounded-lg border border-gray-200 mb-6 py-5 cursor-pointer"
>
	<div class="flex justify-center">
		<p class="text-lg font-semibold mb-6">{snappConfig.title}</p>
	</div>
	<div class="flex justify-center">
		<p class="">{snappConfig.subtitle}</p>
	</div>
</div>
