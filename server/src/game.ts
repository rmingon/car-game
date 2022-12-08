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

  addCar() {
    this.cars.push(new Car())
  }

  getCars() {
    return this.cars
  }

  getCar(index: number) {
    return this.cars.at(index)
  }





}