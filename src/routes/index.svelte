<script lang="ts">
	import { snappConfigs } from '$lib/stores';
</script>

<div class="container">
	{#each $snappConfigs as snappConfig}
		<div class="card">
			{snappConfig.name}
		</div>
	{/each}
</div>

<style>
	.container {
		display: flex;
		flex-wrap: wrap;
	}

	.card {
		border: 1px solid lightgrey;
		border-radius: 3%;
		height: 120px;
		flex: 0 0 30%;
		margin: 10px;
	}
</style>
