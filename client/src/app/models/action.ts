type role = "SENDER" | "ROLE"

interface Action {
  type: string
}

interface Car {
  x: number;
  y: number;
  speed: number;
}

export interface Cars extends Action {
  cars: Car[]
}

export interface Id extends Action {
  id: string
}

export interface Need {
  id: string,
  need: role
}

export interface Needs extends Action {
  number_parties: number,
  needs: Need[]
}
