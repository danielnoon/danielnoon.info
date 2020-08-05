export class CanvasEvent {
  constructor(type, native) {
    this.type = type;
    this.native = native;

    this._handled = false;
  }

  continue() {
    this._handled = false;
  }

  handle() {
    this._handled = true;
  }
}
