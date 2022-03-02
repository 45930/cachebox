import { c as create_ssr_component, a as subscribe, d as escape } from "../../chunks/index-7c21a753.js";
import { s as session } from "../../chunks/stores-8bd02fcb.js";
var newGameModal_svelte_svelte_type_style_lang = "";
const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $session, $$unsubscribe_session;
  $$unsubscribe_session = subscribe(session, (value) => $session = value);
  $$unsubscribe_session();
  return `<div class="${"justify-center flex flex-wrap"}"><div class="${"justify-center mx-auto mb-16 border-2 border-solid border-sky-800 rounded px-2 py-2"}"><p class="${"text-xl font-bold"}">NEW GAME</p></div>
	<div class="${"w-full"}"></div>
	${$session && $session.user != "null_user" ? `<div class="${"justify-center mx-auto mb-16 border-2 border-solid border-sky-800 rounded px-2 py-2"}"><p class="${"text-xl font-bold"}">CONTINUE GAME</p>
			<p>Current Game State: ${escape(JSON.stringify($session))}</p></div>` : ``}</div>`;
});
export { Routes as default };
