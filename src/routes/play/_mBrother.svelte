<script lang="ts">
	import { locationStore } from '$lib/stores/locationStore';
	import LineBreak from '$lib/lineBreak.svelte';
	import TileMovements from './[tile_id]/_tileMovements.svelte';
	import { InteractionType } from '$lib/enums';

	export let name;
	const config = $locationStore[name];

	const dialogueOptions = config.interactions.filter((x) => x.type == InteractionType.Dialogue);
	$: dialogueHistory = config.prompt.map((x) => {
		return { from: 'them', text: x };
	});

	const addDialogue = function (dialogue: [string, string]) {
		const us = dialogue[0];
		const them = dialogue[1];

		dialogueHistory = [
			...dialogueHistory,
			{
				from: 'us',
				text: us
			}
		];

		dialogueHistory = [
			...dialogueHistory,
			{
				from: 'them',
				text: them
			}
		];
	};
</script>

<div class="container flex justify-center flex-wrap">
	{#if name == 'marcus'}
		<svg
			viewBox="0 0 90 90"
			fill="none"
			role="img"
			xmlns="http://www.w3.org/2000/svg"
			width="128"
			height="128"
			><mask id="mask__ring" maskUnits="userSpaceOnUse" x="0" y="0" width="90" height="90"
				><rect width="90" height="90" fill="#FFFFFF" /></mask
			><g mask="url(#mask__ring)"
				><path d="M0 0h90v45H0z" fill="#680148" /><path d="M0 45h90v45H0z" fill="#000000" /><path
					d="M83 45a38 38 0 00-76 0h76z"
					fill="#000000"
				/><path d="M83 45a38 38 0 01-76 0h76z" fill="#e0eff1" /><path
					d="M77 45a32 32 0 10-64 0h64z"
					fill="#e0eff1"
				/><path d="M77 45a32 32 0 11-64 0h64z" fill="#7db4b5" /><path
					d="M71 45a26 26 0 00-52 0h52z"
					fill="#7db4b5"
				/><path d="M71 45a26 26 0 01-52 0h52z" fill="#680148" /><circle
					cx="45"
					cy="45"
					r="23"
					fill="#ffffff"
				/></g
			></svg
		>
	{:else}
		<svg
			viewBox="0 0 90 90"
			fill="none"
			role="img"
			xmlns="http://www.w3.org/2000/svg"
			width="128"
			height="128"
			><mask id="mask__ring" maskUnits="userSpaceOnUse" x="0" y="0" width="90" height="90"
				><rect width="90" height="90" fill="#FFFFFF" /></mask
			><g mask="url(#mask__ring)"
				><path d="M0 0h90v45H0z" fill="#000000" /><path d="M0 45h90v45H0z" fill="#e0eff1" /><path
					d="M83 45a38 38 0 00-76 0h76z"
					fill="#e0eff1"
				/><path d="M83 45a38 38 0 01-76 0h76z" fill="#7db4b5" /><path
					d="M77 45a32 32 0 10-64 0h64z"
					fill="#7db4b5"
				/><path d="M77 45a32 32 0 11-64 0h64z" fill="#ffffff" /><path
					d="M71 45a26 26 0 00-52 0h52z"
					fill="#ffffff"
				/><path d="M71 45a26 26 0 01-52 0h52z" fill="#000000" /><circle
					cx="45"
					cy="45"
					r="23"
					fill="#680148"
				/></g
			></svg
		>
	{/if}
	<LineBreak />
	<div id="dialogue" class="w-lg">
		{#each dialogueHistory as message}
			{#if message.from == 'them'}
				<div class="float-left w-80 rounded bg-slate-100 p-1 my-1">{message.text}</div>
			{:else}
				<div class="float-right w-80 bg-slate-100 p-1 my-1">{message.text}</div>
			{/if}
			<LineBreak />
		{/each}
	</div>
	<div id="questions">
		{#each dialogueOptions as diag}
			<div
				class="cursor-pointer my-2 p-1"
				on:click={() => {
					addDialogue([diag.prompt, diag.response]);
				}}
			>
				{diag.prompt}
			</div>
		{/each}
	</div>
	<TileMovements movements={config.movements} />
</div>
