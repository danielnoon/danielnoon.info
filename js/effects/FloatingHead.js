import { FloatingBase } from "./FloatingBase.js";

export class FloatingHead extends FloatingBase {
  constructor(source, size, start, target) {
    super(start, target);

    this.image = new Image(size, size);
    this.image.src = source;
    this.size = size;
    this.radius = size / 2;
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  paint(ctx) {
    ctx.save();

    ctx.beginPath();
    ctx.arc(
      this.position.x + this.radius,
      this.position.y + this.radius,
      this.radius,
      0,
      2 * Math.PI
    );
    ctx.closePath();

    ctx.clip();

    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );

    ctx.restore();
    this.update();
  }
}
