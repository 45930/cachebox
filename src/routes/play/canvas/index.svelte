<script lang="ts">
	import type { Tile } from 'src/global';
	import { onMount } from 'svelte';
	import beach from '$lib/assets/beach.png';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	onMount(() => {
		canvas = document.getElementById('canvas') as HTMLCanvasElement;
		ctx = canvas.getContext('2d');
		const img = new Image();

		img.onload = function () {
			ctx.drawImage(img, 0, 0);
		};

		img.src = beach;
	});
</script>

<canvas id="canvas" width="1000" height="500" />
