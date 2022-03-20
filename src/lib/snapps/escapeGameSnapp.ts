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
  PublicKey,
  Circuit,
  Bool,
  method,
} from 'snarkyjs';

import type { EscapeGameSnappInterface } from 'src/global';
import { StringCircuitValue } from '../snarkyUtils/String';
import { KeyedMerkleStore } from '../snarkyUtils/KeyedMerkleStore';


let keyedMerkleStore = new KeyedMerkleStore();

class EscapeGameSnapp extends SmartContract {
  constructor(address: PublicKey) {
    super(address);
    this.gateKey = State();
    this.labKey = State();
    this.merkleRoot = State(); // merkle root of winning players tree
  }

  deploy(initialBalance: UInt64, gateKey: StringCircuitValue, labKey: StringCircuitValue) {
    super.deploy();
    this.balance.addInPlace(initialBalance);
    this.gateKey.set(gateKey.toField());
    this.labKey.set(labKey.toField());
    this.merkleRoot.set(keyedMerkleStore.getMerkleRoot());
  }

  async guessGateKey(key: StringCircuitValue) {
    const gateKeyHash = await this.gateKey.get();
    const isCorrect = Circuit.if(
      gateKeyHash.equals(key.hash()),
      new Bool(true),
      new Bool(false),
    )

    // TODO: add to merkle proof
    return isCorrect;
  }

  async guessLabKey(key: StringCircuitValue) {
    const gateKeyHash = await this.labKey.get();
    const isCorrect = Circuit.if(
      gateKeyHash.equals(key.hash()),
      new Bool(true),
      new Bool(false),
    )

    // TODO: add to merkle proof
    return isCorrect;
  }
}

// manually apply decorators:

// @state(Field) gateKey
state(Field)(EscapeGameSnapp.prototype, 'gateKey');
state(Field)(EscapeGameSnapp.prototype, 'labKey');
state(Field)(EscapeGameSnapp.prototype, 'merkleRoot');

// @method
Reflect.metadata('design:paramtypes', [String])(EscapeGameSnapp.prototype, 'guessGateKey');
method(EscapeGameSnapp.prototype, 'guessGateKey');

Reflect.metadata('design:paramtypes', [String])(EscapeGameSnapp.prototype, 'guessLabKey');
method(EscapeGameSnapp.prototype, 'guessLabKey');

export async function deploy() {
  const snappPrivkey = PrivateKey.random();
  const snappAddress = snappPrivkey.toPublicKey();
  const snapp = new EscapeGameSnapp(snappAddress);

  const snappInterface: EscapeGameSnappInterface = {
    title: 'Escape Game Snapp',
    guessGateKey(phrase: string) {
      return guessGateKey(snappAddress, phrase);
    },
    guessLabKey(phrase: string) {
      return guessLabKey(snappAddress, phrase);
    },
    getSnappState() {
      return getSnappState(snappAddress);
    },
    address: snappAddress,
  };

  console.log(snapp);

  const tx = Mina.transaction(DEPLOYER_ACCOUNT, async () => {
    console.log('Deploying Escape Game Snapp...');
    const p = await Party.createSigned(USER_ACCOUNT);
    const gateKey = new StringCircuitValue('00000');
    const labKey = new StringCircuitValue('00000');
    p.balance.subInPlace(ONE_MINA);
    snapp.deploy(ONE_MINA, gateKey, labKey);
    console.log(snapp);
  });
  await tx.send().wait();
  await Mina.getAccount(snappAddress);
  console.log(snappAddress);
  console.log(Local);

  console.log('Deployed...')
  return snappInterface;
}

export async function getSnappState(snappAddress: PublicKey) {
  console.log(snappAddress)
  console.log(Local)
  const snappState = (await Mina.getAccount(snappAddress)).snapp.appState;
  const gateKey = StringCircuitValue.fromField(snappState[0]).toString();
  const labKey = StringCircuitValue.fromField(snappState[1]).toString();
  return { gateKey, labKey };
}

export async function guessGateKey(snappAddress: PublicKey, key: string) {
  const snapp = new EscapeGameSnapp(snappAddress);
  const guess = new StringCircuitValue(key);
  const tx = Mina.transaction(USER_ACCOUNT, async () => {
    console.log(`Guessing Key ${key}...`);
    await snapp.guessGateKey(guess);
  });
  try {
    await tx.send().wait();
  } catch (err) {
    console.log(`Transaction Failed! Error: ${err}`);
  }

  // TODO: need a better way to store winners, ideally leverage off-chain storage from another team
  const trueKey = (await getSnappState(snappAddress)).gateKey;
  console.log(`True Key: ${trueKey}`)
  if (key == trueKey.replace(/\0/g, '')) {
    return 'winner'
  } else {
    return 'loser'
  }
}

export async function guessLabKey(snappAddress: PublicKey, key: string) {
  const snapp = new EscapeGameSnapp(snappAddress);
  const guess = new StringCircuitValue(key);
  const tx = Mina.transaction(USER_ACCOUNT, async () => {
    console.log(`Guessing Key ${key}...`);
    await snapp.guessLabKey(guess);
  });
  try {
    await tx.send().wait();
  } catch (err) {
    console.log(`Transaction Failed! Error: ${err}`);
  }

  // TODO: need a better way to store winners, ideally leverage off-chain storage from another team
  const trueKey = (await getSnappState(snappAddress)).labKey;
  console.log(`True Key: ${trueKey}`)
  if (key == trueKey.replace(/\0/g, '')) {
    return 'winner'
  } else {
    return 'loser'
  }
}

export async function load() {
  await isReady;
}

export { EscapeGameSnapp };

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

