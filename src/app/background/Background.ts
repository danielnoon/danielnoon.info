import { Effect } from "./effects/base/Effect";
import { el, els } from "../lib/el";
import { ev } from "../lib/ev";
import { CanvasEvent } from "../lib/CanvasEvent";

export class BackgroundEffect {
  private context: CanvasRenderingContext2D;
  private effects: Effect[] = [];
  private disableEvents = false;
  private yield: HTMLButtonElement;

  constructor(private canvas: HTMLCanvasElement) {
    this.context = canvas.getContext("2d")!;

    this.resizeCanvas();

    this.yield = el<HTMLButtonElement>("#yield-visible");

    const center = el("#center");

    ev("mouseover", els<HTMLElement>("main, header, footer")).listen(
      () => (this.disableEvents = true)
    );
    ev("mouseout", els<HTMLElement>("main, header, footer")).listen(
      () => (this.disableEvents = false)
    );

    ev("resize").listen(() => this.resizeCanvas());

    ev("mousemove", center).listen((ev) =>
      this.bubbleEvent(new CanvasEvent("mousemove", ev))
    );

    ev("click", center).listen((ev) =>
      this.bubbleEvent(new CanvasEvent("click", ev))
    );
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  start() {
    this.draw();
  }

  addEffect(effect: Effect) {
    this.effects.push(effect);
  }

  removeEffect(effect: Effect) {
    this.effects.splice(this.effects.indexOf(effect), 1);
  }

  draw() {
    this.paintBackground();
    this.paintEffects();

    requestAnimationFrame(() => this.draw());
  }

  paintBackground() {
    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  paintEffects() {
    for (let effect of this.effects) {
      effect.paint(this.context);
    }
  }

  bubbleEvent(event: CanvasEvent) {
    if (!this.disableEvents || this.yield.hidden) {
      for (let effect of this.effects.slice().reverse()) {
        effect.handleEvent(event);

        if (event.handled) {
          break;
        }
      }
    }
  }
}
