import { branch, CircuitValue, Encryption, PrivateKey, proofSystem, ProofWithInput, PublicKey, Group, Field, Encoding } from 'snarkyjs';
import { prop } from 'snarkyjs';
import { Bool } from 'snarkyjs';

class SolvedPuzzle extends CircuitValue {
  // bits: Bool[] stores the solve state of each puzzle
  constructor(bits: Bool[] = [Bool(false), Bool(false), Bool(false)]) {
    super();
    this.bits = bits;
  }
}

export class KeyProof extends ProofWithInput<SolvedPuzzle> {
  static isValid(key: string, user: PublicKey, keyIndex: number, decryptionPrivateKey: PrivateKey, decryptionPublicKey: Group, cipherText: Field[]): KeyProof {
    const plainText = Encryption.decrypt({ publicKey: decryptionPublicKey, cipherText: cipherText }, decryptionPrivateKey);
    const keyAsFields = Encoding.Bijective.Fp.fromString(key);

    Field(plainText.length).assertEquals(Field(keyAsFields.length))
    plainText.forEach((field, i) => field.assertEquals(keyAsFields[i]));

    //todo - how to limit input to only the correct puzzle index?
    const proofBits = [Bool(false), Bool(false), Bool(false)];
    proofBits[keyIndex] = Bool(true);

    // todo - not using user at all.  Proof could apply to anyone?
    return new KeyProof(new SolvedPuzzle(proofBits));
  }

  static mergeProof(p1: KeyProof, p2: KeyProof): KeyProof {
    let bitsOr: Bool[] = p1.publicInput.bits.map((bit, i) => bit.or(p2.publicInput.bits[i]));
    return new KeyProof(new SolvedPuzzle(bitsOr));
  }
}

// @prop
prop(SolvedPuzzle.prototype, 'bits');

// @proofSystem
proofSystem(KeyProof);


// @branch
branch(KeyProof, 'mergeProof')
branch(KeyProof, 'isValid')
