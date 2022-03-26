import { InteractionType } from '$lib/enums';
import type { Tile } from 'src/global';
import { readable } from 'svelte/store';

// export type Location = {
//   address: LocationId;
//   title: string;
//   from?: LocationId; // could be different prompt depending on where you came from?
//   prompt: string[];
//   movements: Movement[];
//   interactions?: Interaction[];
//   items?: Item[];
//   snapp?: DeployedSnappInterface;
// }

const locations: Record<string, Tile> = {
  beach_landing: {
    id: "beach_landing",
    title: "Beach",
    prompt: ["You roll onto the beach, coughing saltwater, exhausted.  After resting briefly, you see some rocky cliffs to one side, and beach continuing as far as you can see in the other direction."],
    movements: [
      {
        prompt: "Try to climb up the cliff to get a better view",
        to: "cliff_top"
      },
      {
        prompt: "Explore the beach",
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
        prompt: "Cut inland through the dense jungle",
        to: "jungle_path_1"
      },
      {
        prompt: "Climb down to the beach",
        to: "beach_landing"
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
        prompt: "Follow the footpath",
        to: "jungle_path_2"
      },
      {
        prompt: "Walk the beach away from the cliffs",
        to: "beach_2"
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
        prompt: "Return the way you came",
        to: "beach_1"
      }
    ]
  },
  jungle_path_1: {
    id: "jungle_path_1",
    title: "Jungle Path",
    prompt: ["You reach a 3-way fork.  One direction leads to the cliffs, another leads into a dark cave, the final direction leads to a simple shack in a clearing."],
    movements: [
      {
        prompt: "Enter the cave",
        to: "marcus"
      },
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
        prompt: "Walk the path toward the shack",
        to: "shack"
      },
      {
        prompt: "Head toward the beach",
        to: "beach_1"
      },
      {
        prompt: "Enter the cave",
        to: "merlin"
      }
    ]
  },
  shack: {
    id: "shack",
    title: "Shack",
    prompt: [
      "There is a clearing with a shack, a fire pit, and some fruit trees",
      "No one seems to be around..."
    ],
    movements: [
      {
        prompt: "Enter the shack",
        to: "in_shack"
      },
      {
        prompt: "Follow a footpath toward the cliffs",
        to: "jungle_path_1"
      },
      {
        prompt: "Go further into the clearing",
        to: "clearing"
      },
      {
        prompt: "Follow a footpath toward the beach",
        to: "jungle_path_2"
      }
    ]
  },
  in_shack: {
    id: "in_shack",
    title: "In Shack",
    prompt: [
    ],
    movements: [
      {
        prompt: "Exit the shack",
        to: "shack"
      }
    ],
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
        prompt: "Is it possible to leave the island?",
        response: "No."
      },
      {
        type: InteractionType.Dialogue,
        prompt: "Do you know what code I should enter to activate the keypad?",
        short: "What is the code?",
        blockedOn: "hasVisitedClearing",
        response: "94773 ought to get you in."
      },
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
        to: "jungle_path_1"
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
      },
    ]
  },
  clearing: {
    id: "clearing",
    title: "Clearing",
    prompt: [
      "You enter a clearing adjacent to the shack and see a keypad sticking out of the brush."
    ],
    movements: [
      {
        prompt: "Go to the shack",
        to: "shack"
      }
    ]
  },
  lab_hall: {
    id: 'lab_hall',
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
    id: 'lab_1',
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
    id: 'lab_2',
    title: "Lab 2",
    prompt: [
    ],
    movements: [
      {
        prompt: "Go into the hall",
        to: "lab_hall"
      }
    ]
  },
  lab_3: {
    id: 'lab_3',
    title: "Lab 3",
    prompt: [
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
    id: 'unlabeled_room',
    title: '???',
    prompt: [
      'ugi_akrrmgmriu',
      'ugi_ifinncmvyw',
      'ugi_jxfdalahpq',
      'ugi_qdfjrjfhfu',
      'ugi_ynkftfmukb',
      'ugi_jjgrmfoqdx',
      'ugi_nyfu_waqkp',
      'xkf_xgdfbcfrcu'
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
  },
}

export const locationStore = readable(locations);
