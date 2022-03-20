import { c as create_ssr_component, a as subscribe, v as validate_component } from "../../../../chunks/index-7c21a753.js";
import { L as LineBreak, T as TileMovements, l as locationStore } from "../../../../chunks/_tileMovements-e0c5c3fa.js";
import { T as TilePrompt } from "../../../../chunks/_tilePrompt-47eff397.js";
import Canvas from "../canvas/index.svelte.js";
import "../../../../chunks/index-6b8fbbc5.js";
const load = async function({ url, params, fetch, session, context }) {
  return { props: { tile: params.tile_id } };
};
const U5Btile_idu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let tileConfig;
  let $locationStore, $$unsubscribe_locationStore;
  $$unsubscribe_locationStore = subscribe(locationStore, (value) => $locationStore = value);
  let { tile } = $$props;
  if ($$props.tile === void 0 && $$bindings.tile && tile !== void 0)
    $$bindings.tile(tile);
  tileConfig = $locationStore[tile];
  $$unsubscribe_locationStore();
  return `<div class="${"container flex justify-center flex-wrap"}">${validate_component(Canvas, "Canvas").$$render($$result, { tileConfig }, {}, {})}
	<div class="${"relative bottom-36"}"><div id="${"tile-prompt"}" class="${"p-2 mb-12 rounded border-neutral-200 border-solid border-2 bg-white opacity-80"}">${validate_component(TilePrompt, "TilePrompt").$$render($$result, { prompt: tileConfig.prompt }, {}, {})}</div>
		${validate_component(LineBreak, "LineBreak").$$render($$result, {}, {}, {})}
		<div id="${"tile-movements"}" class="${"w-2xl mb-4 p-2 rounded border-neutral-200 border-solid border-2"}">${validate_component(TileMovements, "TileMovements").$$render($$result, { movements: tileConfig.movements }, {}, {})}</div></div></div>`;
});
export { U5Btile_idu5D as default, load };
