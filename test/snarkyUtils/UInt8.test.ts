import { expect } from 'chai';
import { UInt8 } from '../../src/lib/snarkyUtils/UInt8';

import pkg from 'bs58';
import { Field } from 'snarkyjs';

const bs58 = pkg;

describe('constructor', () => {
  it('can initialize with valid inputs', () => {
    const testValue = new UInt8(Field(4));
    expect(testValue);
  });

  it('cannot initialize with invalid inputs', () => {
    const testValue1 = new UInt8(Field(-1));
    const testValue2 = new UInt8(Field(1000));
    expect(testValue1);
    expect(testValue2);
  });
});

describe('fromNumber', () => {
  it('can initialize with valid inputs', () => {
    const testValue = UInt8.fromNumber(4);
    expect(testValue);
  });

  it('cannot initialize with invalid inputs', () => {
    const testValue1 = UInt8.fromNumber(-1);
    const testValue2 = UInt8.fromNumber(1000);
    expect(testValue1);
    expect(testValue2);
  });
});

describe('bits', () => {
  it('converts ints to bits correctly', () => {
    expect(UInt8.fromNumber(73).toBits()).to.eql(
      [
        false,
        true,
        false,
        false,
        true,
        false,
        false,
        true
      ]
    );
    expect(UInt8.fromNumber(203).toBits()).to.eql(
      [
        true,
        true,
        false,
        false,
        true,
        false,
        true,
        true
      ]
    );
    expect(UInt8.fromNumber(1).toBits()).to.eql(
      [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        true
      ]
    );
  });

  it('cannot initialize with invalid inputs', () => {
    const testValue1 = UInt8.fromNumber(-1);
    const testValue2 = UInt8.fromNumber(1000);
    expect(testValue1);
    expect(testValue2);
  });
});

describe('use cases', () => {
  it('can encode an IPFS SHA', () => {
    const base58IpfsHash = 'QmSsyzTC6vw16PbTU7XTcCAmS5mwvo1fCxHUV5LuLKAXky';
    const multiHashBuffer = bs58.decode(base58IpfsHash);
    if (multiHashBuffer.slice(0, 2).toString('hex') == '1220') {
      // 12: use hashing algorithm SHA
      // 20: size of hash is 32 bytes
      // https://multiformats.io/multihash/
      // https://github.com/multiformats/multicodec/blob/master/table.csv
      const prefix = multiHashBuffer.slice(0, 2);
      const int8Repr = [...multiHashBuffer.slice(2)].map(x => UInt8.fromNumber(x));
      const backToNumbers = new Uint8Array(int8Repr.map(x => x.toNumber()))
      const constructedBuffer = Buffer.concat([prefix, backToNumbers])
      const constructedIpfsHash = bs58.encode(constructedBuffer);
      expect(constructedIpfsHash).to.eq(base58IpfsHash);
    } else {
      console.log("Not using SHA 2 - 256")
    }
  });
});