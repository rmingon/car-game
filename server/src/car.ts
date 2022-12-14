const TYPE_OF_VEHICULE = <const>["truck", "car"]

export class Car {
  x: number = 100
  y: number = 50
  speed: number = 10
  type: "truck" | "car" = "car"
  direction: direction = "top"
  drive: boolean = false

  constructor() {
    this.type = TYPE_OF_VEHICULE[Math.floor(Math.random() * TYPE_OF_VEHICULE.length)]
  }

}
