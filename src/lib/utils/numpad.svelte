<script lang="ts">
	export let onClick = (value: string) => {};
</script>

<div class="w-18">
	<div class="flex justify-center">
		<div on:click={() => onClick('1')} class="text-center w-6">1</div>
		<div on:click={() => onClick('2')} class="text-center w-6">2</div>
		<div on:click={() => onClick('3')} class="text-center w-6">3</div>
	</div>
	<div class="flex justify-center">
		<div on:click={() => onClick('4')} class="text-center w-6">4</div>
		<div on:click={() => onClick('5')} class="text-center w-6">5</div>
		<div on:click={() => onClick('6')} class="text-center w-6">6</div>
	</div>
	<div class="flex justify-center">
		<div on:click={() => onClick('7')} class="text-center w-6">7</div>
		<div on:click={() => onClick('8')} class="text-center w-6">8</div>
		<div on:click={() => onClick('9')} class="text-center w-6">9</div>
	</div>
	<div class="flex justify-center">
		<div on:click={() => onClick('back')} class="text-center w-6">&lt;</div>
		<div on:click={() => onClick('0')} class="text-center w-6">0</div>
		<div on:click={() => onClick('send')} class="text-center w-6">OK</div>
	</div>
</div>
