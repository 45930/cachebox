<script lang="ts">
	import type { Tile } from 'src/global';
	import { onMount } from 'svelte';
	import shack_src from '$lib/assets/shack.jpeg';
	import smoke1_src from '$lib/assets/smoke1.png';
	import smoke2_src from '$lib/assets/smoke2.png';
	import smoke3_src from '$lib/assets/smoke3.png';
	import { afterNavigate } from '$app/navigation';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	let shack = new Image();
	let smoke1 = new Image();
	let smoke2 = new Image();
	let smoke3 = new Image();

	let animation: number;

	afterNavigate(() => {
		if (animation) {
			window.cancelAnimationFrame(animation);
		}

		canvas = document.getElementById('canvas') as HTMLCanvasElement;
		ctx = canvas.getContext('2d');

		shack.onload = function () {
			ctx.drawImage(shack, 0, 0);
		};

		shack.src = shack_src;
		smoke1.src = smoke1_src;
		smoke2.src = smoke2_src;
		smoke3.src = smoke3_src;

		draw();
	});

	let i = 1;
	const draw = function () {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(shack, 0, 0);

		if (i < 25) {
			ctx.drawImage(smoke3, 0, 10);
			i += 1;
		} else if (i < 50) {
			ctx.drawImage(smoke2, 0, 10);
			i += 1;
		} else if (i < 75) {
			ctx.drawImage(smoke1, 0, 10);
			i += 1;
		} else {
			ctx.drawImage(smoke3, 0, 10);
			i = 1;
		}

		animation = window.requestAnimationFrame(draw);
	};
</script>

<canvas id="canvas" width="1000" height="500" />
