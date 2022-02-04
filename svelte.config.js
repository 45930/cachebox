import adapter from '@sveltejs/adapter-auto';
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
	}
};

export default config;
