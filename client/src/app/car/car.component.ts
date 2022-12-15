import {Component, OnInit} from '@angular/core';
import {WSService} from "../ws/ws.service";
import {Car} from "../action";
import {map} from "rxjs";

const VEHICLES_TO_IMG: {[key: string]: string} =  {
  truck: './../../assets/vehicles/white-truck.png',
  car: './../../assets/vehicles/blue-car.png',
}

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars: Car[] = []
  rollCars: Car[] = []

  constructor(private readonly wsService: WSService) {}

  ngOnInit() {
    this.wsService.cars?.subscribe(cars => {
      this.cars = cars.cars
      this.cars.map(car => car.img = VEHICLES_TO_IMG[car.type] )
    })
    this.wsService.roll?.subscribe(cars => {
      this.rollCars = cars.cars
      this.rollCars.map(car => car.img = VEHICLES_TO_IMG[car.type] )
    })
  }

}
