import { c as create_ssr_component, d as escape, v as validate_component } from "./index-7c21a753.js";
import { L as LineBreak } from "./_tileMovements-e0c5c3fa.js";
const TilePrompt = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let currentPromptIndex;
  let currentPromptSegment;
  let { prompt } = $$props;
  if ($$props.prompt === void 0 && $$bindings.prompt && prompt !== void 0)
    $$bindings.prompt(prompt);
  currentPromptIndex = 0;
  currentPromptSegment = prompt[currentPromptIndex];
  return `<div id="${"tile-prompt-content"}" class="${"w-xl h-16"}">${escape(currentPromptSegment)}</div>
${validate_component(LineBreak, "LineBreak").$$render($$result, {}, {}, {})}
<div id="${"tile-prompt-actions"}" class="${"flex justify-end mr-6"}"><button class="${"px-2 mx-2 rounded border-neutral-600 border-solid border-2 cursor-pointer"}" ${currentPromptIndex == 0 ? "disabled" : ""}>&lt;</button>
	${escape(currentPromptIndex + 1)} of ${escape(prompt.length)}
	<button class="${"px-2 mx-2 rounded border-neutral-600 border-solid border-2 cursor-pointer"}" ${currentPromptIndex == prompt.length - 1 ? "disabled" : ""}>&gt;</button></div>`;
});
export { TilePrompt as T };
