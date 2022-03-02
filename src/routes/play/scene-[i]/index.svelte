<script context="module">
	export const load = async function ({ url, params, fetch, session, context }) {
		return {
			props: {
				stepId: params.i
			}
		};
	};
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { deployedSnappsStore } from '$lib/stores/deployedSnappStore';
	import { gameStepStore } from '$lib/stores/gameStepsStore';
	import { loadSnarky as loadSnarkyGlobal, snarkyStore } from '$lib/stores/minaStore';
	import { onMount } from 'svelte';
	import type { SecretPhraseSnappInterface } from 'src/global';

	export let stepId;
	let feedback = '';
	$: stepConfig = $gameStepStore[stepId];
	$: isSnarkyLoaded = $snarkyStore;
	$: snappStore = $deployedSnappsStore;

	onMount(async () => {
		await loadSnarky();
		if (stepConfig.snapp) {
			const snappSourceCode = await import('$lib/snapps/secretPhraseSnapp');
			const secretPhraseSnapp: SecretPhraseSnappInterface = await snappSourceCode.deploy();
			$deployedSnappsStore[stepConfig.snapp.key] = {
				interface: secretPhraseSnapp,
				address: secretPhraseSnapp.address
			};
		}
	});

	const loadSnarky = async function () {
		if (!isSnarkyLoaded) {
			await loadSnarkyGlobal();
		}
	};

	const callFunction = async function (methodName: string, methodParams: any[]) {
		const snapp = snappStore[stepConfig.snapp.key];
		const callableFunction = Reflect.get(snapp.interface, methodName);
		const paramValues = methodParams.map((x) => x.value);
		let resp: string;
		let error = false;
		try {
			resp = await Reflect.apply(callableFunction, snapp.interface, paramValues);
		} catch (e) {
			resp = e;
			error = true;
		}
		console.log(resp);
		feedback = resp;
	};
</script>

<div class="container">
	<div id="message">
		{stepConfig.message[0]}
	</div>
	<div id="choices">
		{#each stepConfig.toSteps as toStep}
			<div
				on:click={() => goto(`/play/scene-${toStep.id}`, { replaceState: true })}
				class="justify-center mx-auto mb-16 border-2 border-solid border-sky-800 rounded px-2 py-2"
			>
				{toStep.prompt}
			</div>
		{/each}
	</div>
	{#if stepConfig.snapp}
		<div id="snapp">
			<div>
				{stepConfig.snapp.key}
			</div>
			{#each stepConfig.snapp.methods as method}
				<div>
					<h2>{method.label}</h2>
					{#each method.inputs as input}
						<input
							bind:value={input.value}
							type="string"
							class="w-100 px-4 py-1 font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded m-0"
						/>
					{/each}
					<button on:click={() => callFunction(method.name, method.inputs)}>Submit</button>
				</div>
			{/each}
		</div>
		<div id="feedback">
			{feedback}
		</div>
	{/if}
</div>
