export const manifest = {
	appDir: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		entry: {"file":"start-dcb65f5f.js","js":["start-dcb65f5f.js","chunks/vendor-fc529e69.js","chunks/preload-helper-e4860ae8.js","chunks/singletons-d1fb5791.js"],"css":[]},
		nodes: [
			() => import('./server/nodes/0.js'),
			() => import('./server/nodes/1.js'),
			() => import('./server/nodes/2.js'),
			() => import('./server/nodes/3.js'),
			() => import('./server/nodes/4.js'),
			() => import('./server/nodes/5.js'),
			() => import('./server/nodes/6.js'),
			() => import('./server/nodes/7.js'),
			() => import('./server/nodes/8.js'),
			() => import('./server/nodes/9.js'),
			() => import('./server/nodes/10.js')
		],
		routes: [
			{
				type: 'page',
				id: "",
				pattern: /^\/$/,
				names: [],
				types: [],
				path: "/",
				shadow: null,
				a: [0,2],
				b: [1]
			},
			{
				type: 'endpoint',
				id: "gameState",
				pattern: /^\/gameState\/?$/,
				names: [],
				types: [],
				load: () => import('./server/entries/endpoints/gameState.ts.js')
			},
			{
				type: 'page',
				id: "about",
				pattern: /^\/about\/?$/,
				names: [],
				types: [],
				path: "/about",
				shadow: null,
				a: [0,3],
				b: [1]
			},
			{
				type: 'page',
				id: "play",
				pattern: /^\/play\/?$/,
				names: [],
				types: [],
				path: "/play",
				shadow: null,
				a: [0,4],
				b: [1]
			},
			{
				type: 'page',
				id: "play/clearing",
				pattern: /^\/play\/clearing\/?$/,
				names: [],
				types: [],
				path: "/play/clearing",
				shadow: null,
				a: [0,5],
				b: [1]
			},
			{
				type: 'page',
				id: "play/lab_hall",
				pattern: /^\/play\/lab_hall\/?$/,
				names: [],
				types: [],
				path: "/play/lab_hall",
				shadow: null,
				a: [0,6],
				b: [1]
			},
			{
				type: 'page',
				id: "play/canvas",
				pattern: /^\/play\/canvas\/?$/,
				names: [],
				types: [],
				path: "/play/canvas",
				shadow: null,
				a: [0,7],
				b: [1]
			},
			{
				type: 'page',
				id: "play/marcus",
				pattern: /^\/play\/marcus\/?$/,
				names: [],
				types: [],
				path: "/play/marcus",
				shadow: null,
				a: [0,8],
				b: [1]
			},
			{
				type: 'page',
				id: "play/merlin",
				pattern: /^\/play\/merlin\/?$/,
				names: [],
				types: [],
				path: "/play/merlin",
				shadow: null,
				a: [0,9],
				b: [1]
			},
			{
				type: 'page',
				id: "play/[tile_id]",
				pattern: /^\/play\/([^/]+?)\/?$/,
				names: ["tile_id"],
				types: [null],
				path: null,
				shadow: null,
				a: [0,10],
				b: [1]
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
