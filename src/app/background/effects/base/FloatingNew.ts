import { Vector2 } from "../../../util/Vector2";
import { Effect } from "./Effect";
import { Color } from "../../../util/Color";
import { TransitionState } from "../../../util/TransitionState";
import { randomInt } from "../../../util/fn/randomInt";
import { easeInOutSine, materialEasing } from "../../../util/fn/ease";
import { clamp } from "../../../util/fn/clamp";

interface PositionAnimationState {
  start: number;
  difference: number;
}

enum Dimension {
  x,
  y,
}

export abstract class Floating extends Effect {
  public position: Vector2;
  public rotation = Math.random() * 2 * Math.PI;
  public color = Color.random();

  private pt: TransitionState<PositionAnimationState>[] = [];
  private TRANSITION_DURATION_MIN = 3000;
  private TRANSITION_DURATION_MAX = 6000;

  constructor(
    dimensions: Vector2,
    firstStart: Vector2 = Vector2.randomFromWindow(),
    firstTarget: Vector2 = firstStart.nearby(100)
  ) {
    super(dimensions);

    this.position = firstStart;

    this.newPositionTransition(Dimension.x, firstTarget.x);
    this.newPositionTransition(Dimension.y, firstTarget.y);
    this.newRotationTransition(Math.random() * 2 * Math.PI);
  }

  newPositionTransition(d: Dimension, target: number) {
    const x_ = d === Dimension.x;
    const pos = this.position[x_ ? "x" : "y"];
    const nextTarget = randomInt(pos - 100, pos + 100);

    this.pt[x_ ? 0 : 1] = new TransitionState<PositionAnimationState>({
      duration: randomInt(
        this.TRANSITION_DURATION_MIN,
        this.TRANSITION_DURATION_MAX
      ),
      state: {
        start: pos,
        difference: target - pos,
      },
      easing: easeInOutSine,
      onComplete: () =>
        this.newPositionTransition(
          d,
          (x_ ? this.clampX : this.clampY).bind(this)(
            this.position.nearby(100)[x_ ? "x" : "y"]
          )
        ),
      onUpdate: (current, state) =>
        (this.position[x_ ? "x" : "y"] =
          current * state.difference + state.start),
    });
  }

  clampX(pos: number) {
    return clamp(pos, -10, window.innerWidth + 10 - this.dimensions.x);
  }

  clampY(pos: number) {
    return clamp(pos, -10, window.innerHeight + 10 - this.dimensions.y);
  }

  newRotationTransition(target: number) {
    this.pt[2] = new TransitionState<PositionAnimationState>({
      duration: randomInt(5000, 10000),
      state: {
        start: this.rotation,
        difference: target - this.rotation,
      },
      easing: easeInOutSine,
      onComplete: () => this.newRotationTransition(Math.random() * 2 * Math.PI),
      onUpdate: (current, state) =>
        (this.rotation = current * state.difference + state.start),
    });
  }

  update() {
    this.pt.forEach((transition) => transition.update());
  }
}
