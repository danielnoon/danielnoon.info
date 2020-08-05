import { Vector2D } from "../Vector2D.js";
import { randomColor } from "../util/randomColor.js";
import { randomInt } from "../util/randomInt.js";
import { easeInOutSine } from "../util/ease.js";
import { clamp } from "../util/clamp.js";
import { EffectBase } from "./EffectBase.js";

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

    this.xMoveTimeStart = Date.now();
    this.xMoveTimeEnd = Date.now() + randomInt(4000, 8000);
    this.yMoveTimeStart = Date.now();
    this.yMoveTimeEnd = Date.now() + randomInt(3000, 10000);

    this.direction = randomInt(0, 2 * Math.PI);
    this.startDirection = this.direction;
    this.endDirection = randomInt(
      this.direction - Math.PI / 2,
      this.direction + Math.PI / 2
    );

    this.startDirectionTime = Date.now();
    this.endDirectionTime = Date.now() + randomInt(6000, 8000);
  }

  update() {
    const now = Date.now();

    const x = this.target.x - this.start.x;
    const y = this.target.y - this.start.y;
    const direction = this.endDirection - this.startDirection;

    const xTimeElapsed = now - this.xMoveTimeStart;
    const xTimeTotal = this.xMoveTimeEnd - this.xMoveTimeStart;
    const xPercentTime = xTimeElapsed / xTimeTotal;

    const yTimeElapsed = now - this.yMoveTimeStart;
    const yTimeTotal = this.yMoveTimeEnd - this.yMoveTimeStart;
    const yPercentTime = yTimeElapsed / yTimeTotal;

    const directionTimeElapsed = now - this.startDirectionTime;
    const directionTimeTotal = this.endDirectionTime - this.startDirectionTime;
    const percentDirectionTime = directionTimeElapsed / directionTimeTotal;

    const dx = x * easeInOutSine(xPercentTime);
    const dy = y * easeInOutSine(yPercentTime);
    const dd = direction * easeInOutSine(percentDirectionTime);

    this.position.x = this.start.x + dx;
    this.position.y = this.start.y + dy;
    this.direction = this.startDirection + dd;

    if (now >= this.xMoveTimeEnd) {
      this.start.x = this.target.x;
      this.target.x = clamp(
        randomInt(this.target.x - 100, this.target.x + 100),
        -10,
        window.innerWidth + 10
      );
      this.xMoveTimeStart = Date.now();
      this.xMoveTimeEnd = Date.now() + randomInt(4000, 8000);
    }

    if (now >= this.yMoveTimeEnd) {
      this.start.y = this.target.y;
      this.target.y = clamp(
        randomInt(this.target.y - 100, this.target.y + 100),
        -10,
        window.innerHeight + 10
      );
      this.yMoveTimeStart = Date.now();
      this.yMoveTimeEnd = Date.now() + randomInt(3000, 8000);
    }

    if (now >= this.endDirectionTime) {
      this.startDirection = this.endDirection;

      this.endDirection = randomInt(
        this.direction - Math.PI / 2,
        this.direction + Math.PI / 2
      );

      this.startDirectionTime = Date.now();
      this.endDirectionTime = Date.now() + randomInt(4000, 8000);
    }
  }
}
