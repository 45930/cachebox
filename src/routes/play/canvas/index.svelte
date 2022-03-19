<script lang="ts">
	import type { Tile } from 'src/global';
	import { onMount } from 'svelte';

	export let tileConfig: Tile;

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	onMount(() => {
		canvas = document.getElementById('canvas') as HTMLCanvasElement;
		ctx = canvas.getContext('2d');
		const img = new Image();

		img.onload = function () {
			ctx.drawImage(img, 0, 0);
		};

		img.src = '/static/beach.png';
	});
</script>

<canvas id="canvas" width="1000" height="500" />
