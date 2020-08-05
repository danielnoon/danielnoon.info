import { FloatingHead } from "./effects/FloatingHead.js";
import { Vector2D } from "./Vector2D.js";

export function addBubbles(effects) {
  effects.addEffect(
    new FloatingHead(
      "/files/images/profile.jpeg",
      100,
      new Vector2D(-100, 400),
      new Vector2D(100, 100)
    )
  );

  setTimeout(
    () =>
      effects.addEffect(
        new FloatingHead(
          "/files/images/ts.png",
          50,
          new Vector2D(window.innerWidth + 200, window.innerHeight / 4),
          new Vector2D(
            (3 * window.innerWidth) / 4,
            (window.innerHeight * 3) / 4
          ),
          "https://typescript.org"
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
          new Vector2D(window.innerWidth / 4, (window.innerHeight * 3) / 4),
          "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
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
          ),
          "https://angular.io"
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
          new Vector2D(
            window.innerWidth / 4,
            (window.innerHeight * 3) / 4 - 100
          ),
          "https://reactjs.org"
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
          ),
          "https://nodejs.org"
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
          new Vector2D(
            window.innerWidth / 4,
            (window.innerHeight * 3) / 4 - 200
          ),
          "https://docker.io"
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
}
