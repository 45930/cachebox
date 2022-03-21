<script lang="ts">
	import cliff_top_src from '$lib/assets/cliff_top.png';
	import wave1_src from '$lib/assets/wave3.png';
	import wave2_src from '$lib/assets/wave4.png';
	import { afterNavigate } from '$app/navigation';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	export let templateName: string;

	let template = new Image();
	let wave1 = new Image();
	let wave2 = new Image();

	let animation: number;

	const wave1_motion = {
		y: -100,
		vy: -1,
		draw: function () {
			ctx.drawImage(wave1, 0, this.y);
		}
	};

	const wave2_motion = {
		y: -250,
		vy: 1,
		draw: function () {
			ctx.drawImage(wave2, 0, this.y);
		}
	};

	afterNavigate(() => {
		if (animation) {
			window.cancelAnimationFrame(animation);
		}

		canvas = document.getElementById('canvas') as HTMLCanvasElement;
		ctx = canvas.getContext('2d');

		template.onload = function () {
			ctx.drawImage(template, 0, 0);
		};

		wave1.onload = function () {
			ctx.drawImage(wave1, 0, 100);
		};

		if (templateName == 'cliff_top') {
			template.src = cliff_top_src;
		}
		wave1.src = wave1_src;
		wave2.src = wave2_src;

		draw();
	});

	const draw = function () {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(template, 0, 0);
		wave1_motion.draw();
		wave2_motion.draw();
		wave1_motion.y += wave1_motion.vy;
		wave2_motion.y += wave2_motion.vy;

		if (wave1_motion.y >= -100) {
			wave1_motion.vy = -1;
		}
		if (wave1_motion.y <= -250) {
			wave1_motion.vy = 1;
		}
		if (wave2_motion.y >= -100) {
			wave2_motion.vy = -1;
		}
		if (wave2_motion.y <= -250) {
			wave2_motion.vy = 1;
		}

		animation = window.requestAnimationFrame(draw);
	};
</script>

<canvas id="canvas" width="1000" height="500" />
