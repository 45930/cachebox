<script lang="ts">
	import { afterNavigate } from '$app/navigation';

	import LineBreak from '$lib/lineBreak.svelte';

	export let prompt: string[];

	$: currentPromptIndex = 0;
	$: currentPromptSegment = prompt[currentPromptIndex];

	afterNavigate(() => {
		currentPromptIndex = 0;
	});
</script>

<div id="tile-prompt-content" class="w-xl h-16">
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
