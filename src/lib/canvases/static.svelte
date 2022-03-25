<script lang="ts">
	import type { Tile } from 'src/global';
	import { onMount } from 'svelte';
	import lab_hall_src from '$lib/assets/lab_hall.png';
	import lab_2_src from '$lib/assets/lab2.png';
	import cave_src from '$lib/assets/cave.jpeg';
	import clearing_src from '$lib/assets/clearing.jpeg';
	import jungle1_src from '$lib/assets/jungle1.jpeg';
	import jungle2_src from '$lib/assets/jungle2.jpeg';
	import { afterNavigate } from '$app/navigation';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	export let templateName: string;

	let template = new Image();

	afterNavigate(() => {
		canvas = document.getElementById('canvas') as HTMLCanvasElement;
		ctx = canvas.getContext('2d');

		template.onload = function () {
			ctx.drawImage(template, 0, 0);
		};

		if (templateName == 'jungle_path_1') {
			template.src = jungle1_src;
		}
		if (templateName == 'jungle_path_2') {
			template.src = jungle2_src;
		}
		if (templateName == 'clearing') {
			template.src = clearing_src;
		}
		if (templateName == 'cave') {
			template.src = cave_src;
		}
		if (templateName == 'lab_hall') {
			template.src = lab_hall_src;
		}
		if (templateName == 'lab_2') {
			template.src = lab_2_src;
		}

		draw();
	});

	const draw = function () {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(template, 0, 0);
	};
</script>

<canvas id="canvas" width="1000" height="500" />
