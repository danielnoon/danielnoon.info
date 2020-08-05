export class Range {
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }

  [Symbol.iterator] = function* iterator() {
    for (let i = this.from; i < this.to; i++) {
      yield i;
    }
  };
}
