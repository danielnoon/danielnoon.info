interface TransitionStateOptions<T> {
  duration: number;
  state: T;
  easing?: (x: number) => number;
  onUpdate?: (current: number, state: T) => void;
  onComplete?: (state: T) => void;
}

export class TransitionState<T> {
  private start: number;
  private duration: number;
  private state: T;
  private complete = false;

  private easing: (x: number) => number;
  private onUpdate: (current: number, state: T) => void;
  private onComplete: (state: T) => void;

  constructor(options: TransitionStateOptions<T>) {
    this.start = Date.now();
    this.duration = options.duration;
    this.state = options.state;

    this.easing = options.easing ?? ((x) => x);
    this.onUpdate = options.onUpdate ?? (() => void 0);
    this.onComplete = options.onComplete ?? (() => void 0);
  }

  now() {
    const now = Date.now();

    const elapsed = now - this.start;
    const percent = elapsed / this.duration;

    return this.easing(percent);
  }

  update() {
    if (!this.complete) {
      const current = this.now();
      this.onUpdate(current, this.state);

      if (this.done) {
        this.onComplete(this.state);
        this.complete = true;
      }
    }
  }

  get done() {
    return this.complete || Date.now() > this.start + this.duration;
  }
}
