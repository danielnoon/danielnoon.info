import { Floating } from "../base/FloatingNew";
import { randomInt } from "../../../util/fn/randomInt";
import { Vector2 } from "../../../util/Vector2";

export class FloatingLine extends Floating {
  private length: number;

  constructor() {
    const length = randomInt(20, 80);
    super(new Vector2(length, length));

    this.length = length;
  }

  paint(ctx: CanvasRenderingContext2D) {
    const half = Vector2.fromMD(this.length / 2, this.rotation);
    const start = this.position.subtract(half);
    const end = this.position.add(half);

    ctx.strokeStyle = this.color.toString();
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();

    this.update();
  }
}
