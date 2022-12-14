import {WebSocket} from "ws";
import {Car} from "./car";
import {TrafficLight} from "./traffic-light";

export class Party {
  sender: WebSocket | undefined
  router: WebSocket | undefined

  messageHistory: string[] = []

  id: string = ""

  state: "wait" | "play" = "wait"

  protected cars: Car[] = []
  protected drivenCars: Car[] = []

  protected traffics_lights : TrafficLight[] = []

  constructor(role: string, client: WebSocket, id : string) {
    if (role === "SENDER")
      this.setSender(client)
    if (role === "ROUTER")
      this.setRouter(client)
    this.setId(id)
    this.sendToPlayers({id, role, type: "id"})
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

  message({msg, from}: {msg: string, from: string}) {
    this.messageHistory.push(msg)
    this.sendToPlayers({msg, from, type: "msg"})
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

  sendCar({from}: {from: direction}) {
    const car = this.cars.pop()
    if (car) {
      car.drive = true
      car.direction = from
      this.drivenCars.push(car)
    }
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

  sendToPlayers(data: object) {
    this.sender && this.sender.send(JSON.stringify(data))
    this.router && this.router.send(JSON.stringify(data))
  }

  private setId(id: string) {
    this.id = id
  }

  private play() {
    this.addCars(4)
    this.addTrafficsLights(4)
    this.sendToPlayers({
      type: "cars",
      cars: this.cars
    })
  }
}