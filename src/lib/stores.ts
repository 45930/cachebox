import { readable } from 'svelte/store';
import type { DeployedSnappInterface } from 'src/global';

const initialData: DeployedSnappInterface[] = [
  {
    title: 'Snapp 1',
    address: '1234567890',
    subtitle: 'Can you solve this one?',
    reward: 10
  },
  {
    title: 'Snapp 2',
    address: '1234567892',
    subtitle: 'Can you solve this one?',
  },
  {
    title: 'Snapp 3',
    address: '1234567893',
    subtitle: 'Can you solve this one?',
  },
  {
    title: 'Snapp 4',
    address: '1234567894',
    subtitle: 'Can you solve this one?',
  },
  {
    title: 'Snapp 5',
    address: '1234567895',
    subtitle: 'Can you solve this one?',
  },
  {
    title: 'Snapp 6',
    address: '1234567896',
    subtitle: 'Can you solve this one?',
  },
]

export const snappConfigsStore = readable(initialData)