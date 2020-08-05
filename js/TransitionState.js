export class TransitionState {
  constructor(duration, easing) {
    this._start = Date.now();
    this._duration = duration;
    this._easing = easing;
  }

  now() {
    const now = Date.now();

    const elapsed = now - this._start;
    const percent = elapsed / this._duration;

    return this._easing(percent);
  }

  get done() {
    return Date.now() > this._start + this._duration;
  }
}
