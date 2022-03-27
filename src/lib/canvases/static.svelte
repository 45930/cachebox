<script lang="ts">
	import in_shack_src from '$lib/assets/in_shack.jpeg';
	import lab_wall_src from '$lib/assets/lab_wall.jpeg';
	import lab_hall_src from '$lib/assets/lab_hall.png';
	import lab_2_src from '$lib/assets/lab2.png';
	import lab_3_src from '$lib/assets/lab_3.jpeg';
	import cave_src from '$lib/assets/cave.jpeg';
	import clearing_src from '$lib/assets/clearing.jpeg';
	import jungle1_src from '$lib/assets/jungle1.jpeg';
	import jungle2_src from '$lib/assets/jungle2.jpeg';
	import winner_src from '$lib/assets/winner.jpeg';
	import loser_src from '$lib/assets/loser.jpeg';
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
		if (templateName == 'lab_3') {
			template.src = lab_3_src;
		}
		if (templateName == 'lab_1') {
			template.src = lab_wall_src;
		}
		if (templateName == 'unlabeled_room') {
			template.src = lab_wall_src;
		}
		if (templateName == 'in_shack') {
			template.src = in_shack_src;
		}
		if (templateName == 'winner') {
			template.src = winner_src;
		}
		if (templateName == 'loser') {
			template.src = loser_src;
		}

		draw();
	});

	const draw = function () {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(template, 0, 0);
	};
</script>

<canvas id="canvas" width="1000" height="500" />
