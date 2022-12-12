import {Component, OnInit} from '@angular/core';
import {WSService} from "../ws/ws.service";
import {Car} from "../models/action";

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars: Car[] = []

  constructor(private readonly wsService: WSService) {}

  ngOnInit() {
    this.wsService.cars?.subscribe(cars => {
      console.log(cars)
      this.cars = cars.cars
    })
  }

}
