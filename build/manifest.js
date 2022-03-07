export const manifest = {
	appDir: "_app",
	assets: new Set(["favicon.png"]),
	_: {
		mime: {".png":"image/png"},
		entry: {"file":"start-1499b0fa.js","js":["start-1499b0fa.js","chunks/vendor-77d161ad.js","chunks/preload-helper-e4860ae8.js","chunks/singletons-a6a7384f.js"],"css":[]},
		nodes: [
			() => import('./server/nodes/0.js'),
			() => import('./server/nodes/1.js'),
			() => import('./server/nodes/2.js'),
			() => import('./server/nodes/3.js'),
			() => import('./server/nodes/4.js'),
			() => import('./server/nodes/5.js'),
			() => import('./server/nodes/6.js'),
			() => import('./server/nodes/7.js'),
			() => import('./server/nodes/8.js')
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
				load: () => import('./server/entries/endpoints/gameState.ts.js')
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
				pattern: /^\/play\/clearing\/?$/,
				params: null,
				path: "/play/clearing",
				shadow: null,
				a: [0,5],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/play\/marcus\/?$/,
				params: null,
				path: "/play/marcus",
				shadow: null,
				a: [0,6],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/play\/merlin\/?$/,
				params: null,
				path: "/play/merlin",
				shadow: null,
				a: [0,7],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/play\/([^/]+?)\/?$/,
				params: (m) => ({ tile_id: m[1]}),
				path: null,
				shadow: null,
				a: [0,8],
				b: [1]
			}
		]
	}
};
