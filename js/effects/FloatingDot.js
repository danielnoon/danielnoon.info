import { randomColor } from "../util/randomColor.js";
import { FloatingBase } from "./FloatingBase.js";
import { Color } from "../color.js";

export class FloatingDot extends FloatingBase {
  constructor(startingPoint) {
    super(startingPoint);

    this.color = Color.random();
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  paint(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color.toString();
    ctx.ellipse(this.position.x, this.position.y, 3, 3, 0, 0, 2 * Math.PI);
    ctx.fill();

    this.update();
  }
}
