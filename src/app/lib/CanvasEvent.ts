export class CanvasEvent {
  public flags: string[] = [];
  public handled = false;

  constructor(public type: string, public native: Event) {}

  continue() {
    this.handled = false;
  }

  handle() {
    this.handled = true;
  }
}
