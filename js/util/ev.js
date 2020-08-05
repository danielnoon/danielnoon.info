class EventListener {
  constructor(type, on) {
    this._on = on;
    this._type = type;

    this._callbacks = [];
    this._identity = new Map();

    this._callListeners = this._callListeners.bind(this);
  }

  listen(callback, id) {
    this._identity.set(id || callback, callback);
    this._callbacks.push(callback);
  }

  remove(id) {
    const callback = this._identity.get(id);
    const idx = this._callbacks.indexOf(callback);
    if (idx >= 0) {
      this._callbacks.splice(idx, 1);
      this._identity.delete(id);
    }
  }

  get once() {
    return new Promise((resolve, reject) => {
      const f = (ev) => {
        this.remove(f);
        resolve(ev);
      };

      this.listen(f);
    });
  }

  _callListeners(ev) {
    this._callbacks.forEach((callback) => callback(ev));
  }

  attach() {
    (this._on instanceof Array ? this._on : [this._on]).forEach((e) =>
      e.addEventListener(this._type, this._callListeners)
    );
  }

  dispose() {
    (this._on instanceof Array ? this._on : [this._on]).forEach((e) =>
      e.removeEventListener(this._type, this._callListeners)
    );
  }
}

export const ev = (type, on) => {
  const listener = new EventListener(type, on || window);

  listener.attach();

  return listener;
};
