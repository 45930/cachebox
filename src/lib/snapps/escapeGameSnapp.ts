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
  Encoding,
  Encryption,
  Poseidon,
} from 'snarkyjs';

import type { EscapeGameSnappInterface } from 'src/global';
import { StringCircuitValue } from '../snarkyUtils/String';
import { KeyedMerkleStore } from '../snarkyUtils/KeyedMerkleStore';

await isReady;

let snappPrivkey: PrivateKey;
let snappAddress: PublicKey;

let keyedMerkleStore = new KeyedMerkleStore();

const gateKey = '00000';
const labKey = '00000';
// console.log(snappAddress.toJSON())
// console.log(`gate key: ${gateKey}`)
// const gateKeyFields = Encoding.Bijective.Fp.fromString(gateKey);
// console.log(`gate key fields: ${gateKeyFields}`)
// const gateKeyCT = Encryption.encrypt(gateKeyFields, snappAddress);
// console.log(`gate key ct: ${gateKeyCT.cipherText}`)

// const labKeyFields = Encoding.Bijective.Fp.fromString(labKey);
// const labKeyCT = Encryption.encrypt(labKeyFields, snappAddress);

class EscapeGameSnapp extends SmartContract {
  constructor(address: PublicKey) {
    super(address);
    this.gateKey = State();
    this.labKey = State();
    this.merkleRoot = State(); // merkle root of winning players tree
  }

  async deploy(initialBalance: UInt64) {
    super.deploy();

    this.balance.addInPlace(initialBalance);
    this.gateKey.set(Field(0));
    this.labKey.set(Field(0));
    this.merkleRoot.set(keyedMerkleStore.getMerkleRoot());
  }

  async setCodes(gateKey: string, labKey: string) {
    const gateKeyFields = Encoding.Bijective.Fp.fromString(gateKey);
    const gateKeyCT = Encryption.encrypt(gateKeyFields, snappAddress);

    const labKeyFields = Encoding.Bijective.Fp.fromString(labKey);
    const labKeyCT = Encryption.encrypt(labKeyFields, snappAddress);

    const gkState = await this.gateKey.get();
    const lkState = await this.labKey.get();

    // Ensure the true values have not been set
    gkState.assertEquals(Field(0));
    lkState.assertEquals(Field(0));

    this.gateKey.set(Poseidon.hash(gateKeyCT.cipherText));
    this.labKey.set(Poseidon.hash(labKeyCT.cipherText));
  }

  async guessGateKey(guessedKey: string) {
    const gateKeyHash = await this.gateKey.get();

    const guessedKeyFields = Encoding.Bijective.Fp.fromString(guessedKey);
    const guessedKeyCT = Encryption.encrypt(guessedKeyFields, snappAddress);
    const guessedKeyHash = Poseidon.hash(guessedKeyCT.cipherText);

    Circuit.asProver(() => {
      console.log(`pubk: ${snappAddress.toJSON()}`)
      console.log(`gk: ${guessedKey}`)
      console.log(`gkf: ${guessedKeyFields}`)
      console.log(`gkct: ${guessedKeyCT.cipherText}`)
      console.log(`ga: ${gateKeyHash}`)
      console.log(`gu: ${guessedKeyHash}`)
    });

    const isCorrect = Circuit.if(
      gateKeyHash.equals(guessedKeyHash),
      new Bool(true),
      new Bool(false),
    )

    // TODO: add to merkle proof
    return isCorrect;
  }

  async guessLabKey(guessedKey: string) {
    const labKeyHash = await this.labKey.get();

    const guessedKeyFields = Encoding.Bijective.Fp.fromString(guessedKey);
    const guessedKeyCT = Encryption.encrypt(guessedKeyFields, snappAddress);
    const guessedKeyHash = Poseidon.hash(guessedKeyCT.cipherText);

    const isCorrect = Circuit.if(
      labKeyHash.equals(guessedKeyHash),
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
  snappPrivkey = PrivateKey.random();
  snappAddress = snappPrivkey.toPublicKey();
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

  const tx = Mina.transaction(DEPLOYER_ACCOUNT, async () => {
    console.log('Deploying Escape Game Snapp...');
    const p = await Party.createSigned(USER_ACCOUNT);

    // const gateKeyHash = Poseidon.hash(gateKeyCT.cipherText);
    // const labKeyHash = Poseidon.hash(labKeyCT.cipherText);

    // console.log(`gkh: ${gateKeyHash}`)
    p.balance.subInPlace(ONE_MINA);
    await snapp.deploy(ONE_MINA);
    console.log(snapp);
  });
  await tx.send().wait();
  await Mina.getAccount(snappAddress);

  const tx2 = Mina.transaction(DEPLOYER_ACCOUNT, async () => {
    await snapp.setCodes(gateKey, labKey);
  });
  await tx2.send().wait();

  console.log('Deployed...')
  return snappInterface;
}

export async function getSnappState(snappAddress: PublicKey) {
  const snappState = (await Mina.getAccount(snappAddress)).snapp.appState;
  const gateKey = StringCircuitValue.fromField(snappState[0]).toString();
  const labKey = StringCircuitValue.fromField(snappState[1]).toString();
  return { gateKey, labKey };
}

export async function guessGateKey(snappAddress: PublicKey, key: string) {
  const snapp = new EscapeGameSnapp(snappAddress);
  const tx = Mina.transaction(USER_ACCOUNT, async () => {
    console.log(`Guessing Key ${key}...`);
    await snapp.guessGateKey(key);
  });

  let resp;
  try {
    resp = await tx.send().wait();
  } catch (err) {
    console.log(`Transaction Failed! Error: ${err}`);
  }

  console.log(resp);
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
  const tx = Mina.transaction(USER_ACCOUNT, async () => {
    console.log(`Guessing Key ${key}...`);
    await snapp.guessLabKey(key);
  });
  try {
    await tx.send().wait();
  } catch (err) {
    console.log(`Transaction Failed! Error: ${err}`);
  }

  console.log(tx);
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

