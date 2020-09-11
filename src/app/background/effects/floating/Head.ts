import { Floating } from "../base/FloatingNew";
import { bezier } from "../../../util/BezierEasing";
import { Vector2 } from "../../../util/Vector2";
import { TransitionState } from "../../../util/TransitionState";
import { CanvasEvent } from "../../../lib/CanvasEvent";

interface ScaleTransition {
  originalSize: number;
  targetSize: number;
}

export class FloatingHead extends Floating {
  static get scaleTransition() {
    return bezier(0.4, 0.0, 0.2, 1);
  }

  image: HTMLImageElement;
  originalSize: number;
  radius: number;
  hover = false;
  delayStart = 0;
  scaleTransition: TransitionState<ScaleTransition> | null = null;
  scaleUp = false;

  constructor(
    source: string,
    public size: number,
    start: Vector2,
    target: Vector2,
    public linkTo: string
  ) {
    super(start, target);

    this.image = new Image(size, size);
    this.image.src = source;
    this.originalSize = size;
    this.radius = size / 2;
  }

  paint(ctx: CanvasRenderingContext2D) {
    ctx.save();

    const adjustedPosition = this.position.add(
      new Vector2(-this.radius, -this.radius)
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
    if (this.scaleTransition) {
      this.scaleTransition.update();
      this.radius = this.size / 2;
    }
  }

  handleEvent(event: CanvasEvent) {
    if (event.type === "mousemove") {
      const e = event.native as MouseEvent;
      const mouseVector = new Vector2(e.clientX, e.clientY);

      const delta = mouseVector.subtract(this.position);

      if (!event.handled && delta.magnitude < this.radius) {
        event.handle();
        this.hover = true;
        if (!this.scaleUp) {
          this.scaleUp = true;
          this.scaleTransition = new TransitionState({
            duration: 300,
            state: {
              originalSize: this.originalSize,
              targetSize: this.originalSize * 1.2,
            },
            easing: FloatingHead.scaleTransition,
            onUpdate: (current, state) => {
              this.size = state.originalSize * (1 + 0.2 * current);
            },
          });
        }
      } else {
        this.hover = false;
        if (this.scaleUp) {
          this.scaleUp = false;
          this.scaleTransition = new TransitionState({
            duration: 300,
            state: {
              originalSize: this.originalSize,
              targetSize: this.originalSize * 1.2,
            },
            easing: FloatingHead.scaleTransition,
            onUpdate: (current, state) => {
              this.size = state.originalSize * (1 + 0.2 * (1 - current));
            },
          });
        }
      }
    }

    if (event.type === "click") {
      const e = event.native as MouseEvent;
      const mouseVector = new Vector2(e.clientX, e.clientY);
      const delta = mouseVector.subtract(this.position);

      if (this.linkTo && !event.handled && delta.magnitude < this.radius) {
        open(this.linkTo);
        event.handle();
      }
    }
  }
}
