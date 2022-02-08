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
	import { each } from 'svelte/internal';

	export let snappAddress;
	let deployedSnapps = $deployedSnappsStore;

	const snappConfig = deployedSnapps[snappAddress];

	const callFunction = async function (step) {
		const callableFunction = Reflect.get(snappConfig, step.functionName);
		const paramValues = step.functionParams.map((x) => x.paramValue);
		Reflect.apply(callableFunction, snappConfig, paramValues);
	};

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
</script>

<div>
	{snappConfig.title}
</div>
<div>
	Snapp deployed at: {snappAddress}
</div>
<div class="container">
	{#each tempHarcodeConfig.steps as step}
		<p>{step.description}</p>
		{#if step.functionParams}
			{#each step.functionParams as functionParam}
				{#if functionParam.paramType == 'string'}
					<label
						>{functionParam.paramName}
						<input bind:value={functionParam.paramValue} type="string" />
					</label>
				{:else if functionParam.paramType == 'number'}
					<label
						>{functionParam.paramName}
						<input bind:value={functionParam.paramValue} type="number" />
					</label>
				{:else if functionParam.paramType == 'boolean'}
					<label
						>{functionParam.paramName}
						<input bind:checked={functionParam.paramValue} type="checkbox" />
					</label>
				{:else}
					<p>Could not render content</p>
				{/if}
			{/each}
		{/if}
		<button on:click={() => callFunction(step)}>Click</button>
	{/each}
</div>
