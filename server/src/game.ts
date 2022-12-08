import {WebSocket} from "ws";
import {Car} from "./car";
import {TrafficLight} from "./traffic-light";

export class Game {
  sender: WebSocket | undefined
  router: WebSocket | undefined

  id: string

  state: "wait" | "play" = "wait"

  protected cars: Car[] = []
  protected traffics_lights : TrafficLight[] = []

  constructor(role: string, client: WebSocket, id : string) {
    if (role === "SENDER")
      this.setSender(client)
    if (role === "ROUTER")
      this.setRouter(client)
    this.addCars(4)
    this.id = id
  }

  setSender(client: WebSocket): Game {
    this.sender = client
    this.sender.emit('rr',{id:this.id})
    return this
  }

  setRouter(client: WebSocket): Game {
    this.router = client
    return this
  }

  addTrafficsLights(nb: number): Game {
    for(let i = 0; i <= nb; i++) {
      this.addTrafficLight()
    }
    return this
  }

  addTrafficLight(): Game {
    this.traffics_lights.push(new TrafficLight())
    return this
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

  setTrafficLight({state, position}: {state: string, position: number}) {
    console.log(state, position)
  }

  getCars() : Car[] {
    return this.cars
  }

  getCar(index: number) : Car | undefined {
    return this.cars.at(index)
  }

}