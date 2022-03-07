import type { PublicKey } from 'snarkyjs';
import type { DeployedSnappInterface } from 'src/global';
import { writable } from 'svelte/store';

type SnappConfig = {
  interface: DeployedSnappInterface,
  address: PublicKey
}

const snapps: Record<string, SnappConfig> = {};

export const deployedSnappsStore = writable(snapps);
