import { randomColor } from "./util/randomColor.js";

export class Color {
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  static random() {
    return new Color(randomColor(), randomColor(), randomColor());
  }

  toString() {
    return `rgb(${this.r},${this.g},${this.b})`;
  }
}
