import {WebSocket} from "ws";
import {Car} from "./car";

export class Game {
  sender: WebSocket | undefined
  router: WebSocket | undefined

  protected cars: Car[] = []

  constructor(role: string, client: WebSocket) {
    if (role === "SENDER")
      this.sender = client
    if (role === "ROUTER")
      this.router = client
  }

  addCar(): Game {
    this.cars.push(new Car())
    return this
  }

  addCars(nb: number): Game {
    for(let i = 0; i <= nb; i++) {
      this.addCar()
    }
    return this
  }

  getCars() : Car[] {
    return this.cars
  }

  getCar(index: number) : Car | undefined {
    return this.cars.at(index)
  }

}