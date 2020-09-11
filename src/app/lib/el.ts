export function els<T extends HTMLElement>(
  selector: string,
  on?: HTMLElement
): T[] {
  return Array.from((on || document).querySelectorAll<T>(selector));
}

export function el<T extends HTMLElement>(
  selector: string,
  on?: HTMLElement
): T {
  return (on || document).querySelector<T>(selector)!;
}
