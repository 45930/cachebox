<script type="ts">
	import { goto } from '$app/navigation';

	import { closeModal } from 'svelte-modals';

	// provided by <Modals />
	export let isOpen;

	const hints = {
		'First Keypad Hint': {
			enabled: false,
			hint: 'Make sure to talk to Merlin and Marcus after you discover the keypad'
		},
		'Second Keypad Hint': {
			enabled: false,
			hint: 'You need to solve all of the puzzles in the lab.  If you put them together in the right order, you should get the correct code.'
		},
		'Lab #1 Hint': {
			enabled: false,
			hint: 'How many sets of 3 numbers multiply to equal 36 (twelve thrice)?  If you sum up the values in those sets, do you notice anything interesting?'
		}
	};

	const toggleHint = function (key: string) {
		hints[key].enabled = !hints[key].enabled;
	};
</script>

{#if isOpen}
	<div class="fixed top-16 bottom-0 right-0 left-0 flex justify-center pointer-events-none z-40">
		<div class="w-lg h-80 rounded-md p-4 bg-white flex flex-col justify-center pointer-events-auto">
			<div class="flex flex-col">
				{#each Object.keys(hints) as hintKey}
					<div
						on:click={() => toggleHint(hintKey)}
						class="p-3 mb-1 border border-solid border-black rounded w-3/4 flex justify-between"
					>
						{#if hints[hintKey].enabled}
							<p>{hints[hintKey].hint}</p>
						{:else}
							<h2>{hintKey}</h2>
							<span class="float-right">(Click to View)</span>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}
