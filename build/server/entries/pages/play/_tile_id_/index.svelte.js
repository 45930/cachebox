import { c as create_ssr_component, a as subscribe, v as validate_component } from "../../../../chunks/index-f3d7dd3c.js";
import { L as LineBreak, T as TileMovements, l as locationStore } from "../../../../chunks/_tileMovements-f9f0e983.js";
import { T as TilePrompt, a as TileInteractions } from "../../../../chunks/_tileInteractions-9cea8494.js";
import "../../../../chunks/index-c1d7cf4d.js";
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
  return `<div class="${"container flex justify-center flex-wrap"}">${validate_component(TilePrompt, "TilePrompt").$$render($$result, { prompt: tileConfig.prompt }, {}, {})}
	${validate_component(LineBreak, "LineBreak").$$render($$result, {}, {}, {})}
	${validate_component(TileInteractions, "TileInteractions").$$render($$result, { interactions: tileConfig.interactions }, {}, {})}
	${validate_component(TileMovements, "TileMovements").$$render($$result, { movements: tileConfig.movements }, {}, {})}</div>`;
});
export { U5Btile_idu5D as default, load };
