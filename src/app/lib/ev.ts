type callback = (ev: Event) => void;

class EventListener {
  private callbacks: callback[] = [];
  private identity: Map<string | callback, callback> = new Map();

  constructor(
    private type: string,
    private on: HTMLElement | HTMLElement[] | typeof globalThis
  ) {
    this.callListeners = this.callListeners.bind(this);
  }

  listen(callback: callback, id?: string) {
    this.identity.set(id || callback, callback);
    this.callbacks.push(callback);
  }

  remove(id: string | callback) {
    const callback = this.identity.get(id);
    if (!callback) return;

    const idx = this.callbacks.indexOf(callback);
    if (idx >= 0) {
      this.callbacks.splice(idx, 1);
      this.identity.delete(id);
    }
  }

  get once() {
    return new Promise((resolve, reject) => {
      const f = (ev: Event) => {
        this.remove(f);
        resolve(ev);
      };

      this.listen(f);
    });
  }

  private callListeners(ev: Event) {
    this.callbacks.forEach((callback) => callback(ev));
  }

  attach() {
    (this.on instanceof Array ? this.on : [this.on]).forEach((e) =>
      e.addEventListener(this.type, this.callListeners)
    );
  }

  dispose() {
    (this.on instanceof Array ? this.on : [this.on]).forEach((e) =>
      e.removeEventListener(this.type, this.callListeners)
    );
  }
}

export const ev = (type: string, on?: HTMLElement | HTMLElement[]) => {
  const listener = new EventListener(type, on || window);

  listener.attach();

  return listener;
};
