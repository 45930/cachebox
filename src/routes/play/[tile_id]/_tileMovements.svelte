<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Movement } from 'src/global';

	export let movements: Movement[];
</script>

<div class="w-full flex justify-between">
	{#each movements as movement}
		<div
			on:click={() => goto(`/play/${movement.to}`)}
			class="w-36 h-20 border-2 border-solid border-neutral-600 rounded mx-2 px-2 py-2 text-sm"
		>
			{movement.prompt}
		</div>
	{/each}
</div>
