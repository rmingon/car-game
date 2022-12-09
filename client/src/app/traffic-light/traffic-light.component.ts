import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TrafficLightEvent} from "../models/trafficLightType";

@Component({
  selector: 'app-traffic-light',
  template: `<div class="flex flex-col">
      <span class="bg-red-500 h-4 w-4 rounded-full" (click)="setRed()"></span>
      <span class="bg-green-500 h-4 w-4 rounded-full" (click)="setGreen()"></span>
    </div>`
})
export class TrafficLightComponent {

  @Input() number: number = 0
  @Input() state: "red" | "green" = "red"
  @Output() traffic = new EventEmitter<TrafficLightEvent>();

  setRed() {
    this.traffic.emit({state: "red", position: this.number})
  }

  setGreen() {
    this.traffic.emit({state: "green", position: this.number})
  }

}
