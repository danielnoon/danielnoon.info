import { bezier } from "./BezierEasing.js";

export function easeInOutSine(x) {
  return -(Math.cos(Math.PI * x) - 1) / 2;
}

export const materialEasing = bezier(0.4, 0.0, 0.2, 1);
