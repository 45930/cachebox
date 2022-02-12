import adapter from '@sveltejs/adapter-node';
import autoprefixer from 'autoprefixer'
import preprocess from 'svelte-preprocess';
import tailwind from 'tailwindcss';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(
		{
			postcss: {
				plugins: [
					tailwind,
					autoprefixer
				]
			}
		}
	),

	kit: {
		adapter: adapter(),
		vite: () => ({
			build: {
				target: ['esnext']
			},
			ssr: false,
		})
	},
};

export default config;
