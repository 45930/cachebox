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

import type { SecretPhraseSnappInterface } from 'src/global';
import { StringCircuitValue } from '../snarkyUtils/String';

class SecretPhraseSnapp extends SmartContract {
  constructor(address: PublicKey) {
    super(address);
    this.secretPhrase = State();
  }

  deploy(initialBalance: UInt64, secretPhrase: StringCircuitValue) {
    super.deploy();
    this.balance.addInPlace(initialBalance);
    console.log(secretPhrase);
    this.secretPhrase.set(secretPhrase.hash());
  }

  async guessPhrase(phrase: StringCircuitValue) {
    const secretPhraseHash = await this.secretPhrase.get();
    const isCorrect = Circuit.if(
      secretPhraseHash.equals(phrase.hash()),
      new Bool(true),
      new Bool(false),
    )

    return isCorrect;
  }
}

// manually apply decorators:

// @state(Field) secretPhrase
state(Field)(SecretPhraseSnapp.prototype, 'secretPhrase');

// @method
Reflect.metadata('design:paramtypes', [String])(SecretPhraseSnapp.prototype, 'guessPhrase');
method(SecretPhraseSnapp.prototype, 'guessPhrase');

export async function deploy() {
  const snappPrivkey = PrivateKey.random();
  const snappAddress = snappPrivkey.toPublicKey();
  const snapp = new SecretPhraseSnapp(snappAddress);

  const snappInterface: SecretPhraseSnappInterface = {
    title: 'Secret Phrase Snapp',
    guessPhrase(phrase: string) {
      return guessPhrase(snappAddress, phrase);
    },
    getSnappState() {
      return getSnappState(snappAddress);
    },
    address: snappAddress,
  };

  console.log(snapp);

  const tx = Mina.transaction(DEPLOYER_ACCOUNT, async () => {
    console.log('Deploying Secret Phrase Snapp...');
    const p = await Party.createSigned(USER_ACCOUNT);
    const secret = new StringCircuitValue('mina is cool');
    console.assert(ONE_MINA.assertEquals(UInt64.fromNumber(1000000)));
    p.balance.subInPlace(ONE_MINA);
    snapp.deploy(ONE_MINA, secret);
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
  const secretPhraseHash = snappState[0].toString();
  return { secretPhraseHash };
}

export async function guessPhrase(snappAddress: PublicKey, phrase: string) {
  const snapp = new SecretPhraseSnapp(snappAddress);
  const guess = new StringCircuitValue(phrase);
  const tx = Mina.transaction(USER_ACCOUNT, async () => {
    console.log(`Guessing Phrase ${phrase}...`);
    await snapp.guessPhrase(guess);
  });
  try {
    await tx.send().wait();
  } catch (err) {
    console.log(`Transaction Failed! Error: ${err}`);
  }

  // TODO: need a better way to store winners, ideally leverage off-chain storage from another team
  const trueHash = (await getSnappState(snappAddress)).secretPhraseHash;
  if (guess.hash().toString() == trueHash) {
    return 'winner'
  } else {
    return 'loser'
  }
}

export async function load() {
  await isReady;
}

export { SecretPhraseSnapp };

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

