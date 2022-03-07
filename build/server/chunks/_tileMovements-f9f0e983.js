import { r as readable } from "./index-c1d7cf4d.js";
import { c as create_ssr_component, e as each, d as escape } from "./index-f3d7dd3c.js";
var InteractionType = /* @__PURE__ */ ((InteractionType2) => {
  InteractionType2[InteractionType2["Inspect"] = 0] = "Inspect";
  InteractionType2[InteractionType2["Dialogue"] = 1] = "Dialogue";
  return InteractionType2;
})(InteractionType || {});
const locations = {
  beach_landing: {
    id: "beach_landing",
    title: "Beach",
    prompt: ["You roll onto the beach, coughing saltwater, exhausted.  After resting briefly, you take a look around to get your bearings and see some rocky cliffs to one side, and beach continuing as far as you can see in the other direction."],
    movements: [
      {
        prompt: "Try to climb up the cliff to get a better view",
        to: "cliff_top"
      },
      {
        prompt: "Walk down the beach and see if there's anything beyond the bend",
        to: "beach_1"
      }
    ]
  },
  cliff_top: {
    id: "cliff_top",
    title: "Cliff Top",
    prompt: [
      "From the top of a cliff you feel the wind rush through your hair.  You smell the salty ocean mixed with an earthy, vegetal jungle smell.",
      "From the curve of the coastline, you suspect that this is an island, although the beach goes on in one direction, bending out of view, and in the other direction, it is jagged rock."
    ],
    movements: [
      {
        prompt: "Climb down to the beach",
        to: "beach_landing"
      },
      {
        prompt: "Cut inland through the dense jungle",
        to: "jungle_path_1"
      }
    ]
  },
  beach_1: {
    id: "beach_1",
    title: "Beach",
    prompt: ["The beach continues on in both directions.  You spot what looks like a footpath headed inland."],
    movements: [
      {
        prompt: "Walk the beach toward the cliffs",
        to: "beach_landing"
      },
      {
        prompt: "Walk the beach the other way",
        to: "beach_2"
      },
      {
        prompt: "Follow the footpath",
        to: "jungle_path_2"
      }
    ]
  },
  beach_2: {
    id: "beach_2",
    title: "Beach",
    prompt: [
      "You walk until you reach an opressive opaque wall with barbed wire on top.",
      "You can't continue this way, but there appears to be a complex behind this wall.  Maybe there are other people.  You have to get to the bottom of this..."
    ],
    movements: [
      {
        prompt: "Walk the beach back in the direction from which you came",
        to: "beach_1"
      }
    ]
  },
  jungle_path_1: {
    id: "jungle_path_1",
    title: "Jungle Path",
    prompt: ["You come across a path.  One way leads to the cliffs near the beach, the other way leads to a simple shack in a clearing."],
    movements: [
      {
        prompt: "Walk the path toward the cliffs",
        to: "cliff_top"
      },
      {
        prompt: "Walk the path toward the shack",
        to: "shack"
      }
    ]
  },
  jungle_path_2: {
    id: "jungle_path_2",
    title: "Jungle Path",
    prompt: ["You reach a 3-way fork.  One direction leads to the beach, another leads into a dark cave, the final direction leads to a simple shack in a clearing."],
    movements: [
      {
        prompt: "Head toward the beach",
        to: "beach_1"
      },
      {
        prompt: "Enter the cave",
        to: "merlin"
      },
      {
        prompt: "Walk the path toward the shack",
        to: "shack"
      }
    ]
  },
  shack: {
    id: "schack",
    title: "Shack",
    prompt: [
      "There is a clearing with a shack, a fire pit, and some fruit trees",
      "No one seems to be around..."
    ],
    movements: [
      {
        prompt: "Go further into the clearing",
        to: "clearing"
      },
      {
        prompt: "Follow a footpath toward the cliffs",
        to: "jungle_path_1"
      },
      {
        prompt: "Follow a footpath toward the beach",
        to: "jungle_path_2"
      }
    ]
  },
  merlin: {
    id: "merlin",
    title: "Merlin's Cave",
    prompt: [
      "Greetings lost one, you may call me Merlin",
      "I am a spirit of this island.  When asked a direct question, I may never lie.",
      "Beware, my brother Marcus inhabits the island as well and, when asked, he may never speak the truth.",
      "What would you like to know?"
    ],
    movements: [
      {
        prompt: "Leave Merlin's Cave",
        to: "jungle_path_2"
      }
    ],
    interactions: [
      {
        type: InteractionType.Dialogue,
        prompt: "You can't lie to me?",
        response: "It is forbidden.  I am bound to tell the truth"
      },
      {
        type: InteractionType.Dialogue,
        prompt: "If I ask your brother a question, will he tell me the truth?",
        response: "He will not."
      },
      {
        type: InteractionType.Dialogue,
        prompt: "If I ask your brother if you are a liar, will he tell me that you are?",
        response: "No, the sneaky devil!"
      },
      {
        type: InteractionType.Dialogue,
        prompt: "What is this island?",
        response: "You have died and come to this island as something of a proving ground.  A higher power than either of us will judge your merits on the island and determine your fate."
      },
      {
        type: InteractionType.Dialogue,
        prompt: "Is it possible to leave the island?",
        response: "You will leave when your fate has been decided, not before."
      },
      {
        type: InteractionType.Dialogue,
        prompt: "What is the wall I saw on the beach? (Question should be gated based on context)",
        response: "I do not know for I have never seen any wall"
      },
      {
        type: InteractionType.Dialogue,
        prompt: "Do you know what code I should enter to activate the keypad? (Question should be gated based on context)",
        response: "94773 ought to get you in."
      }
    ]
  },
  marcus: {
    id: "marcus",
    title: "Marcus' Cave",
    prompt: [
      "Hello friend!  I see you have come across my humble cavern abode.  Welcome!",
      "I am Marcus.  My brother Merlin and I are the spirits of the island.  When asked a direct question, I must always answer true.  Merlin must always lie.",
      "Ask me your questions, and I will answer as best I can."
    ],
    movements: [
      {
        prompt: "Leave Marcus' Cave",
        to: "clearing"
      }
    ],
    interactions: [
      {
        type: InteractionType.Dialogue,
        prompt: "You can't lie to me?",
        response: "That's right.  I must always tell the truth."
      },
      {
        type: InteractionType.Dialogue,
        prompt: "If I ask your brother a question, will he tell me the truth?",
        response: "No, he will lie to you."
      },
      {
        type: InteractionType.Dialogue,
        prompt: "If I ask your brother if you are a liar, will he tell me that you are?",
        response: "Yes!  It's not true!"
      },
      {
        type: InteractionType.Dialogue,
        prompt: "What is this island?",
        response: "This island is a construct meant to test you."
      },
      {
        type: InteractionType.Dialogue,
        prompt: "Is it possible to leave the island?",
        response: "Yes.  You will leave the island one way or another."
      },
      {
        type: InteractionType.Dialogue,
        prompt: "What is the wall I saw on the beach? (Question should be gated based on context)",
        response: "I rarely leave my cave.  I don't know the wall, perhaps it's new."
      },
      {
        type: InteractionType.Dialogue,
        prompt: "Do you know what code I should enter to activate the keypad? (Question should be gated based on context)",
        response: "Last I heard, it was 16171."
      }
    ]
  },
  clearing: {
    id: "clearing",
    title: "Clearing",
    prompt: [
      "You enter a clearing adjacent to the shack.",
      "There is a cave entrance to one side",
      "Interesting... is that a keypad?"
    ],
    movements: [
      {
        prompt: "Enter the cave",
        to: "marcus"
      },
      {
        prompt: "Go to the shack",
        to: "shack"
      }
    ]
  },
  winner: {
    id: "winner",
    title: "Winner",
    prompt: [
      "You have completed the game so far, congratulations"
    ],
    movements: [
      {
        prompt: "Return to the clearing",
        to: "clearing"
      }
    ]
  },
  loser: {
    id: "loser",
    title: "Loser",
    prompt: [
      "You entered the wrong key code and tripped a booby trap.",
      "Try again and make sure you listen carefully to Merlin and Marcus"
    ],
    movements: [
      {
        prompt: "Play Again",
        to: "beach_landing"
      }
    ]
  }
};
const locationStore = readable(locations);
const LineBreak = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"w-full"}"></div>`;
});
const TileMovements = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { movements } = $$props;
  if ($$props.movements === void 0 && $$bindings.movements && movements !== void 0)
    $$bindings.movements(movements);
  return `<div id="${"tile-movements"}" class="${"w-2xl mb-4 p-2 rounded border-neutral-200 border-solid border-2"}"><div class="${"w-full flex"}">${each(movements, (movement) => {
    return `<div class="${"w-40 h-24 border-2 border-solid border-neutral-600 rounded mx-2 px-2 py-2 text-sm"}">${escape(movement.prompt)}
			</div>`;
  })}</div></div>`;
});
export { InteractionType as I, LineBreak as L, TileMovements as T, locationStore as l };
