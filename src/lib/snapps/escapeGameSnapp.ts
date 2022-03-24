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
  Group,
} from 'snarkyjs';

import type { EscapeGameSnappInterface } from 'src/global';
import { StringCircuitValue } from '../snarkyUtils/String';
import { KeyedMerkleStore } from '../snarkyUtils/KeyedMerkleStore';

await isReady;

let snappPrivkey: PrivateKey;
let snappAddress: PublicKey;
let gateGroup: Group;
let labGroup: Group;

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
    this.gateKeyGroup1 = State();
    this.gateKeyGroup2 = State();
    this.gateKeyCT1 = State();
    this.gateKeyCT2 = State();
    this.labKeyGroup1 = State();
    this.labKeyGroup2 = State();
    this.labKeyCT1 = State();
    this.labKeyCT2 = State();
    // this.merkleRoot = State(); // merkle root of winning players tree
  }

  async deploy(initialBalance: UInt64, gateKey: string, labKey: string) {
    super.deploy();
    this.balance.addInPlace(initialBalance);

    const gateKeyFields = Encoding.Bijective.Fp.fromString(gateKey);
    const gateKeyCT = Encryption.encrypt(gateKeyFields, snappAddress);

    const labKeyFields = Encoding.Bijective.Fp.fromString(labKey);
    const labKeyCT = Encryption.encrypt(labKeyFields, snappAddress);

    console.assert(gateKeyCT.cipherText.length == 2, 'ciphertext not the correct size')
    this.gateKeyGroup1.set(gateKeyCT.publicKey.x);
    this.gateKeyGroup2.set(gateKeyCT.publicKey.y);
    this.gateKeyCT1.set(gateKeyCT.cipherText[0]);
    this.gateKeyCT2.set(gateKeyCT.cipherText[1]);
    this.labKeyGroup1.set(labKeyCT.publicKey.x);
    this.labKeyGroup2.set(labKeyCT.publicKey.y);
    this.labKeyCT1.set(labKeyCT.cipherText[0]);
    this.labKeyCT2.set(labKeyCT.cipherText[1]);
  }

  async guessGateKey(guessedKey: string) {
    const gateKeyGroup1: Field = await this.gateKeyGroup1.get();
    const gateKeyGroup2: Field = await this.gateKeyGroup2.get();
    const gateKeyCT1: Field = await this.gateKeyCT1.get();
    const gateKeyCT2: Field = await this.gateKeyCT2.get();

    Circuit.asProver(() => {
      console.log('1', gateKeyCT1, gateGroup);
    })


    const group = new Group({ x: gateKeyGroup1, y: gateKeyGroup2 });
    const gateKeyDecrypted = Encryption.decrypt({ publicKey: group, cipherText: [gateKeyCT1, gateKeyCT2] }, snappPrivkey);

    Circuit.asProver(() => {
      console.log('2', gateKeyDecrypted);
    })

    const guessedKeyFields = Encoding.Bijective.Fp.fromString(guessedKey);

    Circuit.asProver(() => {
      console.log(`pubk: ${snappAddress.toJSON()}`)
      console.log(`gk: ${guessedKey}`)
      console.log(`gkf: ${guessedKeyFields} , length: ${guessedKeyFields.length}`)
      console.log(`d: ${gateKeyDecrypted}  , length: ${gateKeyDecrypted.length}`)
      console.log(gateKeyDecrypted.toString(), guessedKeyFields.toString())
      console.log(gateKeyDecrypted.toString() == guessedKeyFields.toString())
      console.log(gateKeyDecrypted[0].equals(guessedKeyFields[0]));
    });

    return gateKeyDecrypted[0].equals(guessedKeyFields[0]).toBoolean();
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
state(Field)(EscapeGameSnapp.prototype, 'gateKeyGroup1');
state(Field)(EscapeGameSnapp.prototype, 'gateKeyGroup2');
state(Field)(EscapeGameSnapp.prototype, 'gateKeyCT1');
state(Field)(EscapeGameSnapp.prototype, 'gateKeyCT2');
state(Field)(EscapeGameSnapp.prototype, 'labKeyGroup1');
state(Field)(EscapeGameSnapp.prototype, 'labKeyGroup2');
state(Field)(EscapeGameSnapp.prototype, 'labKeyCT1');
state(Field)(EscapeGameSnapp.prototype, 'labKeyCT2');
// state(Field)(EscapeGameSnapp.prototype, 'merkleRoot');

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
    await snapp.deploy(ONE_MINA, gateKey, labKey);
    console.log(snapp);
  });
  await tx.send().wait();
  await Mina.getAccount(snappAddress);

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
  console.log(`Guessing Key ${key}...`);
  const resp = await snapp.guessGateKey(key);

  // TODO: need a better way to store winners, ideally leverage off-chain storage from another team
  if (resp) {
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

