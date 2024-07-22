/**
 * Slide scroll interfaces
 */

export interface Modifier {
  selector: string,
  property: string,
  start: number,
  end: number,
  unit: string
}

export interface Options {
  el: HTMLElement,
  easing: string,
  slide?: string,
  debug?: boolean,
  modifiers?: Modifier[]
}
