import { c as create_ssr_component, a as subscribe } from "../../../chunks/index-f3d7dd3c.js";
import { s as session } from "../../../chunks/stores-d93249e7.js";
const Play = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_session;
  $$unsubscribe_session = subscribe(session, (value) => value);
  $$unsubscribe_session();
  return `<div>Playing</div>`;
});
export { Play as default };
