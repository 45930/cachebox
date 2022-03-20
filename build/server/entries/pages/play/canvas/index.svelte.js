import { c as create_ssr_component } from "../../../../chunks/index-7c21a753.js";
const Canvas = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { tileConfig } = $$props;
  if ($$props.tileConfig === void 0 && $$bindings.tileConfig && tileConfig !== void 0)
    $$bindings.tileConfig(tileConfig);
  return `<canvas id="${"canvas"}" width="${"1000"}" height="${"500"}"></canvas>`;
});
export { Canvas as default };
