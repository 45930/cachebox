/// <reference types="@sveltejs/kit" />

import type { PublicKey, Signature } from "snarkyjs"
import { InteractionType } from "./lib/enums";
import { PublicKey } from 'snarkyjs';

interface EscapeGameSnappInterface {
  address: PublicKey;
  guessGateKey(key: string): Promise<Signature> | Promise<null>;
  guessUnlabeledPw(key: string): Promise<Signature> | Promise<null>;
  guessLabKey(key: string): Promise<Signature> | Promise<null>;
}

type LocationId = string;

// For now, an interaction is simply clicking on a prompt, and getting a response
// Would be cool to explore other actions
type Interaction = {
  prompt: string;
  short?: string; // used as display option for long prompts
  blockedOn?: string; // string reference to game state boolean
  type: InteractionType;
  response: string;
}

// Move to the next location
type Movement = {
  prompt: string;
  to: LocationId;
}

// TODO - style the page based on the location vibe
type LocationTheme = string;

// The main type in this game is a Tile
// A Tile has interactive elements, through which you navigate the game
export type Tile = {
  id: LocationId;
  title: string;
  from?: LocationId; // could be different prompt depending on where you came from?
  prompt: string[];
  movements: Movement[];
  interactions?: Interaction[];
  items?: Item[];
  snapp?: DeployedSnappInterface;
  theme?: LocationTheme;
}
