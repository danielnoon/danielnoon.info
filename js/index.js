import { BackgroundEffect } from "./BackgroundEffect.js";
import { FloatingDot } from "./effects/FloatingDot.js";
import { FloatingLine } from "./effects/FloatingLine.js";
import { FloatingHead } from "./effects/FloatingHead.js";
import { Vector2D } from "./Vector2D.js";
import { el } from "./util/el.js";
import { ev } from "./util/ev.js";
import { addBubbles } from "./addBubbles.js";
import { Range } from "./Iterator.js";

const canvas = document.getElementById("effects");
const effects = new BackgroundEffect(canvas);

const area = window.innerHeight * window.innerWidth;
const dotDensity = 0.0001;
const lineDensity = 0.000025;
const numDots = Math.round(dotDensity * area);
const numLines = Math.round(lineDensity * area);

for (let i of new Range(0, numDots)) {
  effects.addEffect(new FloatingDot());
}

for (let i of new Range(0, numLines)) {
  effects.addEffect(new FloatingLine());
}

addBubbles(effects);

effects.start();

const elements = new Map([
  ["#raikes", "#bg-raikes"],
  ["#japanese", "#bg-japanese"],
  ["#omaha", "#bg-omaha"],
]);

const center = el(".center");
const yieldButton = el("#yield-button");
const yieldVisibleIcon = el("#yield-visible");
const yieldHiddenIcon = el("#yield-hidden");

for (let element of elements) {
  const [trigger, target] = element.map((e) => el(e));

  trigger.addEventListener("mouseenter", () => {
    if (yieldHiddenIcon.hidden) {
      target.classList.add("visible");
      center.classList.add("yield");
    }
  });

  trigger.addEventListener("mouseleave", () => {
    target.classList.remove("visible");

    if (yieldHiddenIcon.hidden) {
      center.classList.remove("yield");
    }
  });
}

ev("click", yieldButton).listen((e) => {
  if (!yieldVisibleIcon.hidden) {
    center.classList.add("yield");
    yieldVisibleIcon.hidden = true;
    yieldHiddenIcon.hidden = false;
  } else {
    center.classList.remove("yield");
    yieldVisibleIcon.hidden = false;
    yieldHiddenIcon.hidden = true;
  }
});
