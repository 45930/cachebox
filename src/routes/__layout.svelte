<script>
	import { Modals, closeModal } from 'svelte-modals';
</script>

<Modals>
	<div slot="backdrop" class="backdrop" on:click={closeModal} />
</Modals>

<div class="2xl:container 2xl:mx-auto">
	<div class="bg-white rounded shadow-lg py-5 px-7">
		<nav class="flex justify-between">
			<ul class="flex flex-auto space-x-2">
				<li
					class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-gray-600 border border-white bg-gray-50 cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 shadow-md rounded"
				>
					<a sveltekit:prefetch href="/">Home</a>
				</li>
				<li
					class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-gray-600 border border-white bg-gray-50 cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 shadow-md rounded"
				>
					<a sveltekit:prefetch href="/about">About</a>
				</li>
			</ul>
			<div class="flex items-center space-x-3 lg:pr-16 pr-6">
				<h2 class="font-normal text-2xl leading-6 text-gray-800">Escape Game</h2>
			</div>
		</nav>
	</div>
</div>

<main class="container mx-auto pt-10"><slot /></main>

<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	.backdrop {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.5);
	}
</style>
