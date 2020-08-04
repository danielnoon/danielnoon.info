import { FloatingBase } from "./FloatingBase.js";
import { randomInt } from "../util/randomInt.js";
import { Vector2D } from "../Vector2D.js";
import { Color } from "../color.js";
import { easeInOutSine } from "../util/ease.js";

export class FloatingLine extends FloatingBase {
  constructor() {
    super();

    this.length = randomInt(20, 80);

    this.color = Color.random();
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  paint(ctx) {
    ctx.strokeStyle = this.color.toString();
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(this.position.x, this.position.y);

    const end = Vector2D.fromMagnitudeAndDirection(
      this.length,
      this.direction
    ).add(this.position);

    ctx.lineTo(end.x, end.y);
    ctx.stroke();

    this.update();
  }
}
