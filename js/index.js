import { BackgroundEffect } from "./BackgroundEffect.js";
import { FloatingDot } from "./effects/FloatingDot.js";
import { FloatingLine } from "./effects/FloatingLine.js";
import { FloatingHead } from "./effects/FloatingHead.js";
import { Vector2D } from "./Vector2D.js";
import { el } from "./util/el.js";
import { ev } from "./util/ev.js";

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

setTimeout(
  () =>
    effects.addEffect(
      new FloatingHead(
        "/files/images/ts.png",
        50,
        new Vector2D(window.innerWidth + 200, window.innerHeight / 4),
        new Vector2D((3 * window.innerWidth) / 4, (window.innerHeight * 3) / 4)
      )
    ),
  4000
);

setTimeout(
  () =>
    effects.addEffect(
      new FloatingHead(
        "/files/images/js.jpg",
        50,
        new Vector2D(-200, window.innerHeight / 4),
        new Vector2D(window.innerWidth / 4, (window.innerHeight * 3) / 4)
      )
    ),
  5000
);

setTimeout(
  () =>
    effects.addEffect(
      new FloatingHead(
        "/files/images/angular.png",
        50,
        new Vector2D(window.innerWidth + 200, window.innerHeight / 4),
        new Vector2D(
          (3 * window.innerWidth) / 4,
          (window.innerHeight * 3) / 4 - 100
        )
      )
    ),
  6000
);

setTimeout(
  () =>
    effects.addEffect(
      new FloatingHead(
        "/files/images/react.png",
        50,
        new Vector2D(-200, window.innerHeight / 4),
        new Vector2D(window.innerWidth / 4, (window.innerHeight * 3) / 4 - 100)
      )
    ),
  7000
);

setTimeout(
  () =>
    effects.addEffect(
      new FloatingHead(
        "/files/images/node.png",
        50,
        new Vector2D(window.innerWidth + 200, window.innerHeight / 4),
        new Vector2D(
          (3 * window.innerWidth) / 4,
          (window.innerHeight * 3) / 4 - 200
        )
      )
    ),
  8000
);

setTimeout(
  () =>
    effects.addEffect(
      new FloatingHead(
        "/files/images/docker.png",
        50,
        new Vector2D(-200, window.innerHeight / 4),
        new Vector2D(window.innerWidth / 4, (window.innerHeight * 3) / 4 - 200)
      )
    ),
  9000
);

setTimeout(
  () =>
    effects.addEffect(
      new FloatingHead(
        "https://daitarou.info/static/846ebaa2a3e131414f0e4400682ca537/65e33/square.png",
        75,
        new Vector2D(window.innerWidth / 4, window.innerHeight + 200),
        new Vector2D((3 * window.innerWidth) / 4, 200)
      )
    ),
  60000
);

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
