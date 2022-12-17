import {WebSocket} from "ws";
import {Car} from "./car";
import {TrafficLight} from "./traffic-light";
import {Area, direction, Position} from "./types";

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
    setInterval(this.sendFrame.bind(this), 500)
    // setInterval(this.checkForColision.bind(this), 500)
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

  sendCar({direction}: {direction: direction}) {
    const car = this.cars.pop()
    if (car) {
      car.roll(direction)
      this.drivenCars.push(car)
    }
    this.sendToPlayers({
      type: "cars",
      cars: this.getCars()
    })
  }

  setTrafficLight({state, position}: {state: "red" | "green", position: number}) {
    this.traffics_lights[position].state = state
    this.sendToPlayers({
      type: "trafficLight",
      trafficsLight: this.traffics_lights
    })
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

  rollCar() : Car[] {
    this.drivenCars.map(car => {
      car.move()
    })
    return this.drivenCars
  }

  sendFrame() {
    this.sendToPlayers({
      type: 'rollCars',
      cars: this.rollCar()
    })
    this.checkForColision()
  }

  hitboxChecker(first: Position, second: Position) : boolean {
    if (
      (first.TL[1] < second.BR[1]) && (first.TL[1] > second.TL[1]) &&
      (first.TL[0] < second.BR[0]) && (first.TL[0] > second.TL[0])
    ) {
      return true
    }
    return false
  }

  checkForColision() {
    const rollCars = this.rollCar()
    rollCars.forEach(car => {
      const hitBox = car.getHitBox()
      const rollCarsWithoutHerself = rollCars.filter(car => JSON.stringify(car.getHitBox()) !== JSON.stringify(hitBox)) // remove herself
      rollCarsWithoutHerself.forEach(car => {
        const asColision = this.hitboxChecker(hitBox, car.getHitBox())
        if (asColision)
          rollCars.forEach(car => car.stop())
      })
    })
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