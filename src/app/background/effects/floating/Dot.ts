import { Floating } from "../base/FloatingNew";
import { Vector2 } from "../../../util/Vector2";

export class FloatingDot extends Floating {
  constructor() {
    super(new Vector2(3, 3));
  }

  paint(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = this.color.toString();
    ctx.ellipse(this.position.x, this.position.y, 3, 3, 0, 0, 2 * Math.PI);
    ctx.fill();

    this.update();
  }
}
