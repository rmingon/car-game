export type role = "SENDER" | "ROLE"

interface sendCarEvent {
  direction: string;
}

interface Action {
  type: string
}

interface Car {
  x: number;
  y: number;
  speed: number;
  type: string;
  img: string;
}

interface Cars extends Action {
  cars: Car[]
}

interface Connect extends Action {
  id: string
  role: role
}

interface Need {
  id: string,
  need: role
}

interface Needs extends Action {
  number_parties: number,
  needs: Need[]
}

interface Messages extends Action {
  msg: string,
  from: string
}
