import {
  Field,
  SmartContract,
  method,
  Bool,
  state,
  State,
  UInt64,
  isReady,
  PrivateKey,
  Mina,
  Party,
  PublicKey,
  Poseidon,
  Circuit,
} from 'snarkyjs';

import type { MontyHallSnappInterface } from 'src/global';

function randomDoor(): Field {
  let winningDoorField: Field;

  const [_, remainder] = new UInt64(Field.random()).divMod(3);
  Circuit.if(
    remainder.equals(UInt64.zero),
    winningDoorField = Field(1),
    Circuit.if(
      remainder.equals(UInt64.fromNumber(1)),
      winningDoorField = Field(2),
      winningDoorField = Field(3)
    )
  )

  return winningDoorField;
}

class MontyHallSnapp extends SmartContract {
  clearWinningDoor: Field = Field(0);
  hashingKey: Field = Field(0);
  revealedDoor: Field = Field(0);

  constructor(address: PublicKey) {
    super(address);

    this.winningDoor = State();
    this.guessedDoor = State();
    this.gameStep = State();
  }

  deploy(initialBalance: UInt64) {
    super.deploy();
    this.balance.addInPlace(initialBalance);

    // Random field to hide the winning door stat
    const hashingKey = Field.random();

    // Pick winning door at random
    const winningDoorField = randomDoor();
    console.log(winningDoorField.toString())

    // Door is a number 1, 2, or 3
    winningDoorField.assertGt(0);
    winningDoorField.assertLt(4);

    // Winning door is secret
    // guessed door is set to 0 until a guess is made
    // game step is set to 0 until a guess is made
    // revealed door set to 0 until a door gets revealed
    // this.winningDoor.set(Poseidon.hash([hashingKey, winningDoorField]));
    this.winningDoor.set(Field(0));
    this.guessedDoor.set(Field(0));
    this.gameStep.set(Field(0));

    this.hashingKey = hashingKey;
    this.clearWinningDoor = winningDoorField;
  }

  async guessDoor(
    n: number
  ): Promise<string> {
    const guessedDoorField = Field(n);
    guessedDoorField.assertGt(0);
    guessedDoorField.assertLt(4);

    await this.guessedDoor.set(guessedDoorField);

    const randomBits = Field.random().toBits();

    Circuit.if(
      guessedDoorField.equals(this.clearWinningDoor),
      Circuit.if(
        guessedDoorField.equals(Field(1)),
        Circuit.if(
          randomBits.at[0].equals(0),
          this.revealedDoor = Field(2),
          this.revealedDoor = Field(3)
        ),
        Circuit.if(
          guessedDoorField.equals(Field(2)),
          Circuit.if(
            randomBits.at[0].equals(0),
            this.revealedDoor = Field(1),
            this.revealedDoor = Field(3)
          ),
          // else, the winning door is 3
          Circuit.if(
            randomBits.at[0].equals(0),
            this.revealedDoor = Field(1),
            this.revealedDoor = Field(2)
          ),
        )
      ),
      Circuit.if(
        guessedDoorField.equals(Field(1)),
        Circuit.if(
          this.clearWinningDoor.equals(Field(2)),
          this.revealedDoor = Field(3),
          this.revealedDoor = Field(2)
        ),
        Circuit.if(
          guessedDoorField.equals(Field(2)),
          Circuit.if(
            this.clearWinningDoor.equals(Field(1)),
            this.revealedDoor = Field(3),
            this.revealedDoor = Field(1)
          ),
          // else, the guessed door is 3
          Circuit.if(
            this.clearWinningDoor.equals(Field(1)),
            this.revealedDoor = Field(2),
            this.revealedDoor = Field(1)
          )
        )
      )
    )

    await this.gameStep.set(Field(1));
    return this.revealedDoor.toString();
  }

  async evaluate(isSwitching: boolean) {
    const isSwitchingBool = Bool(isSwitching);
    const guessedDoor = await this.guessedDoor.get();

    let winner = Bool(false);

    Circuit.if(
      isSwitchingBool,
      Circuit.if(
        guessedDoor.equals(this.clearWinningDoor),
        winner = Bool(true),
        winner = Bool(false)
      ),
      Circuit.if(
        guessedDoor.equals(this.clearWinningDoor),
        winner = Bool(false),
        winner = Bool(true)
      )
    )

    Circuit.if(
      winner,
      console.log("Way to go champ!"),
      console.log("Better luck next time sport!")
    )

    await this.reset();
  }

  async reset() {
    const newDoor = randomDoor();

    await this.winningDoor.set(Poseidon.hash([this.hashingKey, newDoor]));
    await this.guessedDoor.set(Field(0))
    await this.gameStep.set(Field(0))
    this.revealedDoor = Field(0);
  }
}

// manually apply decorators:

// @state
state(Field)(MontyHallSnapp.prototype, 'winningDoor');
state(Field)(MontyHallSnapp.prototype, 'guessedDoor');
state(Field)(MontyHallSnapp.prototype, 'gameStep');

// @method
Reflect.metadata('design:paramtypes', [Number])(MontyHallSnapp.prototype, 'guessDoor');
method(MontyHallSnapp.prototype, 'guessDoor');

Reflect.metadata('design:paramtypes', [Boolean])(MontyHallSnapp.prototype, 'evaluate');
method(MontyHallSnapp.prototype, 'evaluate');

method(MontyHallSnapp.prototype, 'reset');

export { MontyHallSnapp };

export async function deploy() {
  await isReady;

  const snappPrivkey = PrivateKey.random();
  const snappAddress = snappPrivkey.toPublicKey();
  const snapp = new MontyHallSnapp(snappAddress);

  const snappInterface: MontyHallSnappInterface = {
    title: 'Monty Hall',
    subtitle: 'Try your luck with this classic Game Show',
    guessDoor(door: number): Promise<string> {
      return guessDoor(snappAddress, door);
    },
    evaluate(isSwitching: boolean) {
      return evaluate(snappAddress, isSwitching);
    },
    reset() {
      return reset(snappAddress);
    },
    getSnappState() {
      return getSnappState(snappAddress);
    },
    address: snappAddress,
  };

  console.log(snapp);

  const tx = Mina.transaction(DEPLOYER_ACCOUNT, async () => {
    console.log('Deploying Mony Hall Snapp...');
    const p = await Party.createSigned(USER_ACCOUNT);
    p.balance.subInPlace(ONE_MINA);
    snapp.deploy(ONE_MINA);
  });
  await tx.send().wait();

  console.log('Deployed...')
  return snappInterface;
}

export async function guessDoor(snappAddress: PublicKey, door: number): Promise<string> {
  if (!(door === 1 || door === 2 || door === 3)) {
    console.log(`Door guess ${door} is out of bounds of {1, 2, 3}`)
    return
  }

  await isReady;

  let revealedDoor = ''
  const snapp = new MontyHallSnapp(snappAddress);
  const tx = Mina.transaction(USER_ACCOUNT, async () => {
    console.log(`Guessing Door ${door}...`);
    revealedDoor = await snapp.guessDoor(door);
  });
  try {
    await tx.send().wait();
  } catch (err) {
    console.log(`Transaction Failed! Error: ${err}`);
  }

  return revealedDoor;
}

export async function evaluate(snappAddress: PublicKey, isSwitching: boolean) {
  await isReady;

  const snapp = new MontyHallSnapp(snappAddress);
  const tx = Mina.transaction(USER_ACCOUNT, async () => {
    console.log(`Evaluating Game with isSwitcing = ${isSwitching}`);
    await snapp.evaluate(isSwitching);
  });
  try {
    await tx.send().wait();
  } catch (err) {
    console.log(`Transaction Failed! Error: ${err}`);
  }
}

export async function reset(snappAddress: PublicKey) {
  await isReady;

  const snapp = new MontyHallSnapp(snappAddress);
  const tx = Mina.transaction(USER_ACCOUNT, async () => {
    console.log('Resetting Snapp');
    await snapp.reset();
  });
  try {
    await tx.send().wait();
  } catch (err) {
    console.log(`Transaction Failed! Error: ${err}`);
  }
}

export async function getSnappState(snappAddress: PublicKey) {
  await isReady;

  const snappState = (await Mina.getAccount(snappAddress)).snapp.appState;
  const guessedDoor = snappState[1];
  const gameStep = snappState[2];
  return { guessedDoor, gameStep };
}

export async function load() {
  await isReady;
}


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

