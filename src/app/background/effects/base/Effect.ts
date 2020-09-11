import { CanvasEvent } from "../../../lib/CanvasEvent";
import { Vector2 } from "../../../util/Vector2";

export abstract class Effect {
  constructor(public dimensions: Vector2) {}

  handleEvent(event: CanvasEvent) {
    event.continue();
  }

  abstract paint(ctx: CanvasRenderingContext2D): void;
}
