const TYPE_OF_VEHICULE = <const>["truck", "car"]
import {direction} from "./types";

export class Car {
  x: number = 0
  y: number = 0
  speed: number = 0
  type: "truck" | "car" = "car"
  direction: direction = "top"
  drive: boolean = false

  constructor() {
    this.type = TYPE_OF_VEHICULE[Math.floor(Math.random() * TYPE_OF_VEHICULE.length)]
  }

  roll(direction: direction) {
    this.direction = direction
    this.drive = true
    this.speed = 10
  }

  stop() {
    this.drive = false
    this.speed = 10
  }
}
