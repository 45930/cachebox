import { c as create_ssr_component, a as subscribe, d as escape, e as each, f as add_attribute } from "../../../../chunks/index-7c21a753.js";
import { w as writable, r as readable } from "../../../../chunks/index-6b8fbbc5.js";
const snapps = {};
const deployedSnappsStore = writable(snapps);
const stepsConfig = {
  1: {
    "message": [
      "Welcome to the game.",
      "Choose an action below, then enter the secret phrase once you know."
    ],
    "toSteps": [
      {
        "id": 2,
        "prompt": "Examine article 1"
      },
      {
        "id": 3,
        "prompt": "Look behind object 2"
      },
      {
        "id": 4,
        "prompt": "Talk to character 3"
      }
    ],
    "snapp": {
      "key": "secretPhrase",
      "methods": [
        {
          "name": "guessPhrase",
          "label": "What is the secret phrase?",
          "inputs": [
            {
              "label": "",
              "dtype": "string",
              "value": null
            }
          ]
        }
      ]
    }
  },
  2: {
    "message": [
      "You chose option 1 - you learn that the first word is 'mina'"
    ],
    "toSteps": [
      {
        "id": 1,
        "prompt": "Return Home"
      }
    ]
  },
  3: {
    "message": [
      "You chose option 2 - you learn that the second word is 'is'"
    ],
    "toSteps": [
      {
        "id": 1,
        "prompt": "Return Home"
      }
    ]
  },
  4: {
    "message": [
      "You chose option 3 - you learn that the third word is 'cool'"
    ],
    "toSteps": [
      {
        "id": 1,
        "prompt": "Return Home"
      }
    ]
  }
};
const gameStepStore = readable(stepsConfig);
const isSnarkyLoaded = false;
const snarkyStore = writable(isSnarkyLoaded);
const load = async function({ url, params, fetch, session, context }) {
  return { props: { stepId: params.i } };
};
const Scene_u5Biu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let stepConfig;
  let $$unsubscribe_deployedSnappsStore;
  let $$unsubscribe_snarkyStore;
  let $gameStepStore, $$unsubscribe_gameStepStore;
  $$unsubscribe_deployedSnappsStore = subscribe(deployedSnappsStore, (value) => value);
  $$unsubscribe_snarkyStore = subscribe(snarkyStore, (value) => value);
  $$unsubscribe_gameStepStore = subscribe(gameStepStore, (value) => $gameStepStore = value);
  let { stepId } = $$props;
  let feedback = "";
  if ($$props.stepId === void 0 && $$bindings.stepId && stepId !== void 0)
    $$bindings.stepId(stepId);
  stepConfig = $gameStepStore[stepId];
  $$unsubscribe_deployedSnappsStore();
  $$unsubscribe_snarkyStore();
  $$unsubscribe_gameStepStore();
  return `<div class="${"container"}"><div id="${"message"}">${escape(stepConfig.message[0])}</div>
	<div id="${"choices"}">${each(stepConfig.toSteps, (toStep) => {
    return `<div class="${"justify-center mx-auto mb-16 border-2 border-solid border-sky-800 rounded px-2 py-2"}">${escape(toStep.prompt)}
			</div>`;
  })}</div>
	${stepConfig.snapp ? `<div id="${"snapp"}"><div>${escape(stepConfig.snapp.key)}</div>
			${each(stepConfig.snapp.methods, (method) => {
    return `<div><h2>${escape(method.label)}</h2>
					${each(method.inputs, (input) => {
      return `<input type="${"string"}" class="${"w-100 px-4 py-1 font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded m-0"}"${add_attribute("value", input.value, 0)}>`;
    })}
					<button>Submit</button>
				</div>`;
  })}</div>
		<div id="${"feedback"}">${escape(feedback)}</div>` : ``}</div>`;
});
export { Scene_u5Biu5D as default, load };
