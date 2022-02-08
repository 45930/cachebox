
import type { DeployedSnappInterface } from 'src/global';
import { derived, writable } from 'svelte/store';

export const addressMap: Record<string, DeployedSnappInterface> = {}

export const address = writable('');

export const updateAddress = (newAddress) => {
  address.set(newAddress)
}

export const deployedSnappStore = derived([address], ([$address]) => addressMap[$address]);

export const deployedSnappsStore = writable(addressMap);
