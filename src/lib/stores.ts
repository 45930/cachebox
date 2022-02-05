import { readable } from 'svelte/store';
import type { DeployedSnappInterface } from 'src/global';
import { deploy as deployMontyHall } from './snapps/montyHallSnapp';


const montyHallSnapp = await deployMontyHall();

const initialData: DeployedSnappInterface[] = [montyHallSnapp]

export const snappConfigsStore = readable(initialData);
