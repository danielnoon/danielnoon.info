import { FloatingBase } from "./FloatingBase.js";
import { Vector2D } from "../Vector2D.js";
import { TransitionState } from "../TransitionState.js";
import { easeInOutSine } from "../util/ease.js";
import { bezier } from "../util/BezierEasing.js";

export class FloatingHead extends FloatingBase {
  static get scaleTransition() {
    return bezier(0.4, 0.0, 0.2, 1);
  }

  constructor(source, size, start, target, linkTo) {
    super(start, target);

    this.image = new Image(size, size);
    this.image.src = source;
    this.size = size;
    this.originalSize = size;
    this.radius = size / 2;

    this.hover = false;
    this.delayStart = 0;

    this.scaleTransition = null;
    this.scaleUp = false;

    this.linkTo = linkTo;
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

    if (this.scaleTransition.done) {
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
      const mouseVector = new Vector2D(
        event.native.clientX,
        event.native.clientY
      );
      const delta = mouseVector.subtract(this.position);

      if (!event._handled && delta.magnitude() < this.radius) {
        event.handle();
        this.hover = true;
        if (!this.scaleUp) {
          this.scaleUp = true;
          this.scaleTransition = new TransitionState(
            300,
            FloatingHead.scaleTransition
          );
        }
      } else {
        this.hover = false;
        if (this.scaleUp) {
          this.scaleUp = false;
          this.scaleTransition = new TransitionState(
            300,
            FloatingHead.scaleTransition
          );
        }
      }
    }

    if (event.type === "click") {
      const mouseVector = new Vector2D(
        event.native.clientX,
        event.native.clientY
      );
      const delta = mouseVector.subtract(this.position);

      if (this.linkTo && !event._handled && delta.magnitude() < this.radius) {
        open(this.linkTo);
        event.handle();
      }
    }
  }
}
