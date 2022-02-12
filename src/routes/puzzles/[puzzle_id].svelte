<script context="module">
	export const load = async function ({ url, params, fetch, session, context }) {
		return {
			props: {
				snappAddress: params.puzzle_id
			}
		};
	};
</script>

<script lang="ts">
	import { deployedSnappsStore } from '$lib/stores/deployedSnappStore';
	import { onMount } from 'svelte/internal';

	export let snappAddress;
	let deployedSnapps = $deployedSnappsStore;

	const snappConfig = deployedSnapps[snappAddress];

	const callFunction = async function (step) {
		const callableFunction = Reflect.get(snappConfig, step.functionName);
		const paramValues = step.functionParams.map((x) => x.paramValue);
		let resp: string;
		let error = false;
		try {
			resp = await Reflect.apply(callableFunction, snappConfig, paramValues);
		} catch (e) {
			resp = e;
			error = true;
		}

		console.log(resp);
		if (resp) {
			message = resp;
		} else {
			message = '';
		}

		if (error) {
			return;
		}

		if (stepNum + 1 == tempHarcodeConfig.steps.length) {
			stepNum = 0;
			currentStepVar = tempHarcodeConfig.steps[stepNum];
		} else {
			stepNum = stepNum + 1;
			currentStepVar = tempHarcodeConfig.steps[stepNum];
		}

		getSnappState();
	};

	let deployedSnappState;

	const getSnappState = async function () {
		const getStateFunction = Reflect.get(snappConfig, 'getSnappState');
		deployedSnappState = await Reflect.apply(getStateFunction, snappConfig, []);
	};

	onMount(async () => {
		getSnappState();
	});

	let message = '';

	// TODO: make a more reusable config schema
	const tempHarcodeConfig = {
		steps: [
			{
				description: 'Guess a Door',
				functionName: 'guessDoor',
				functionParams: [
					{
						paramName: 'door',
						paramType: 'number',
						paramValue: null
					}
				]
			},
			{
				description: 'Submit Option',
				functionName: 'evaluate',
				functionParams: [
					{
						paramName: 'isSwitching',
						paramType: 'boolean',
						paramValue: false
					}
				]
			},
			{
				description: 'Reset State',
				functionName: 'reset',
				functionParams: []
			}
		]
	};

	let stepNum = 0;
	let currentStepVar = tempHarcodeConfig.steps[stepNum];
	$: currentStep = currentStepVar;
</script>

<div id="pageTitle" class="justify-center mx-auto mb-4">
	<h2 class="text-xl font-bold">{snappConfig.title}</h2>
</div>
<div id="snappMetadata" class="mb-16">
	<p>Snapp deployed at: {snappAddress}</p>
	{#key deployedSnappState}
		{JSON.stringify(deployedSnappState)}
	{/key}
</div>

<div class="container">
	{#key currentStep}
		<h4 class="text-lg font-semibold">
			{currentStep.description}
		</h4>
		<div id="message">{message}</div>
		{#if currentStep.functionParams}
			{#each currentStep.functionParams as functionParam}
				{#if functionParam.paramType == 'string'}
					<label class="form-label inline-block mb-2 text-gray-700"
						>{functionParam.paramName}
						<input
							bind:value={functionParam.paramValue}
							type="string"
							class="w-100 px-4 py-1 font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded m-0"
						/>
					</label>
				{:else if functionParam.paramType == 'number'}
					<label class="form-label inline-block mb-2 text-gray-700"
						>{functionParam.paramName}
						<input
							bind:value={functionParam.paramValue}
							type="number"
							class="w-100 px-4 py-1 font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded m-0"
						/>
					</label>
				{:else if functionParam.paramType == 'boolean'}
					<label class="form-label inline-block mb-2 text-gray-700"
						>{functionParam.paramName}
						<input
							bind:checked={functionParam.paramValue}
							type="checkbox"
							class="w-100 px-4 py-1 font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded m-0"
						/>
					</label>
				{:else}
					<p>Could not render content</p>
				{/if}
			{/each}
			<button
				on:click={() => callFunction(currentStep)}
				type="button"
				class="px-3 py-1 rounded bg-blue-100 shadow-md">{currentStep.functionName}</button
			>
		{/if}
	{/key}
</div>
