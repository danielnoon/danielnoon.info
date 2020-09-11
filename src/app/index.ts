import { BackgroundEffect } from "./background/Background";
import { el } from "./lib/el";
import { range } from "./util/Range";
import { FloatingDot } from "./background/effects/floating/Dot";
import { FloatingLine } from "./background/effects/floating/Line";
import "./css/styles.css";

import { ev } from "./lib/ev";
import { addBubbles } from "./addBubbles";

const canvas = el<HTMLCanvasElement>("canvas");
const background = new BackgroundEffect(canvas);

for (let _ of range(100)) {
  background.addEffect(new FloatingDot());
}

for (let _ of range(50)) {
  background.addEffect(new FloatingLine());
}

addBubbles(background);

background.start();

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
