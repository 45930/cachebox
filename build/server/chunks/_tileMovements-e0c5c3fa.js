import { r as readable } from "./index-6b8fbbc5.js";
import { c as create_ssr_component, e as each, d as escape } from "./index-7c21a753.js";
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
        short: "Will your brother tell the truth?",
        response: "He will not."
      },
      {
        type: InteractionType.Dialogue,
        prompt: "If I ask your brother if you are a liar, will he tell me that you are?",
        short: "Will your brother call you a liar?",
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
        prompt: "Do you know what code I should enter to activate the keypad?",
        short: "What is the code?",
        blockedOn: "hasVisitedClearing",
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
        short: "Will your brother tell the truth?",
        response: "No, he will lie to you."
      },
      {
        type: InteractionType.Dialogue,
        prompt: "If I ask your brother if you are a liar, will he tell me that you are?",
        short: "Will your brother call you a liar?",
        response: "Yes!  It's not true!"
      },
      {
        type: InteractionType.Dialogue,
        prompt: "Is it possible to leave the island?",
        response: "Yes."
      },
      {
        type: InteractionType.Dialogue,
        prompt: "Do you know what code I should enter to activate the keypad?",
        short: "What is the code?",
        blockedOn: "hasVisitedClearing",
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
  lab_hall: {
    id: "lab_hall",
    title: "Lab Hall",
    prompt: [
      "You are in a harshly lit hallway with white linoleum floors",
      "There are some doors off the hallway into lab rooms",
      "At the end of the hallway, there is a keypad"
    ],
    movements: [
      {
        prompt: "Enter the door marked: 'Laboratory 3'",
        to: "lab_3"
      },
      {
        prompt: "Enter the door marked: 'Laboratory 2'",
        to: "lab_2"
      },
      {
        prompt: "Enter an unlabeled room near the exit",
        to: "unlabeled_room"
      }
    ]
  },
  lab_1: {
    id: "lab_1",
    title: "Lab 1",
    prompt: [
      "We numbers three, produce twelve thrice",
      "Our sum, you'll find, is not as nice",
      "If you knew our sum in advance",
      "You would still need a second chance",
      "To guess for sure our elements",
      "The last two lines were just the hint",
      "So you should know, by now, my largest member"
    ],
    movements: [
      {
        prompt: "Go back to lab 3",
        to: "lab_3"
      }
    ]
  },
  lab_2: {
    id: "lab_2",
    title: "Lab 2",
    prompt: [
      "You walk up a circular ramp",
      "The radius of the circle is 20/pi meters and you walk 50 meters to end up directly above where you began",
      "How high are you?"
    ],
    movements: [
      {
        prompt: "Go into the hall",
        to: "lab_hall"
      }
    ]
  },
  lab_3: {
    id: "lab_3",
    title: "Lab 3",
    prompt: [
      "Giovani's Room",
      "Player Pano",
      "Canery Row",
      "The Blust Eye",
      "Ulyses",
      "184",
      "Wrinkle in Time",
      "King Lea",
      "Suttre"
    ],
    movements: [
      {
        prompt: "Go into the hall",
        to: "lab_hall"
      },
      {
        prompt: "Enter the next lab",
        to: "lab_1"
      }
    ]
  },
  unlabeled_room: {
    id: "unlabeled_room",
    title: "???",
    prompt: [
      "FER_XIWPCOBOLQ",
      "FER_EDNLDKBSAS",
      "FER_FVKBRTQGEF",
      "FER_MBKHHRVEIQ",
      "FER_ULPDJNBRNY",
      "FER_FHLPCNDNGT",
      "FER_JWKSQDQNNL",
      "IIO_TEIDSKVOFQ"
    ],
    movements: [
      {
        prompt: "Go into the hall",
        to: "lab_hall"
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
  return `<div class="${"w-full flex"}">${each(movements, (movement) => {
    return `<div class="${"w-36 h-20 border-2 border-solid border-neutral-600 rounded mx-2 px-2 py-2 text-sm"}">${escape(movement.prompt)}
		</div>`;
  })}</div>`;
});
export { InteractionType as I, LineBreak as L, TileMovements as T, locationStore as l };
