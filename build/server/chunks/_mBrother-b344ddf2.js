import { c as create_ssr_component, a as subscribe, v as validate_component, e as each, f as add_attribute, d as escape } from "./index-7c21a753.js";
import { l as locationStore, I as InteractionType, T as TileMovements, L as LineBreak } from "./_tileMovements-e0c5c3fa.js";
import Canvas from "../entries/pages/play/canvas/index.svelte.js";
import { s as session } from "./stores-8bd02fcb.js";
const MBrother = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let dialogueHistory;
  let tileConfig;
  let $locationStore, $$unsubscribe_locationStore;
  let $session, $$unsubscribe_session;
  $$unsubscribe_locationStore = subscribe(locationStore, (value) => $locationStore = value);
  $$unsubscribe_session = subscribe(session, (value) => $session = value);
  let { name } = $$props;
  const config = $locationStore[name];
  const dialogueOptions = {};
  config.interactions.filter((x) => x.type == InteractionType.Dialogue).forEach((diag) => {
    dialogueOptions[diag.short || diag.prompt] = diag;
  });
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  dialogueHistory = config.prompt.map((x) => {
    return { from: "them", text: x };
  });
  tileConfig = $locationStore[name];
  $$unsubscribe_locationStore();
  $$unsubscribe_session();
  return `<div class="${"container flex justify-center flex-wrap"}">${validate_component(Canvas, "Canvas").$$render($$result, { tileConfig }, {}, {})}
	<div class="${"relative -top-96 mx-auto"}"><div id="${"questions"}" class="${"flex justify-end mb-3"}">
			<div class="${"bg-slate-500 opacity-80"}"><select name="${"select"}" id="${"select"}" class="${"px-4 outline-none text-gray-800 w-full"}"><option value="${"Ask a Question"}" selected disabled hidden>Ask a Question</option>${each(Object.values(dialogueOptions), (diag) => {
    return `${diag.blockedOn ? `${$session[diag.blockedOn] ? `<option class="${"bg-orange-300 opacity-80"}"${add_attribute("value", diag.short || diag.prompt, 0)}>${escape(diag.short || diag.prompt)}</option>` : ``}` : `<option${add_attribute("value", diag.short || diag.prompt, 0)}>${escape(diag.short || diag.prompt)}</option>`}`;
  })}</select></div></div>
		<div id="${"dialogue"}" class="${"w-lg h-80 mx-auto overflow-y-auto bg-white opacity-80 mb-12"}">${each(dialogueHistory, (message) => {
    return `${message.from == "them" ? `<div class="${"float-left w-80 rounded bg-slate-400 p-1 my-1 ml-1"}">${escape(message.text)}</div>` : `<div class="${"float-right w-80 rounded bg-blue-400 p-1 my-1 mr-1"}">${escape(message.text)}</div>`}
				${validate_component(LineBreak, "LineBreak").$$render($$result, {}, {}, {})}`;
  })}</div>
		<div id="${"tile-movements"}" class="${"w-2xl mb-4 p-2 rounded border-neutral-200 border-solid border-2"}">${validate_component(TileMovements, "TileMovements").$$render($$result, { movements: config.movements }, {}, {})}</div></div></div>`;
});
export { MBrother as M };
