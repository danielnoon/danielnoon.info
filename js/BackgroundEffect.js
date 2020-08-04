export class BackgroundEffect {
  /**
   * @param {HTMLCanvasElement} canvas
   */
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.effects = [];

    this.resizeCanvas();

    addEventListener("resize", () => this.resizeCanvas());
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
}
