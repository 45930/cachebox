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

await isReady;

function randomDoor(): Field {
  const randomUint = new UInt64(Field.random())
  const [_, remainder] = randomUint.divMod(3);
  const winningDoorField = Circuit.if(
    remainder.equals(UInt64.zero),
    Field(1),
    Circuit.if(
      remainder.equals(UInt64.fromNumber(1)),
      Field(2),
      Field(3)
    )
  )

  return winningDoorField;
}

class MontyHallSnapp extends SmartContract {
  revealedDoor: Number;
  isWinner: Boolean;

  constructor(address: PublicKey) {
    super(address);

    this.winningDoor = State();
    this.guessedDoor = State();
    this.revealedDoor = 0;
    this.isWinner = false;
  }

  deploy(initialBalance: UInt64) {
    super.deploy();
    this.balance.addInPlace(initialBalance);

    // Random field to hide the winning door stat
    const hashingKey = Field.random();

    // Pick winning door at random
    const winningDoorField = randomDoor();

    // Door is a number 1, 2, or 3
    winningDoorField.assertGt(Field.zero);
    winningDoorField.assertLt(Field(4));

    // Winning door is secret
    // guessed door is set to 0 until a guess is made
    // game step is set to 0 until a guess is made
    // revealed door set to 0 until a door gets revealed
    this.winningDoor.set(winningDoorField);
    this.guessedDoor.set(Field(0));
  }

  async guessDoor(
    n: number
  ): Promise<void> {
    const guessedDoorField = Field(n);
    guessedDoorField.assertGt(Field.zero);
    guessedDoorField.assertLt(Field(4));

    const winningDoor = await this.winningDoor.get();

    const randomBits = Field.random().toBits();

    await this.guessedDoor.set(guessedDoorField);

    const revealedDoor = Circuit.if(
      winningDoor.equals(guessedDoorField), Circuit.if(
        guessedDoorField.equals(Field(1)),
        Circuit.if(
          randomBits.at(0).equals(Bool(false)),
          Field(2),
          Field(3)
        ),
        Circuit.if(
          guessedDoorField.equals(Field(2)),
          Circuit.if(
            randomBits.at(0).equals(Bool(false)),
            Field(1),
            Field(3)
          ),
          // else, the winning door is 3
          Circuit.if(
            randomBits.at(0).equals(Bool(false)),
            Field(1),
            Field(2)
          ),
        )
      ),
      Circuit.if(
        guessedDoorField.equals(Field(1)),
        Circuit.if(
          winningDoor.equals(Field(2)),
          Field(3),
          Field(2)
        ),
        Circuit.if(
          guessedDoorField.equals(Field(2)),
          Circuit.if(
            winningDoor.equals(Field(1)),
            Field(3),
            Field(1)
          ),
          // else, the guessed door is 3
          Circuit.if(
            winningDoor.equals(Field(1)),
            Field(2),
            Field(1)
          )
        )
      )
    )
    Circuit.asProver(() => {
      console.log(`Revealed: ${revealedDoor}`);
      this.revealedDoor = Number(revealedDoor.toString());
    })
  }

  async evaluate(isSwitching: boolean) {
    const isSwitchingBool = Bool(isSwitching);
    const winningDoor = await this.winningDoor.get();
    const guessedDoor = await this.guessedDoor.get();

    const winner = Circuit.if(
      isSwitchingBool,
      Circuit.if(
        guessedDoor.equals(winningDoor),
        Bool(false),
        Bool(true)
      ),
      Circuit.if(
        guessedDoor.equals(winningDoor),
        Bool(true),
        Bool(false)
      )
    )

    Circuit.asProver(() => {
      console.log(`Are you a winner?: ${winner.toBoolean()}`);
      this.isWinner = winner.toBoolean();
    })
  }

  async reset() {
    console.log('Resetting Door');
    const newDoor = randomDoor();
    console.log(`Random door: ${newDoor}`)

    await this.winningDoor.set(newDoor);
    await this.guessedDoor.set(Field(0))
  }
}

// manually apply decorators:

// @state
state(Field)(MontyHallSnapp.prototype, 'winningDoor');
state(Field)(MontyHallSnapp.prototype, 'guessedDoor');

// @method
Reflect.metadata('design:paramtypes', [Number])(MontyHallSnapp.prototype, 'guessDoor');
method(MontyHallSnapp.prototype, 'guessDoor');

Reflect.metadata('design:paramtypes', [Boolean])(MontyHallSnapp.prototype, 'evaluate');
method(MontyHallSnapp.prototype, 'evaluate');

method(MontyHallSnapp.prototype, 'reset');

export { MontyHallSnapp };

export async function deploy() {
  const snappPrivkey = PrivateKey.random();
  const snappAddress = snappPrivkey.toPublicKey();
  const snapp = new MontyHallSnapp(snappAddress);

  const snappInterface: MontyHallSnappInterface = {
    title: 'Monty Hall',
    subtitle: 'Try your luck with this classic Game Show',
    guessDoor(door: number): Promise<string> {
      return guessDoor(snappAddress, door);
    },
    evaluate(isSwitching: boolean): Promise<string> {
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
    throw new Error(`${door} is out of range {1, 2, 3}`)
  }

  const snapp = new MontyHallSnapp(snappAddress);
  const tx = Mina.transaction(USER_ACCOUNT, async () => {
    console.log(`Guessing Door ${door}...`);
    await snapp.guessDoor(door);
  });
  try {
    await tx.send().wait();
  } catch (err) {
    console.log(`Transaction Failed! Error: ${err}`);
  }

  return `Revealed Door: ${snapp.revealedDoor}`;
}

export async function evaluate(snappAddress: PublicKey, isSwitching: boolean): Promise<string> {
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

  return snapp.isWinner ? 'You win!' : 'Sorry, you lost.'
}

export async function reset(snappAddress: PublicKey) {


  const snapp = new MontyHallSnapp(snappAddress);
  const tx = Mina.transaction(USER_ACCOUNT, async () => {
    console.log('Resetting Snapp');
    await snapp.reset();
  });
  await tx.send().wait();
  // try {
  // } catch (err) {
  //   console.log(`Transaction Failed! Error: ${err}`);
  // }
}

export async function getSnappState(snappAddress: PublicKey) {
  const snappState = (await Mina.getAccount(snappAddress)).snapp.appState;
  const winningDoor = snappState[0].toString();
  const guessedDoor = snappState[1].toString();
  return { winningDoor, guessedDoor };
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

