import { Vector2D } from "../Vector2D.js";
import { randomColor } from "../util/randomColor.js";
import { randomInt } from "../util/randomInt.js";
import { easeInOutSine, materialEasing } from "../util/ease.js";
import { clamp } from "../util/clamp.js";
import { EffectBase } from "./EffectBase.js";
import { TransitionState } from "../TransitionState.js";
import { bezier } from "../util/BezierEasing.js";

export class FloatingBase extends EffectBase {
  constructor(startingPoint, endPoint) {
    super();

    this.position = startingPoint || Vector2D.randomFromWindow();
    this.start = new Vector2D(this.position.x, this.position.y);
    this.target =
      endPoint ||
      Vector2D.random(
        clamp(this.start.x - 100, -10, window.innerWidth + 10),
        clamp(this.start.y - 100, -10, window.innerHeight + 10),
        clamp(this.start.x + 100, -10, window.innerWidth + 10),
        clamp(this.start.y + 100, -10, window.innerHeight + 10)
      );

    this.velocity = Vector2D.zero;
    this.acceleration = Vector2D.zero;

    this.xTransition = new TransitionState(
      randomInt(4000, 8000),
      easeInOutSine
    );

    this.yTransition = new TransitionState(
      randomInt(3500, 8500),
      easeInOutSine
    );

    this.direction = randomInt(0, 2 * Math.PI);
    this.startDirection = this.direction;
    this.endDirection = randomInt(
      this.direction - Math.PI / 2,
      this.direction + Math.PI / 2
    );

    this.rotationTransition = new TransitionState(
      randomInt(5000, 10000),
      materialEasing
    );

    this.startDirectionTime = Date.now();
    this.endDirectionTime = Date.now() + randomInt(6000, 8000);
  }

  update() {
    const now = Date.now();

    const x = this.target.x - this.start.x;
    const y = this.target.y - this.start.y;
    const direction = this.endDirection - this.startDirection;

    const dx = x * this.xTransition.now();
    const dy = y * this.yTransition.now();
    const dd = direction * this.rotationTransition.now();

    this.position.x = this.start.x + dx;
    this.position.y = this.start.y + dy;
    this.direction = this.startDirection + dd;

    if (this.xTransition.done) {
      this.resetXAnimation();
    }

    if (this.yTransition.done) {
      this.resetYAnimation();
    }

    if (this.rotationTransition.done) {
      this.resetRoationAnimation();
    }
  }

  resetXAnimation() {
    this.start.x = this.target.x;
    this.target.x = clamp(
      randomInt(this.target.x - 100, this.target.x + 100),
      -10,
      window.innerWidth + 10
    );
    this.xTransition = new TransitionState(
      randomInt(4000, 8000),
      easeInOutSine
    );
  }

  resetYAnimation() {
    this.start.y = this.target.y;
    this.target.y = clamp(
      randomInt(this.target.y - 100, this.target.y + 100),
      -10,
      window.innerHeight + 10
    );
    this.yTransition = new TransitionState(
      randomInt(3500, 8500),
      easeInOutSine
    );
  }

  resetRoationAnimation() {
    this.startDirection = this.endDirection;

    this.endDirection = randomInt(
      this.direction - Math.PI / 2,
      this.direction + Math.PI / 2
    );

    this.rotationTransition = new TransitionState(
      randomInt(5000, 10000),
      materialEasing
    );
  }
}
