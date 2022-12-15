const TYPE_OF_VEHICULE = <const>["truck", "car"]
import {direction} from "./types";

export class Car {
  x: number = 0
  y: number = 0
  rotation: number = 0
  speed: number = 0
  type: "truck" | "car" = "car"
  direction: direction = "top"
  drive: boolean = false

  private _move = {
    top: () => {
      this.y += 1 * this.speed
    },
    right: () => {
      this.x -= 1 * this.speed
    },
    bottom: () => {
      this.y -= 1 * this.speed
    },
    left: () => {
      this.x += 1 * this.speed
    }
  }

  private _position = {
    top: () => {
      this.rotation = 180
      this.x = 200
    },
    right: () => {
      this.rotation = 90
      this.y = 200
      this.x = 400
    },
    bottom: () => {
      this.rotation = 0
      this.y = 400
      this.x = 200
    },
    left: () => {
      this.rotation = 270
      this.y = 180
    },
  }

  constructor() {
    this.type = TYPE_OF_VEHICULE[Math.floor(Math.random() * TYPE_OF_VEHICULE.length)]
  }

  roll(direction: direction) {
    this.direction = direction
    this._position[direction]()
    this.drive = true
    this.speed = 2
  }

  stop() {
    this.drive = false
    this.speed = 0
  }

  move() {
    this._move[this.direction]()
  }
}
