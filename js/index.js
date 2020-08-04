import { BackgroundEffect } from "./BackgroundEffect.js";
import { FloatingDot } from "./effects/FloatingDot.js";
import { FloatingLine } from "./effects/FloatingLine.js";
import { FloatingHead } from "./effects/FloatingHead.js";
import { Vector2D } from "./Vector2D.js";

const canvas = document.getElementById("effects");
const effects = new BackgroundEffect(canvas);

const area = window.innerHeight * window.innerWidth;
const dotDensity = 0.0001;
const lineDensity = 0.000025;
const numDots = Math.round(dotDensity * area);
const numLines = Math.round(lineDensity * area);

for (let i of new Array(numDots)) {
  effects.addEffect(new FloatingDot());
}

for (let i of new Array(numLines)) {
  effects.addEffect(new FloatingLine());
}

effects.addEffect(
  new FloatingHead(
    "/files/images/profile.jpeg",
    100,
    new Vector2D(-100, 400),
    new Vector2D(100, 100)
  )
);

effects.start();

const elements = new Map([
  ["#raikes", "#bg-raikes"],
  ["#japanese", "#bg-japanese"],
  ["#omaha", "#bg-omaha"],
]);

const center = document.querySelector(".center");

for (let el of elements) {
  const [trigger, target] = el.map((e) => document.querySelector(e));

  trigger.addEventListener("mouseenter", () => {
    target.classList.add("visible");
    center.classList.add("yield");
  });

  trigger.addEventListener("mouseleave", () => {
    target.classList.remove("visible");
    center.classList.remove("yield");
  });
}

setTimeout(
  () =>
    effects.addEffect(
      new FloatingHead(
        "https://daitarou.info/static/846ebaa2a3e131414f0e4400682ca537/65e33/square.png",
        75,
        new Vector2D(window.innerWidth / 2, window.innerHeight + 200),
        Vector2D.randomFromWindow()
      )
    ),
  10000
);
