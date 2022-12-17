const TYPE_OF_VEHICULE = <const>["truck", "car"]
import {Area, direction, Position} from "./types";

const SPEED_BY_VEHICULE = {
  truck: 3,
  car: 5
}
const SIZE_BY_VEHICULE :  { [k: string]: [number, number] } = {
  truck: [22, 50], // DEPEND IF CAR UP AND DOWN OR LEFT AND RIGHT
  car: [18, 40]
}

export class Car {
  x: number = 0
  y: number = 0
  width: number = 0
  height: number = 0
  rotation: number = 0
  speed: number = 0
  type: "truck" | "car" = "car"
  direction: direction = "top"
  drive: boolean = false
  area: Area | undefined

  private _move = {
    top: () => {
      this.y += Math.round(1 * this.speed)
    },
    right: () => {
      this.x -= Math.round(1 * this.speed)
    },
    bottom: () => {
      this.y -= Math.round(1 * this.speed)
    },
    left: () => {
      this.x += Math.round(1 * this.speed)
    }
  }

  private _position = {
    top: () => {
      this.rotation = 0
      this.x = 166
    },
    right: () => {
      this.rotation = 90
      this.y = 170
      this.x = 370
    },
    bottom: () => {
      this.rotation = 180
      this.y = 400
      this.x = 195
    },
    left: () => {
      this.rotation = 270
      this.y = 205
    },
  }

  constructor() {
    this.type = TYPE_OF_VEHICULE[Math.floor(Math.random() * TYPE_OF_VEHICULE.length)]
  }

  roll(direction: direction) {
    this.direction = direction
    this._position[direction]()
    this.drive = true
    if (direction === "top" || direction === "bottom") {
      this.width = SIZE_BY_VEHICULE[this.type][0]
      this.height = SIZE_BY_VEHICULE[this.type][1]
    } else {
      this.width = SIZE_BY_VEHICULE[this.type][1]
      this.height = SIZE_BY_VEHICULE[this.type][0]
    }
    this.speed = SPEED_BY_VEHICULE[this.type]
  }

  stop() {
    this.drive = false
    this.speed = 0
  }

  move() {
    this._move[this.direction]()
  }

  getHitBox() : Position {
    return {
      TL: [this.x, this.y],
      BR: [this.x + this.width, this.y + this.height]
    }
  }
}
