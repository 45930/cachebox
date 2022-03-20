import adapter from '@sveltejs/adapter-node';
// import adapter from '@sveltejs/adapter-static';
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
		adapter: adapter({
			out: 'build',
			envPrefix: {
				headers: {
					'Cross-Origin-Embedder-Policy': 'CO_EMBEDDER_POLICY',
					'Cross-Origin-Opener-Policy': 'CO_OPENER_POLICY',
					'Cache-Control': 'CACHE_CONTROL'
				}
			}
		}),
		prerender: {
			enabled: false,
		},

		vite: () => ({
			optimizeDeps: {
				exclude: ["svelte-kit-cookie-session"],
			},
			build: {
				target: ['esnext']
			},
			ssr: false,
		})
	},
};

export default config;
