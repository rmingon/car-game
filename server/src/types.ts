export type direction = "top" | "right" | "bottom" | "left"

export interface Area {
  TL: [number, number],
  TR: [number, number],
  BL: [number, number],
  BR: [number, number],
}

export interface Position {
  TL: [number, number],
  BR: [number, number],
}