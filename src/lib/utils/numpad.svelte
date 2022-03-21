<script lang="ts">
	export let onClick = (value: string) => {};
</script>

<div class="w-36 mx-auto">
	<div class="flex justify-center">
		<div
			on:click={() => onClick('1')}
			class="text-center w-12 h-9 pt-1 border border-solid border-stone-800 bg-slate-400"
		>
			1
		</div>
		<div
			on:click={() => onClick('2')}
			class="text-center w-12 h-9 pt-1 border border-solid border-stone-800 bg-slate-400"
		>
			2
		</div>
		<div
			on:click={() => onClick('3')}
			class="text-center w-12 h-9 pt-1 border border-solid border-stone-800 bg-slate-400"
		>
			3
		</div>
	</div>
	<div class="flex justify-center">
		<div
			on:click={() => onClick('4')}
			class="text-center w-12 h-9 pt-1 border border-solid border-stone-800 bg-slate-400"
		>
			4
		</div>
		<div
			on:click={() => onClick('5')}
			class="text-center w-12 h-9 pt-1 border border-solid border-stone-800 bg-slate-400"
		>
			5
		</div>
		<div
			on:click={() => onClick('6')}
			class="text-center w-12 h-9 pt-1 border border-solid border-stone-800 bg-slate-400"
		>
			6
		</div>
	</div>
	<div class="flex justify-center">
		<div
			on:click={() => onClick('7')}
			class="text-center w-12 h-9 pt-1 border border-solid border-stone-800 bg-slate-400"
		>
			7
		</div>
		<div
			on:click={() => onClick('8')}
			class="text-center w-12 h-9 pt-1 border border-solid border-stone-800 bg-slate-400"
		>
			8
		</div>
		<div
			on:click={() => onClick('9')}
			class="text-center w-12 h-9 pt-1 border border-solid border-stone-800 bg-slate-400"
		>
			9
		</div>
	</div>
	<div class="flex justify-center">
		<div
			on:click={() => onClick('back')}
			class="text-center w-12 h-9 pt-1 border border-solid border-stone-800 bg-slate-400"
		>
			&lt;
		</div>
		<div
			on:click={() => onClick('0')}
			class="text-center w-12 h-9 pt-1 border border-solid border-stone-800 bg-slate-400"
		>
			0
		</div>
		<div
			on:click={() => onClick('send')}
			class="text-center w-12 h-9 pt-1 border border-solid border-stone-800 bg-slate-400"
		>
			OK
		</div>
	</div>
</div>
