import { c as create_ssr_component, a as subscribe, v as validate_component, e as each, d as escape } from "./index-f3d7dd3c.js";
import { l as locationStore, I as InteractionType, L as LineBreak, T as TileMovements } from "./_tileMovements-f9f0e983.js";
const MBrother = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let dialogueHistory;
  let $locationStore, $$unsubscribe_locationStore;
  $$unsubscribe_locationStore = subscribe(locationStore, (value) => $locationStore = value);
  let { name } = $$props;
  const config = $locationStore[name];
  const dialogueOptions = config.interactions.filter((x) => x.type == InteractionType.Dialogue);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  dialogueHistory = config.prompt.map((x) => {
    return { from: "them", text: x };
  });
  $$unsubscribe_locationStore();
  return `<div class="${"container flex justify-center flex-wrap"}">${name == "marcus" ? `<svg viewBox="${"0 0 90 90"}" fill="${"none"}" role="${"img"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"128"}" height="${"128"}"><mask id="${"mask__ring"}" maskUnits="${"userSpaceOnUse"}" x="${"0"}" y="${"0"}" width="${"90"}" height="${"90"}"><rect width="${"90"}" height="${"90"}" fill="${"#FFFFFF"}"></rect></mask><g mask="${"url(#mask__ring)"}"><path d="${"M0 0h90v45H0z"}" fill="${"#680148"}"></path><path d="${"M0 45h90v45H0z"}" fill="${"#000000"}"></path><path d="${"M83 45a38 38 0 00-76 0h76z"}" fill="${"#000000"}"></path><path d="${"M83 45a38 38 0 01-76 0h76z"}" fill="${"#e0eff1"}"></path><path d="${"M77 45a32 32 0 10-64 0h64z"}" fill="${"#e0eff1"}"></path><path d="${"M77 45a32 32 0 11-64 0h64z"}" fill="${"#7db4b5"}"></path><path d="${"M71 45a26 26 0 00-52 0h52z"}" fill="${"#7db4b5"}"></path><path d="${"M71 45a26 26 0 01-52 0h52z"}" fill="${"#680148"}"></path><circle cx="${"45"}" cy="${"45"}" r="${"23"}" fill="${"#ffffff"}"></circle></g></svg>` : `<svg viewBox="${"0 0 90 90"}" fill="${"none"}" role="${"img"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"128"}" height="${"128"}"><mask id="${"mask__ring"}" maskUnits="${"userSpaceOnUse"}" x="${"0"}" y="${"0"}" width="${"90"}" height="${"90"}"><rect width="${"90"}" height="${"90"}" fill="${"#FFFFFF"}"></rect></mask><g mask="${"url(#mask__ring)"}"><path d="${"M0 0h90v45H0z"}" fill="${"#000000"}"></path><path d="${"M0 45h90v45H0z"}" fill="${"#e0eff1"}"></path><path d="${"M83 45a38 38 0 00-76 0h76z"}" fill="${"#e0eff1"}"></path><path d="${"M83 45a38 38 0 01-76 0h76z"}" fill="${"#7db4b5"}"></path><path d="${"M77 45a32 32 0 10-64 0h64z"}" fill="${"#7db4b5"}"></path><path d="${"M77 45a32 32 0 11-64 0h64z"}" fill="${"#ffffff"}"></path><path d="${"M71 45a26 26 0 00-52 0h52z"}" fill="${"#ffffff"}"></path><path d="${"M71 45a26 26 0 01-52 0h52z"}" fill="${"#000000"}"></path><circle cx="${"45"}" cy="${"45"}" r="${"23"}" fill="${"#680148"}"></circle></g></svg>`}
	${validate_component(LineBreak, "LineBreak").$$render($$result, {}, {}, {})}
	<div id="${"dialogue"}" class="${"w-lg"}">${each(dialogueHistory, (message) => {
    return `${message.from == "them" ? `<div class="${"float-left w-80 rounded bg-slate-100 p-1 my-1"}">${escape(message.text)}</div>` : `<div class="${"float-right w-80 bg-slate-100 p-1 my-1"}">${escape(message.text)}</div>`}
			${validate_component(LineBreak, "LineBreak").$$render($$result, {}, {}, {})}`;
  })}</div>
	<div id="${"questions"}">${each(dialogueOptions, (diag) => {
    return `<div class="${"cursor-pointer my-2 p-1"}">${escape(diag.prompt)}
			</div>`;
  })}</div>
	${validate_component(TileMovements, "TileMovements").$$render($$result, { movements: config.movements }, {}, {})}</div>`;
});
export { MBrother as M };
