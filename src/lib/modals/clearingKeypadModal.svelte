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
	<div class="modal">
		<div class="contents">
			<div class="flex justify-center">
				{numpadInput.join(' ')}
			</div>
			<Numpad onClick={onNumpadClick} />
		</div>
	</div>
{/if}

<style>
	.modal {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;

		/* allow click-through to backdrop */
		pointer-events: none;
	}

	.contents {
		min-width: 240px;
		border-radius: 6px;
		padding: 16px;
		background: white;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		pointer-events: auto;
	}

	h2 {
		text-align: center;
		font-size: 24px;
	}

	p {
		text-align: center;
		margin-top: 16px;
	}

	.actions {
		margin-top: 32px;
		display: flex;
		justify-content: flex-end;
	}
</style>
