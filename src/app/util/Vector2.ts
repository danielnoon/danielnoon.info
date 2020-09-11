import { randomInt } from "./fn/randomInt";

export class Vector2 {
  static random(minX: number, minY: number, maxX: number, maxY: number) {
    const x = Math.floor(Math.random() * (maxX - minX)) + minX;
    const y = Math.floor(Math.random() * (maxY - minY)) + minY;

    return new Vector2(x, y);
  }

  static get zero() {
    return new Vector2(0, 0);
  }

  static fromMD(magnitude: number, direction: number) {
    const x = magnitude * Math.cos(direction);
    const y = magnitude * Math.sin(direction);

    return new Vector2(x, y);
  }

  static randomFromWindow() {
    return this.random(0, 0, window.innerWidth, window.innerHeight);
  }

  constructor(public x: number, public y: number) {}

  clone() {
    return new Vector2(this.x, this.y);
  }

  invert() {
    return new Vector2(-this.x, -this.y);
  }

  add(vector: Vector2) {
    return new Vector2(this.x + vector.x, this.y + vector.y);
  }

  subtract(vector: Vector2) {
    return this.add(vector.invert());
  }

  to(vector: Vector2) {
    return this.subtract(vector);
  }

  nearby(diameter: number) {
    const magnitude = randomInt(0, diameter);
    const direction = Math.random() * 2 * Math.PI;

    return Vector2.fromMD(magnitude, direction).add(this);
  }

  get magnitude() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  get direction() {
    return Math.atan(this.y / this.x);
  }
}
