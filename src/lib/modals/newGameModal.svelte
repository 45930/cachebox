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

		await getSession();

		closeModal();
		goto('/play/beach_landing');
	};
</script>

{#if isOpen}
	<div class="fixed top-16 bottom-0 right-0 left-0 flex justify-center pointer-events-none z-40">
		<div class="w-lg h-80 rounded-md p-4 bg-white flex flex-col justify-center pointer-events-auto">
			<h2 class="text-center text-xl font-bold">Welcome to Cahchebox</h2>
			<div class="flex flex-col mx-8">
				<p class="text-left mt-2">
					This is an escape game based on the <a
						target="_blank"
						class="underline"
						href="https://minaprotocol.com/">Mina</a
					>
					blockchain. Read more about the project on our
					<a on:click={() => closeModal()} class="underline" href="/about">about page</a>.
				</p>
				<p class="text-left mt-2">
					To test your logic and puzzle-solving skills, enter the game below!
				</p>
				<label class="mt-2"
					>What can we call you?: <input
						bind:value={username}
						class="
							form-control
							block
							w-sm
							px-3
							py-1.5
							text-base
							font-normal
							text-gray-700
							bg-white bg-clip-padding
							border border-solid border-gray-300
							rounded
							transition
							ease-in-out
							m-0
							focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
						"
					/></label
				>
				<div class="mt-6">
					<button
						class="inline-block px-6 py-2.5 bg-neutral-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
						on:click={onSubmit}>ENTER</button
					>
				</div>
			</div>
		</div>
	</div>
{/if}
