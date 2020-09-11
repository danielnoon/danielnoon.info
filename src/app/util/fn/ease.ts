import { bezier } from "../BezierEasing";

export function easeInOutSine(x: number) {
  return -(Math.cos(Math.PI * x) - 1) / 2;
}

export const materialEasing = bezier(0.4, 0.0, 0.2, 1);
