import { BackgroundEffect } from "./background/Background";
import { FloatingHead } from "./background/effects/floating/Head";
import { Vector2 } from "./util/Vector2";

import profile from "./images/profile.jpg";
// import js from "./images/js.jpg";
// import ts from "./images/ts.png";
// import node from "./images/node.png";
// import docker from "./images/docker.png";
// import react from "./images/react.png";
// import angular from "./images/angular.png";

export function addBubbles(effects: BackgroundEffect) {
  effects.addEffect(
    new FloatingHead(
      profile,
      100,
      new Vector2(-100, 400),
      new Vector2(100, 100),
      ""
    )
  );

  // setTimeout(
  //   () =>
  //     effects.addEffect(
  //       new FloatingHead(
  //         ts,
  //         50,
  //         new Vector2(window.innerWidth + 200, window.innerHeight / 4),
  //         new Vector2(
  //           (3 * window.innerWidth) / 4,
  //           (window.innerHeight * 3) / 4
  //         ),
  //         "https://typescript.org"
  //       )
  //     ),
  //   4000
  // );

  // setTimeout(
  //   () =>
  //     effects.addEffect(
  //       new FloatingHead(
  //         js,
  //         50,
  //         new Vector2(-200, window.innerHeight / 4),
  //         new Vector2(window.innerWidth / 4, (window.innerHeight * 3) / 4),
  //         "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
  //       )
  //     ),
  //   5000
  // );

  // setTimeout(
  //   () =>
  //     effects.addEffect(
  //       new FloatingHead(
  //         angular,
  //         50,
  //         new Vector2(window.innerWidth + 200, window.innerHeight / 4),
  //         new Vector2(
  //           (3 * window.innerWidth) / 4,
  //           (window.innerHeight * 3) / 4 - 100
  //         ),
  //         "https://angular.io"
  //       )
  //     ),
  //   6000
  // );

  // setTimeout(
  //   () =>
  //     effects.addEffect(
  //       new FloatingHead(
  //         react,
  //         50,
  //         new Vector2(-200, window.innerHeight / 4),
  //         new Vector2(
  //           window.innerWidth / 4,
  //           (window.innerHeight * 3) / 4 - 100
  //         ),
  //         "https://reactjs.org"
  //       )
  //     ),
  //   7000
  // );

  // setTimeout(
  //   () =>
  //     effects.addEffect(
  //       new FloatingHead(
  //         node,
  //         50,
  //         new Vector2(window.innerWidth + 200, window.innerHeight / 4),
  //         new Vector2(
  //           (3 * window.innerWidth) / 4,
  //           (window.innerHeight * 3) / 4 - 200
  //         ),
  //         "https://nodejs.org"
  //       )
  //     ),
  //   8000
  // );

  // setTimeout(
  //   () =>
  //     effects.addEffect(
  //       new FloatingHead(
  //         docker,
  //         50,
  //         new Vector2(-200, window.innerHeight / 4),
  //         new Vector2(
  //           window.innerWidth / 4,
  //           (window.innerHeight * 3) / 4 - 200
  //         ),
  //         "https://docker.io"
  //       )
  //     ),
  //   9000
  // );

  // setTimeout(
  //   () =>
  //     effects.addEffect(
  //       new FloatingHead(
  //         "https://daitarou.info/static/846ebaa2a3e131414f0e4400682ca537/65e33/square.png",
  //         75,
  //         new Vector2(window.innerWidth / 4, window.innerHeight + 200),
  //         new Vector2((3 * window.innerWidth) / 4, 200),
  //         ""
  //       )
  //     ),
  //   60000
  // );
}
