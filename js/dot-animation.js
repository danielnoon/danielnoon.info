import { el } from "./util/el.js";
import { TransitionState } from "./TransitionState.js";
import { materialEasing, easeInOutSine } from "./util/ease.js";
import { Vector2D } from "./Vector2D.js";

const canvas = el("#canvas");
const ctx = canvas.getContext("2d");

const TRANSITION_DURATION = 4000;

const dotStates = [
  {
    easing: (x) => x,
    transition: new TransitionState(TRANSITION_DURATION, (x) => x),
    position: new Vector2D(0, 100),
    reverse: false,
  },
  {
    easing: easeInOutSine,
    transition: new TransitionState(TRANSITION_DURATION, easeInOutSine),
    position: new Vector2D(0, 200),
    reverse: false,
  },
  {
    easing: materialEasing,
    transition: new TransitionState(TRANSITION_DURATION, materialEasing),
    position: new Vector2D(0, 300),
    reverse: false,
  },
];

const loop = () => {
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.rect(0, 0, 1000, 1000);
  ctx.fill();

  for (let state of dotStates) {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.ellipse(
      state.position.x + 20,
      state.position.y + 20,
      10,
      10,
      0,
      0,
      2 * Math.PI
    );
    ctx.fill();

    if (!state.transition.done) {
      state.position.x =
        500 *
        (state.reverse ? 1 - state.transition.now() : state.transition.now());
    } else {
      state.transition = new TransitionState(4000, state.easing);
      state.reverse = !state.reverse;
    }
  }

  requestAnimationFrame(loop);
};

loop();
