export type role = "SENDER" | "ROLE"

interface sendCarEvent {
  direction: string;
}

interface Action {
  type: string
}

export interface Car {
  x: number;
  y: number;
  speed: number;
  type: string;
  img: string;
}

export interface Cars extends Action {
  cars: Car[]
}

export interface Connect extends Action {
  id: string
  role: role
}

export interface Need {
  id: string,
  need: role
}

export interface Needs extends Action {
  number_parties: number,
  needs: Need[]
}

export interface Messages extends Action {
  msg: string,
  from: string
}
