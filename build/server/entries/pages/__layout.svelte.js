import { c as create_ssr_component, a as subscribe, e as each, i as is_promise, n as noop, v as validate_component, m as missing_component } from "../../chunks/index-f3d7dd3c.js";
import { w as writable } from "../../chunks/index-c1d7cf4d.js";
const exitBeforeEnter = writable(false);
const transitioning = writable(null);
const modals = writable([]);
function isLazyModal(component) {
  return typeof component.prototype === "undefined";
}
async function getComponent(component) {
  return component().then((res) => res.default);
}
const Modals = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $modals, $$unsubscribe_modals;
  let $transitioning, $$unsubscribe_transitioning;
  let $$unsubscribe_exitBeforeEnter;
  $$unsubscribe_modals = subscribe(modals, (value) => $modals = value);
  $$unsubscribe_transitioning = subscribe(transitioning, (value) => $transitioning = value);
  $$unsubscribe_exitBeforeEnter = subscribe(exitBeforeEnter, (value) => value);
  $$unsubscribe_modals();
  $$unsubscribe_transitioning();
  $$unsubscribe_exitBeforeEnter();
  return `${$modals.length > 0 ? `${slots.backdrop ? slots.backdrop({}) : ``}` : ``}

${slots.default ? slots.default({}) : `
  ${each($modals, (modal, i) => {
    return `
    ${isLazyModal(modal.component) ? `${function(__value) {
      if (is_promise(__value)) {
        __value.then(null, noop);
        return `
        ${slots.loading ? slots.loading({}) : ``}
      `;
      }
      return function(component) {
        return `
        ${validate_component(component || missing_component, "svelte:component").$$render($$result, Object.assign({
          isOpen: i === $modals.length - 1 && !$transitioning
        }, modal.props), {}, {})}
      `;
      }(__value);
    }(getComponent(modal.component))}` : `
      ${validate_component(modal.component || missing_component, "svelte:component").$$render($$result, Object.assign({
      isOpen: i === $modals.length - 1 && !$transitioning
    }, modal.props), {}, {})}`}`;
  })}
`}`;
});
var __layout_svelte_svelte_type_style_lang = "";
const css = {
  code: `*,::before,::after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}::before,::after{--tw-content:''}html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,[type='button'],[type='reset'],[type='submit']{-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type='search']{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input:-ms-input-placeholder,textarea:-ms-input-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role="button"]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]{display:none}*,::before,::after{--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x:;--tw-pan-y:;--tw-pinch-zoom:;--tw-scroll-snap-strictness:proximity;--tw-ordinal:;--tw-slashed-zero:;--tw-numeric-figure:;--tw-numeric-spacing:;--tw-numeric-fraction:;--tw-ring-inset:;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(59 130 246 / 0.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur:;--tw-brightness:;--tw-contrast:;--tw-grayscale:;--tw-hue-rotate:;--tw-invert:;--tw-saturate:;--tw-sepia:;--tw-drop-shadow:;--tw-backdrop-blur:;--tw-backdrop-brightness:;--tw-backdrop-contrast:;--tw-backdrop-grayscale:;--tw-backdrop-hue-rotate:;--tw-backdrop-invert:;--tw-backdrop-opacity:;--tw-backdrop-saturate:;--tw-backdrop-sepia:}.container{width:100%}@media(min-width: 640px){.container{max-width:640px}}@media(min-width: 768px){.container{max-width:768px}}@media(min-width: 1024px){.container{max-width:1024px}}@media(min-width: 1280px){.container{max-width:1280px}}@media(min-width: 1536px){.container{max-width:1536px}}.float-right{float:right}.float-left{float:left}.mx-auto{margin-left:auto;margin-right:auto}.my-1{margin-top:0.25rem;margin-bottom:0.25rem}.my-2{margin-top:0.5rem;margin-bottom:0.5rem}.mx-2{margin-left:0.5rem;margin-right:0.5rem}.mb-16{margin-bottom:4rem}.mb-4{margin-bottom:1rem}.mb-8{margin-bottom:2rem}.mr-6{margin-right:1.5rem}.flex{display:flex}.contents{display:contents}.h-24{height:6rem}.w-full{width:100%}.w-6{width:1.5rem}.w-lg{width:32rem}.w-80{width:20rem}.w-2xl{width:42rem}.w-40{width:10rem}.w-96{width:24rem}.max-w-md{max-width:28rem}.flex-auto{flex:1 1 auto}.cursor-pointer{cursor:pointer}.flex-wrap{flex-wrap:wrap}.items-center{align-items:center}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.space-x-2>:not([hidden])~:not([hidden]){--tw-space-x-reverse:0;margin-right:calc(0.5rem * var(--tw-space-x-reverse));margin-left:calc(0.5rem * calc(1 - var(--tw-space-x-reverse)))}.space-x-3>:not([hidden])~:not([hidden]){--tw-space-x-reverse:0;margin-right:calc(0.75rem * var(--tw-space-x-reverse));margin-left:calc(0.75rem * calc(1 - var(--tw-space-x-reverse)))}.rounded{border-radius:0.25rem}.border{border-width:1px}.border-2{border-width:2px}.border-solid{border-style:solid}.border-white{--tw-border-opacity:1;border-color:rgb(255 255 255 / var(--tw-border-opacity))}.border-sky-800{--tw-border-opacity:1;border-color:rgb(7 89 133 / var(--tw-border-opacity))}.border-neutral-200{--tw-border-opacity:1;border-color:rgb(229 229 229 / var(--tw-border-opacity))}.border-neutral-600{--tw-border-opacity:1;border-color:rgb(82 82 82 / var(--tw-border-opacity))}.bg-white{--tw-bg-opacity:1;background-color:rgb(255 255 255 / var(--tw-bg-opacity))}.bg-gray-50{--tw-bg-opacity:1;background-color:rgb(249 250 251 / var(--tw-bg-opacity))}.bg-slate-100{--tw-bg-opacity:1;background-color:rgb(241 245 249 / var(--tw-bg-opacity))}.p-1{padding:0.25rem}.p-2{padding:0.5rem}.py-5{padding-top:1.25rem;padding-bottom:1.25rem}.px-7{padding-left:1.75rem;padding-right:1.75rem}.px-3{padding-left:0.75rem;padding-right:0.75rem}.py-2\\.5{padding-top:0.625rem;padding-bottom:0.625rem}.py-2{padding-top:0.5rem;padding-bottom:0.5rem}.px-2{padding-left:0.5rem;padding-right:0.5rem}.pr-6{padding-right:1.5rem}.pt-10{padding-top:2.5rem}.text-center{text-align:center}.text-xs{font-size:0.75rem;line-height:1rem}.text-2xl{font-size:1.5rem;line-height:2rem}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-sm{font-size:0.875rem;line-height:1.25rem}.font-normal{font-weight:400}.font-bold{font-weight:700}.leading-3{line-height:.75rem}.leading-6{line-height:1.5rem}.text-gray-600{--tw-text-opacity:1;color:rgb(75 85 99 / var(--tw-text-opacity))}.text-gray-800{--tw-text-opacity:1;color:rgb(31 41 55 / var(--tw-text-opacity))}.shadow-lg{--tw-shadow:0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.shadow-md{--tw-shadow:0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.backdrop{position:fixed;top:0;bottom:0;right:0;left:0;background:rgba(0, 0, 0, 0.5)}.focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}.focus\\:ring-2:focus{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)}.focus\\:ring-gray-800:focus{--tw-ring-opacity:1;--tw-ring-color:rgb(31 41 55 / var(--tw-ring-opacity))}.focus\\:ring-offset-2:focus{--tw-ring-offset-width:2px}@media(min-width: 1024px){.lg\\:pr-16{padding-right:4rem}}@media(min-width: 1536px){.\\32xl\\:container{width:100%}@media(min-width: 640px){.\\32xl\\:container{max-width:640px}}@media(min-width: 768px){.\\32xl\\:container{max-width:768px}}@media(min-width: 1024px){.\\32xl\\:container{max-width:1024px}}@media(min-width: 1280px){.\\32xl\\:container{max-width:1280px}}@media(min-width: 1536px){.\\32xl\\:container{max-width:1536px}}.\\32xl\\:mx-auto{margin-left:auto;margin-right:auto}}`,
  map: null
};
const _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${validate_component(Modals, "Modals").$$render($$result, {}, {}, {
    backdrop: () => {
      return `<div slot="${"backdrop"}" class="${"backdrop"}"></div>`;
    }
  })}

<div class="${"2xl:container 2xl:mx-auto"}"><div class="${"bg-white rounded shadow-lg py-5 px-7"}"><nav class="${"flex justify-between"}"><ul class="${"flex flex-auto space-x-2"}"><li class="${"focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-gray-600 border border-white bg-gray-50 cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 shadow-md rounded"}"><a sveltekit:prefetch href="${"/"}">Home</a></li>
				<li class="${"focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-gray-600 border border-white bg-gray-50 cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 shadow-md rounded"}"><a sveltekit:prefetch href="${"/about"}">About</a></li></ul>
			<div class="${"flex items-center space-x-3 lg:pr-16 pr-6"}"><h2 class="${"font-normal text-2xl leading-6 text-gray-800"}">Escape Game</h2></div></nav></div></div>

<main class="${"container mx-auto pt-10"}">${slots.default ? slots.default({}) : ``}</main>`;
});
export { _layout as default };
