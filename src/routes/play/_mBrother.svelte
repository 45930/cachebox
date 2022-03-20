<script lang="ts">
	import { locationStore } from '$lib/stores/locationStore';
	import LineBreak from '$lib/lineBreak.svelte';
	import TileMovements from './[tile_id]/_tileMovements.svelte';
	import { InteractionType } from '$lib/enums';
	import Canvas from './canvas/index.svelte';
	import { afterUpdate } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { session } from '$app/stores';
	import type { Interaction } from 'src/global';

	export let name;
	const config = $locationStore[name];

	const dialogueOptions: Record<string, Interaction> = {};
	config.interactions
		.filter((x) => x.type == InteractionType.Dialogue)
		.forEach((diag) => {
			dialogueOptions[diag.short || diag.prompt] = diag;
		});

	$: dialogueHistory = config.prompt.map((x) => {
		return { from: 'them', text: x };
	});

	afterNavigate(async () => {
		await getSession();
	});

	afterUpdate(() => {
		scrollToBottom();
	});

	let nextDialogue: string = 'Ask a Question';

	const selectDialogue = function () {
		console.log(dialogueOptions);
		console.log(nextDialogue);
		const dialoguge = dialogueOptions[nextDialogue];
		if (dialoguge) {
			const us = dialoguge.prompt;
			const them = dialoguge.response;

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
		}
		nextDialogue = 'Ask a Question';
	};

	const getSession = async function () {
		const sessionResp = await fetch('/gameState', {
			headers: { 'content-type': 'application/json' },
			method: 'GET'
		});

		const data = await sessionResp.json();

		$session = data;
	};

	$: tileConfig = $locationStore[name];

	const scrollToBottom = function () {
		const element = document.getElementById('dialogue');
		console.log(element.scrollHeight);
		element.scrollTop = element.scrollHeight;
	};
</script>

<div class="container flex justify-center flex-wrap">
	<Canvas {tileConfig} />
	<div class="relative -top-96 mx-auto">
		<div id="questions" class="flex justify-end mb-3">
			<!-- <div class="bg-white opacity-80">Ask:</div> -->
			<div class=" bg-slate-500 opacity-80">
				<select
					name="select"
					id="select"
					class="px-4 outline-none text-gray-800 w-full"
					bind:value={nextDialogue}
					on:change={() => selectDialogue()}
				>
					<option value="Ask a Question" selected disabled hidden>Ask a Question</option>
					{#each Object.values(dialogueOptions) as diag}
						{#if diag.blockedOn}
							{#if $session[diag.blockedOn]}
								<option class="bg-orange-300 opacity-80" value={diag.short || diag.prompt}
									>{diag.short || diag.prompt}</option
								>
							{/if}
						{:else}
							<option value={diag.short || diag.prompt}>{diag.short || diag.prompt}</option>
						{/if}
					{/each}
				</select>
			</div>
		</div>
		<div id="dialogue" class="w-lg h-80 mx-auto overflow-y-auto bg-white opacity-80 mb-12">
			{#each dialogueHistory as message}
				{#if message.from == 'them'}
					<div class="float-left w-80 rounded bg-slate-400 p-1 my-1 ml-1">{message.text}</div>
				{:else}
					<div class="float-right w-80 rounded bg-blue-400 p-1 my-1 mr-1">{message.text}</div>
				{/if}
				<LineBreak />
			{/each}
		</div>
		<div
			id="tile-movements"
			class="w-2xl mb-4 p-2 rounded border-neutral-200 border-solid border-2"
		>
			<TileMovements movements={config.movements} />
		</div>
	</div>
</div>
