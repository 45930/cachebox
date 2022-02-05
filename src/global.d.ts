/// <reference types="@sveltejs/kit" />

import type { Field, PublicKey } from "snarkyjs"
import { PublicKey } from 'snarkyjs';

export type DeployedSnappInterface = {
  title: string,
  address: PublicKey,
  subtitle?: string,
  reward?: number,
  ipfsPromptHash?: string,
  ipfsSolvedHash?: string
}

interface MontyHallSnappInterface extends DeployedSnappInterface {
  guessDoor(door: number): Promise<string>;
  evaluate(isSwitching: boolean): Promise<void>;
  reset(newDoor: number): Promise<void>;
  getSnappState(): Promise<{
    guessedDoor: Field;
    gameStep: Field;
  }>;
}
