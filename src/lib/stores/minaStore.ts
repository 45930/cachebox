import type { EscapeGameSnappInterface } from 'src/global';
import { writable } from 'svelte/store';

export const loadSnarky = async function () {
  const snappSourceCode = await import('$lib/snapps/escapeGameSnapp');
  await snappSourceCode.load();
  snarkyStore.set(true)
  const escapeGameSnapp = await snappSourceCode.deploy();
  deployedSnappsStore.set(escapeGameSnapp)
}

export const snarkyStore = writable(false);
export const deployedSnappsStore = writable<EscapeGameSnappInterface>();



