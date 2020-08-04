export class Vector2D {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static randomFromWindow() {
    return this.random(0, 0, window.innerWidth, window.innerHeight);
  }

  static random(minX, minY, maxX, maxY) {
    const x = Math.floor(Math.random() * (maxX - minX)) + minX;
    const y = Math.floor(Math.random() * (maxY - minY)) + minY;

    return new Vector2D(x, y);
  }

  static get zero() {
    return new Vector2D(0, 0);
  }

  /**
   * @param {number} magnitude
   * @param {number} direction
   */
  static fromMagnitudeAndDirection(magnitude, direction) {
    const x = magnitude * Math.cos(direction);
    const y = magnitude * Math.sin(direction);

    return new Vector2D(x, y);
  }

  /**
   *
   * @param {Vector2D} vector
   */
  add(vector) {
    return new Vector2D(this.x + vector.x, this.y + vector.y);
  }
}
