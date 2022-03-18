/// <reference types="@sveltejs/kit" />

import type { Field, PublicKey } from "snarkyjs"
import { InteractionType } from "./lib/enums";
import { PublicKey } from 'snarkyjs';

export type DeployedSnappInterface = {
  title: string,
  address: PublicKey,
  getSnappState(): Promise<any>,
  subtitle?: string,
  reward?: number,
  ipfsPromptHash?: string,
  ipfsSolvedHash?: string
}

interface MontyHallSnappInterface extends DeployedSnappInterface {
  guessDoor(door: number): Promise<string>;
  evaluate(isSwitching: boolean): Promise<string>;
  reset(newDoor: number): Promise<void>;
  getSnappState(): Promise<{
    winningDoor: string;
    guessedDoor: sting;
  }>;
}

interface SecretPhraseSnappInterface extends DeployedSnappInterface {
  guessPhrase(phrase: string): Promise<string>;
  getSnappState(): Promise<{
    secretPhraseHash: string;
  }>;
}

interface EscapeGameSnappInterface extends DeployedSnappInterface {
  guessGateKey(key: string): Promise<string>;
  guessLabKey(key: string): Promise<string>;
  getSnappState(): Promise<{
    gateKey: string;
  }>;
}

type LocationId = string;

// For now, an interaction is simply clicking on a prompt, and getting a response
// Would be cool to explore other actions
type Interaction = {
  prompt: string;
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
