import { randomInt } from "./fn/randomInt";

export class Color {
  constructor(public r: number, public g: number, public b: number) {}

  static random() {
    return new Color(randomInt(0, 255), randomInt(0, 255), randomInt(0, 255));
  }

  toString() {
    return `rgb(${this.r},${this.g},${this.b})`;
  }
}
