import {
  Field,
  SmartContract,
  state,
  State,
  UInt64,
  isReady,
  PrivateKey,
  Mina,
  Party,
  method,
  PublicKey,
} from 'snarkyjs';

import type { DeployedSnappInterface } from 'src/global';
import { StringCircuitValue } from '../snarkyUtils/String';

class VerySimpleSnapp extends SmartContract {
  constructor(address: PublicKey) {
    super(address);
    this.x = State();
  }

  deploy(initialBalance: UInt64) {
    super.deploy();
    this.balance.addInPlace(initialBalance);
    this.x.set(Field.ofBits(new StringCircuitValue('very simple snapp').toBits()));
  }
}

// manually apply decorators:

// @state(Field) x
state(Field)(VerySimpleSnapp.prototype, 'x');

export async function deploy() {
  await isReady;

  const snappPrivkey = PrivateKey.random();
  const snappAddress = snappPrivkey.toPublicKey();
  const snapp = new VerySimpleSnapp(snappAddress);

  const snappInterface: DeployedSnappInterface = {
    title: 'Very Simple',
    subtitle: 'Theres literally nothing to it',
    getSnappState() {
      return getSnappState(snappAddress);
    },
    address: snappAddress,
  };

  console.log(snapp);

  const tx = Mina.transaction(DEPLOYER_ACCOUNT, async () => {
    console.log('Deploying Monty Hall Snapp...');
    const p = await Party.createSigned(USER_ACCOUNT);
    p.balance.subInPlace(ONE_MINA);
    snapp.deploy(ONE_MINA);
    console.log(snapp);
  });
  await tx.send().wait();

  console.log('Deployed...')
  return snappInterface;
}

export async function getSnappState(snappAddress: PublicKey) {
  const snappState = (await Mina.getAccount(snappAddress)).snapp.appState;
  const ztring = StringCircuitValue.fromBits(snappState[0].toBits()).toString();
  return { ztring };
}

export async function load() {
  await isReady;
}

export { VerySimpleSnapp };

/*
Local MINA blockchain config for the purposes of running dev.

This code is not a replacement for, nor does it interact with the MINA blockchain mainnet.
*/

let Local;
let accounts: PrivateKey[];
let DEPLOYER_ACCOUNT: PrivateKey;
let USER_ACCOUNT: PrivateKey;
let ONE_MINA: UInt64;

isReady.then(() => {
  Local = Mina.LocalBlockchain();
  Mina.setActiveInstance(Local);
  accounts = Local.testAccounts.map(account => account.privateKey);
  DEPLOYER_ACCOUNT = accounts[0];
  USER_ACCOUNT = accounts[1];
  ONE_MINA = UInt64.fromNumber(1000000);
})

