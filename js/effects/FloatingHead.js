import { FloatingBase } from "./FloatingBase.js";
import { Vector2D } from "../Vector2D.js";
import { TransitionState } from "../TransitionState.js";
import { easeInOutSine } from "../util/ease.js";

export class FloatingHead extends FloatingBase {
  constructor(source, size, start, target) {
    super(start, target);

    this.image = new Image(size, size);
    this.image.src = source;
    this.size = size;
    this.originalSize = size;
    this.radius = size / 2;

    this.hover = false;
    this.delayStart = 0;

    this.scaleTransition = null;
    this.scaleUp = true;
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  paint(ctx) {
    ctx.save();

    const adjustedPosition = this.position.add(
      new Vector2D(-this.radius, -this.radius)
    );

    ctx.beginPath();
    ctx.arc(
      adjustedPosition.x + this.radius,
      adjustedPosition.y + this.radius,
      this.radius,
      0,
      2 * Math.PI
    );
    ctx.closePath();

    ctx.clip();

    ctx.drawImage(
      this.image,
      adjustedPosition.x,
      adjustedPosition.y,
      this.size,
      this.size
    );

    if (this.scaleTransition) {
      this.updateScale();
    }

    ctx.restore();
    this.update();
  }

  updateScale() {
    const current = this.scaleTransition.now();
    console.log(current);
    if (current === -1) {
      this.scaleTransition = null;
    } else {
      this.size =
        this.originalSize *
        (1 + (this.scaleUp ? 0.2 * current : 0.2 * (1 - current)));
    }
    this.radius = this.size / 2;
  }

  handleEvent(event) {
    if (event.type === "mousemove") {
      const mouseVector = new Vector2D(event.native.pageX, event.native.pageY);
      const delta = mouseVector.subtract(this.position);

      if (delta.magnitude() < this.radius) {
        event.handle();
        this.hover = true;
        if (!this.scaleUp) {
          this.scaleUp = true;
          this.scaleTransition = new TransitionState(200, easeInOutSine);
        }
      } else {
        this.hover = false;
        if (this.scaleUp) {
          this.scaleUp = false;
          this.scaleTransition = new TransitionState(200, easeInOutSine);
        }
      }
    }
  }
}
