import { writable } from 'svelte/store';

const isSnarkyLoaded = false;

export const loadSnarky = async function () {
  const snappSourceCode = await import('$lib/snapps/montyHallSnapp');
  await snappSourceCode.load();
  snarkyStore.set(true)
}

export const snarkyStore = writable(isSnarkyLoaded);
