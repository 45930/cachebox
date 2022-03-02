export const manifest = {
	appDir: "_app",
	assets: new Set(["favicon.png"]),
	_: {
		mime: {".png":"image/png"},
		entry: {"file":"start-2fb02848.js","js":["start-2fb02848.js","chunks/vendor-c7513497.js","chunks/preload-helper-e4860ae8.js","chunks/singletons-a6a7384f.js"],"css":[]},
		nodes: [
			() => import('./server/nodes/0.js'),
			() => import('./server/nodes/1.js'),
			() => import('./server/nodes/5.js')
		],
		routes: [
			{
				type: 'endpoint',
				pattern: /^\/gameState\/?$/,
				params: null,
				load: () => import('./server/entries/endpoints/gameState.ts.js')
			},
			{
				type: 'page',
				pattern: /^\/play\/scene-([^/]+?)\/?$/,
				params: (m) => ({ i: m[1]}),
				path: null,
				shadow: null,
				a: [0,2],
				b: [1]
			}
		]
	}
};
