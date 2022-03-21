<script type="ts">
	import { goto } from '$app/navigation';
	import Numpad from '$lib/utils/numpad.svelte';

	import { closeModal } from 'svelte-modals';

	// provided by <Modals />
	export let isOpen;
	export let onSubmit = (key: string) => {};

	let i = 0;

	let numpadInput: string[] = [null, null, null, null, null];

	const onNumpadClick = function (value: string) {
		switch (value) {
			case 'send':
				onSubmit(numpadInput.join(''));
				numpadInput = [];
				closeModal();
				break;
			case 'back':
				numpadInput[i] = null;
				numpadInput = numpadInput; // assignment in case we are doing anything reactive
				if (i > 0) {
					i--;
				}
				break;
			default:
				numpadInput[i] = value;
				numpadInput = numpadInput;
				if (i < 4) {
					i++;
				}
		}
	};
</script>

{#if isOpen}
	<div class="fixed top-10 bottom-0 right-0 left-0 flex justify-center pointer-events-none">
		<div class="w-64 h-60 rounded-md p-4 bg-white flex flex-col justify-center pointer-events-auto">
			<div class="flex justify-between">
				{#each numpadInput as char}
					<div
						class="w-12 h-9 pt-1 px-1 border border-solid border-slate-800 mb-3 align-middle text-center"
					>
						{#if char}
							{char}
						{/if}
					</div>
				{/each}
			</div>
			<Numpad onClick={onNumpadClick} />
		</div>
	</div>
{/if}
