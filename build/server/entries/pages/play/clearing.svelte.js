import { c as create_ssr_component, a as subscribe, v as validate_component } from "../../../chunks/index-7c21a753.js";
import { L as LineBreak, T as TileMovements, l as locationStore } from "../../../chunks/_tileMovements-e0c5c3fa.js";
import { T as TilePrompt } from "../../../chunks/_tilePrompt-47eff397.js";
import { d as deployedSnappsStore } from "../../../chunks/minaStore-fbb2f892.js";
import Canvas from "./canvas/index.svelte.js";
import { s as session } from "../../../chunks/stores-8bd02fcb.js";
import "../../../chunks/index-6b8fbbc5.js";
const Clearing = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isSnarkyLoaded;
  let tileConfig;
  let $locationStore, $$unsubscribe_locationStore;
  let $$unsubscribe_deployedSnappsStore;
  let $$unsubscribe_session;
  $$unsubscribe_locationStore = subscribe(locationStore, (value) => $locationStore = value);
  $$unsubscribe_deployedSnappsStore = subscribe(deployedSnappsStore, (value) => value);
  $$unsubscribe_session = subscribe(session, (value) => value);
  isSnarkyLoaded = false;
  tileConfig = $locationStore["clearing"];
  $$unsubscribe_locationStore();
  $$unsubscribe_deployedSnappsStore();
  $$unsubscribe_session();
  return `<div class="${"container flex justify-center flex-wrap"}">${validate_component(Canvas, "Canvas").$$render($$result, { tileConfig }, {}, {})}
	<div class="${"relative bottom-36"}"><div id="${"tile-prompt"}" class="${"p-2 mb-12 rounded border-neutral-200 border-solid border-2 bg-white opacity-80"}">${validate_component(TilePrompt, "TilePrompt").$$render($$result, { prompt: tileConfig.prompt }, {}, {})}</div>
		${validate_component(LineBreak, "LineBreak").$$render($$result, {}, {}, {})}
		${isSnarkyLoaded ? `<button>Inspect Keypad</button>` : `<p>Waiting for snarky...</p>`}
		${validate_component(LineBreak, "LineBreak").$$render($$result, {}, {}, {})}
		<div id="${"tile-movements"}" class="${"w-2xl mb-4 p-2 rounded border-neutral-200 border-solid border-2"}">${validate_component(TileMovements, "TileMovements").$$render($$result, { movements: tileConfig.movements }, {}, {})}</div></div></div>`;
});
export { Clearing as default };
