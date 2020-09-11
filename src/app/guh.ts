import { range } from "./util/Range";

class Occurrence {
  private static occurrences: Map<string, Occurrence> = new Map();

  private count = 0;

  constructor(private id: string) {}

  static count(id: string) {
    if (!this.occurrences.has(id)) {
      this.occurrences.set(id, new Occurrence(id));
    }

    this.occurrences.get(id)!.count++;
  }

  toString() {
    return `${this.id}: ${this.count}`;
  }

  static print() {
    for (let occurrence of this.occurrences.values()) {
      console.log(occurrence.toString());
    }
  }
}

const r = range(100).iterator();

while (!r.next().done) {
  Occurrence.count("while loop");
}

console.log(Occurrence.print());
