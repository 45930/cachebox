<script lang="ts">
	import { goto } from '$app/navigation';
	import LineBreak from '$lib/lineBreak.svelte';
	import type { Movement } from 'src/global';

	export let movements: Movement[];
</script>

<div id="tile-movements" class="w-2xl mb-4 p-2 rounded border-neutral-200 border-solid border-2">
	<div class="w-full flex">
		{#each movements as movement}
			<div
				on:click={() => goto(`/play/${movement.to}`)}
				class="w-40 h-24 border-2 border-solid border-neutral-600 rounded mx-2 px-2 py-2 text-sm"
			>
				{movement.prompt}
			</div>
		{/each}
	</div>
</div>
