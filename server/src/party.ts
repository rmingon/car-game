import {WebSocket} from "ws";
import {Car} from "./car";
import {TrafficLight} from "./traffic-light";

export class Party {
  sender: WebSocket | undefined
  router: WebSocket | undefined

  id: string = ""

  state: "wait" | "play" = "wait"

  protected cars: Car[] = []
  protected traffics_lights : TrafficLight[] = []

  constructor(role: string, client: WebSocket, id : string) {
    if (role === "SENDER")
      this.setSender(client)
    if (role === "ROUTER")
      this.setRouter(client)
    this.addCars(4)
    this.setId(id)
  }

  setSender(client: WebSocket): Party {
    this.sender = client
    this.router && this.play()
    return this
  }

  setRouter(client: WebSocket): Party {
    this.router = client
    this.sender && this.play()
    return this
  }

  roleNeed() {
    return this.sender ? "ROUTER" : "SENDER"
  }

  needPlayer() : boolean {
    if (this.sender && this.router)
      return false
    return true
  }

  public join(ws: WebSocket) {
    this.sender || this.setSender(ws)
    this.router || this.setRouter(ws)
  }

  addTrafficsLights(nb: number): Party {
    for(let i = 0; i <= nb; i++) {
      this.addTrafficLight()
    }
    return this
  }

  addTrafficLight(): Party {
    this.traffics_lights.push(new TrafficLight())
    return this
  }

  addCar(): Party {
    this.cars.push(new Car())
    return this
  }

  addCars(nb: number): Party {
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

  sendToPlayers(data: object | object[]) {
    this.sender && this.sender.send(JSON.stringify(data))
    this.router && this.router.send(JSON.stringify(data))
  }

  private setId(id: string) {
    this.id = id
    this.sendToPlayers({id})
  }

  private play() {
    this.sendToPlayers(this.cars)
  }
}