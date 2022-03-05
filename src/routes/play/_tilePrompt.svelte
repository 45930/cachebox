<script lang="ts">
	import LineBreak from '$lib/lineBreak.svelte';

	export let prompt: string[];

	let currentPromptIndex = 0;
	$: currentPromptSegment = prompt[currentPromptIndex];
</script>

<div id="tile-prompt" class="max-w-md mb-4 p-2 rounded border-neutral-200 border-solid border-2">
	<div id="tile-prompt-content" class="mb-8 w-96 h-24">
		{currentPromptSegment}
	</div>
	<LineBreak />
	<div id="tile-prompt-actions" class="flex justify-end mr-6">
		<button
			class="px-2 mx-2 rounded border-neutral-600 border-solid border-2 cursor-pointer"
			on:click={() => currentPromptIndex--}
			disabled={currentPromptIndex == 0}>&lt;</button
		>
		{currentPromptIndex + 1} of {prompt.length}
		<button
			class="px-2 mx-2 rounded border-neutral-600 border-solid border-2 cursor-pointer"
			on:click={() => currentPromptIndex++}
			disabled={currentPromptIndex == prompt.length - 1}>&gt;</button
		>
	</div>
</div>
