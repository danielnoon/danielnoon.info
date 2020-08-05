class EventListener {
  constructor() {
    this.callbacks = [];

    this.callListeners = this.callListeners.bind(this);
  }

  listen(callback) {
    this.callbacks.push(callback);
  }

  callListeners(ev) {
    this.callbacks.forEach((callback) => callback(ev));
  }
}

export const ev = (type, on) => {
  const listener = new EventListener();

  (on || window).addEventListener(type, listener.callListeners);

  return listener;
};
