import { ev } from "./util/ev.js";
import { CanvasEvent } from "./Event.js";
import { el } from "./util/el.js";

export class BackgroundEffect {
  /**
   * @param {HTMLCanvasElement} canvas
   */
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.effects = [];

    this.resizeCanvas();

    this.disableEvents = false;

    this.yield = el("#yield-visible");

    const center = el("#center");

    ev("mouseover", el("main, header, footer")).listen(
      () => (this.disableEvents = true)
    );
    ev("mouseout", el("main, header, footer")).listen(
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

  addEffect(effect) {
    this.effects.push(effect);
  }

  removeEffect(effect) {
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

  bubbleEvent(event) {
    if (!this.disableEvents || this.yield.hidden) {
      for (let effect of this.effects.slice().reverse()) {
        effect.handleEvent(event);
      }
    }
  }
}
