export class Event {
  constructor(type, native) {
    this.type = type;
    this.native = native;

    this.handled = false;
  }

  continue() {
    this.handled = false;
  }

  handle() {
    this.handled = true;
  }
}
