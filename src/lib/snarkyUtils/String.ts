import { Bool, CircuitValue, Field, Poseidon } from "snarkyjs";

import { UInt8 } from './UInt8'

const MAX_CHARS = 2 ** 5; // Field size: 2 ** 8, UInt8 size: 2 ** 3, Max UInt8s supported: 2 ** (8 - 3)

export class StringCircuitValue extends CircuitValue {
  value: UInt8[];

  constructor(value: string) {
    super();
    if (value.length > MAX_CHARS) {
      throw new Error("string cannot exceed character limit");
    }
    const intArray = value.split('').map(x => UInt8.fromNumber(x.charCodeAt(0)))
    this.value = intArray;
  }

  repr(): number[] {
    return this.value.map(x => x.toNumber())
  }

  toString(): string {
    return this.value.map((x) => String.fromCharCode(Number(x.toString()))).join('')
  }

  toBits(): boolean[] {
    const bits = []
    this.value.forEach((uint) => {
      uint.toBits().forEach(bit => bits.push(bit));
    });

    // let j = 0;
    // for (let i = 0; i < 32; i++) {
    //   if (j < this.value.length) {
    //     const uint = this.value[j];
    //     console.log(uint)
    //     uint.toBits().forEach(bit => bits.push(bit));
    //     j++;
    //   } else {
    //     console.log(0)
    //     UInt8.zero.toBits().forEach(bit => bits.push(bit));
    //   }
    // }
    return bits
  }

  static fromBits(bits: Bool[] | boolean[]): StringCircuitValue {
    console.log(`Bits Length: ${bits.length}`);
    if (typeof (bits[0]) != 'boolean') {
      bits = bits.map(x => x.toBoolean())
    }
    const intArray = []
    for (let i = 0; i < bits.length; i += 8) {
      const bitSubArray = bits.slice(i, i + 8);
      const uint = UInt8.fromBits(bitSubArray);
      intArray.push(uint);
    }
    const stringVal = new StringCircuitValue('');
    stringVal.value = intArray;
    return stringVal;
  }

  hash() {
    return Poseidon.hash(this.value.map(x => Field(x.toString())));
  }
}
