<script lang="ts">
	import LineBreak from '$lib/lineBreak.svelte';
	import type { Interaction } from 'src/global';

	export let interactions: Interaction[];
</script>

<div id="tile-interactions">
	<LineBreak />
</div>
