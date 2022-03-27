<script type="ts">
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';
	import { onMount } from 'svelte';

	import { closeModal } from 'svelte-modals';

	// provided by <Modals />
	export let isOpen;

	onMount(async () => {
		await getSession();
	});

	const getSession = async function () {
		const sessionResp = await fetch('/gameState', {
			headers: { 'content-type': 'application/json' },
			method: 'GET'
		});

		const data = await sessionResp.json();
		$session = data;
	};
</script>

{#if isOpen}
	<div class="fixed top-16 bottom-0 right-0 left-0 flex justify-center pointer-events-none z-40">
		<div class="w-lg h-80 rounded-md p-4 bg-white flex flex-col justify-center pointer-events-auto">
			<div>
				My Proofs:
				<div>
					Solved First Keypad:
					{#if $session.gateProof}
						✅ gate opened successfully
					{:else}
						❌
					{/if}
				</div>
				<div>
					Solved Second Keypad:
					{#if $session.labProof}
						✅ lab exited successfully
					{:else}
						❌
					{/if}
				</div>
				<div>
					Solved Unlabeled Room:
					{#if $session.unlabeledRoomProof}
						✅ password entered successfully
					{:else}
						❌
					{/if}
				</div>
			</div>
		</div>
	</div>
{/if}
