export const manifest = {
	appDir: "_app",
	assets: new Set(["favicon.png"]),
	_: {
		mime: {".png":"image/png"},
		entry: {"file":"start-3fa6ce65.js","js":["start-3fa6ce65.js","chunks/vendor-c7513497.js","chunks/preload-helper-e4860ae8.js","chunks/singletons-a6a7384f.js"],"css":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js'),
			() => import('./nodes/3.js'),
			() => import('./nodes/4.js'),
			() => import('./nodes/5.js')
		],
		routes: [
			{
				type: 'page',
				pattern: /^\/$/,
				params: null,
				path: "/",
				shadow: null,
				a: [0,2],
				b: [1]
			},
			{
				type: 'endpoint',
				pattern: /^\/gameState\/?$/,
				params: null,
				load: () => import('./entries/endpoints/gameState.ts.js')
			},
			{
				type: 'page',
				pattern: /^\/about\/?$/,
				params: null,
				path: "/about",
				shadow: null,
				a: [0,3],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/play\/?$/,
				params: null,
				path: "/play",
				shadow: null,
				a: [0,4],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/play\/scene-([^/]+?)\/?$/,
				params: (m) => ({ i: m[1]}),
				path: null,
				shadow: null,
				a: [0,5],
				b: [1]
			}
		]
	}
};
