import { expect } from 'chai';
import { StringCircuitValue } from '../../src/lib/snarkyUtils/String';

import pkg from 'bs58';
import { Field, Circuit } from 'snarkyjs';
import { UInt8 } from '../../src/lib/snarkyUtils/UInt8';

const bs58 = pkg;

describe('constructor', () => {
  it('initializes an instance', () => {
    const ztring = new StringCircuitValue('Some string');
    expect(ztring);
  });

  it('throws an error if a string is too long to store', () => {
    expect(() => {
      let x = new StringCircuitValue('Some string that is too looooooooooooong');
    }).to.throw(Error, /string cannot exceed character limit/);
  });
});

describe('toString', () => {
  it('returns the same string that initializes it', () => {
    const input = 'Input String'
    const ztring = new StringCircuitValue(input);
    expect(ztring.toString()).to.eq(input);
  });
});

describe('fromField', () => {
  it('can serialize and deserialize from Field', () => {
    const input = 'Input String 123'
    const ztring = new StringCircuitValue(input);
    const stringValue = StringCircuitValue.fromField(ztring.toField());
    expect(stringValue.toString().replace(/\0/g, '')).to.eq(input);
  });
});

describe('bits', () => {
  it('can serialize and deserialize from Field', () => {
    const input = 'Input String 123'
    const ztring = new StringCircuitValue(input);
    const field = Field.ofBits(ztring.toBits());
    expect(StringCircuitValue.fromBits(ztring.toBits()).toString()).to.eq(input);
    expect(StringCircuitValue.fromBits(field.toBits()).toString().replace(/\0/g, '')).to.eq(input);
  });
});
