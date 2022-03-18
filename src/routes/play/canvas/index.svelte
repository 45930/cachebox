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
			addText();
		};

		img.src = '/static/beach.png';
	});

	const addText = function () {
		ctx.fillStyle = 'white';
		ctx.fillRect(175, 400, 450, 80);

		ctx.fillStyle = 'black';
		ctx.font = '20px sans-serif';
		ctx.fillText(tileConfig.prompt[0], 180, 420);
	};
</script>

<canvas id="canvas" width="800" height="500" />
