<script type="ts">
	import { goto } from '$app/navigation';
	import Numpad from '$lib/utils/numpad.svelte';

	import { closeModal } from 'svelte-modals';

	// provided by <Modals />
	export let isOpen;
	export let onSubmit = (key: string) => {};

	let numpadInput: string[] = [];

	const onNumpadClick = function (value: string) {
		switch (value) {
			case 'send':
				onSubmit(numpadInput.join(''));
				numpadInput = [];
				closeModal();
				break;
			case 'back':
				numpadInput.pop();
				numpadInput = numpadInput; // assignment in case we are doing anything reactive
				break;
			default:
				numpadInput = [...numpadInput, value];
		}
	};
</script>

{#if isOpen}
	<div class="fixed top-10 bottom-0 right-0 left-0 flex justify-center pointer-events-none">
		<div class="w-56 h-52 rounded-md p-4 bg-white flex flex-col justify-center pointer-events-auto">
			<div class="flex justify-center">
				{numpadInput.join(' ')}
			</div>
			<Numpad onClick={onNumpadClick} />
		</div>
	</div>
{/if}
