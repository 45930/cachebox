<script lang="ts">
	import { locationStore } from '$lib/stores/locationStore';
	import LineBreak from '$lib/lineBreak.svelte';
	import TilePrompt from './[tile_id]/_tilePrompt.svelte';
	import TileMovements from './[tile_id]/_tileMovements.svelte';
	import { afterNavigate, goto } from '$app/navigation';

	import Static from '$lib/canvases/static.svelte';
	import { session } from '$app/stores';
	import type { Signature } from 'snarkyjs';

	import { loadSnarky, snarkyStore, deployedSnappsStore } from '$lib/stores/minaStore';
	import { onMount } from 'svelte';
	import type { KeyProof } from '$lib/snarkyUtils/keyProof';

	const tile = 'unlabeled_room';

	const alpha = {
		a: 1,
		b: 2,
		c: 3,
		d: 4,
		e: 5,
		f: 6,
		g: 7,
		h: 8,
		i: 9,
		j: 10,
		k: 11,
		l: 12,
		m: 13,
		n: 14,
		o: 15,
		p: 16,
		q: 17,
		r: 18,
		s: 19,
		t: 20,
		u: 21,
		v: 22,
		w: 23,
		x: 24,
		y: 25,
		z: 26,
		_: 27
	};

	const numer = {
		1: 'a',
		2: 'b',
		3: 'c',
		4: 'd',
		5: 'e',
		6: 'f',
		7: 'g',
		8: 'h',
		9: 'i',
		10: 'j',
		11: 'k',
		12: 'l',
		13: 'm',
		14: 'n',
		15: 'o',
		16: 'p',
		17: 'q',
		18: 'r',
		19: 's',
		20: 't',
		21: 'u',
		22: 'v',
		23: 'w',
		24: 'x',
		25: 'y',
		26: 'z',
		27: '_'
	};

	onMount(async () => {
		checkSnarkyLoaded();
	});

	afterNavigate(async () => {
		await updateSession();
	});

	const updateSession = async function () {
		const sessionResp = await fetch('/gameState', {
			headers: { 'content-type': 'application/json' },
			method: 'PUT',
			body: JSON.stringify({
				hasVisitedClearing: true
			})
		});

		const data = await sessionResp.json();

		$session = data;
	};

	const addProofToSession = async function (proof: KeyProof) {
		const sessionResp = await fetch('/gameState', {
			headers: { 'content-type': 'application/json' },
			method: 'PUT',
			body: JSON.stringify({
				unlabeledRoomProof: proof
			})
		});

		const data = await sessionResp.json();

		$session = data;
	};

	const checkSnarkyLoaded = function () {
		if (!$snarkyStore) {
			loadSnarky();
		}
	};

	let key = ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'];

	const encode = function (pt: string, key: string[]) {
		let ciphertext = '';
		key.forEach((char, i) => {
			const ptChar = pt[i] || 'a';
			const num = alpha[char] + alpha[ptChar.toLowerCase()];
			ciphertext += numer[(num % 27) + 1];
		});
		return ciphertext;
	};

	const decode = function (ct: string, key: string[]) {
		let plaintext = '';
		key.forEach((char, i) => {
			const ctChar = ct[i];
			const num = alpha[ctChar.toLowerCase()] - alpha[char] - 1;
			if (num <= -27) {
				plaintext += numer[num + 54];
			} else if (num <= 0) {
				plaintext += numer[num + 27];
			} else {
				plaintext += numer[num];
			}
		});
		return plaintext;
	};

	$: decoded = tileConfig.prompt.map((x) => decode(x, key));

	$: tileConfig = $locationStore[tile];

	let password = '';

	const incrementKey = function (i: number) {
		console.log(i);
		const num = alpha[key[i]];
		let key_copy = [...key];
		if (num == 27) {
			key_copy[i] = numer[1];
		} else {
			key_copy[i] = numer[num + 1];
		}
		key = key_copy;
	};

	const decrementKey = function (i: number) {
		console.log(i);
		const num = alpha[key[i]];
		let key_copy = [...key];
		if (num == 1) {
			key_copy[i] = numer[27];
		} else {
			key_copy[i] = numer[num - 1];
		}
		key = key_copy;
	};

	const submitPWGuess = async function () {
		const escapeGameSnapp = $deployedSnappsStore;
		const winner = await escapeGameSnapp.guessUnlabeledPw(password);

		if (!winner) {
			alert('Access Denied');
		} else {
			await addProofToSession(winner);
			alert('Access Granted');
		}
	};
</script>

<div class="container flex justify-center flex-wrap">
	<Static templateName={tile} />
	<div class="relative bottom-96 bg-white p-10 opacity-80 w-2xl h-80 text-center mx-auto">
		<div>
			Key:
			<div class="flex justify-center mb-6">
				{#each key as char, index}
					<div class="p-2 border border-solid border-red-400 rounded flex flex-col">
						<div on:click={() => incrementKey(index)}>&and;</div>
						<div>{char}</div>
						<div on:click={() => decrementKey(index)}>&or;</div>
					</div>
				{/each}
			</div>
		</div>
		<div class="flex flex-wrap mb-32">
			{#each decoded as plaintext}
				<div class="w-1/2">{plaintext}</div>
			{/each}
		</div>
		{#if $snarkyStore}
			<label
				><input
					bind:value={password}
					class="p-1 border border-solid border-slate-600 rounded shadow-sm"
					type="text"
				/></label
			><button
				on:click={() => submitPWGuess()}
				class="p-1 border border-solid border-slate-600 rounded shadow-sm">Enter</button
			>
		{:else}
			<p>Waiting for snarky...</p>
		{/if}
		<LineBreak />
		<div
			id="tile-movements"
			class="w-2xl mb-4 p-2 rounded border-neutral-200 border-solid border-2"
		>
			<TileMovements movements={tileConfig.movements} />
		</div>
	</div>
</div>
