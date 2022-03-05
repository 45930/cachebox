<script type="ts">
	import { goto } from '$app/navigation';

	import { closeModal } from 'svelte-modals';

	// provided by <Modals />
	export let isOpen;
	export let getSession = () => {};

	let username: string;

	const onSubmit = async function () {
		const sessionToCreate: SessionData = {
			user: username,
			tile: 'beach_landing'
		};

		await fetch('/gameState', {
			headers: { 'content-type': 'application/json' },
			method: 'POST',
			body: JSON.stringify(sessionToCreate)
		});

		getSession();

		closeModal();
		goto('/play/beach_landing');
	};
</script>

{#if isOpen}
	<div class="modal">
		<div class="contents">
			<h2>New Game</h2>
			<p>Fill out form to start new game</p>
			<label>Username: <input bind:value={username} /></label>
			<div class="actions">
				<button on:click={onSubmit}>OK</button>
			</div>
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
