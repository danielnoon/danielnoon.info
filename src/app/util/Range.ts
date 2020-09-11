export class Range {
  constructor(public from: number, public to: number) {
    this[Symbol.iterator].bind(this);
  }

  [Symbol.iterator] = function* iterator(this: Range) {
    for (let i = this.from; i < this.to; i++) {
      yield i;
    }
  };

  iterator() {
    return this[Symbol.iterator]();
  }
}

export function range(to: number): Range;
export function range(from: number, to?: number): Range {
  if (typeof to === "number") {
    return new Range(from, to);
  } else {
    return new Range(0, from);
  }
}
