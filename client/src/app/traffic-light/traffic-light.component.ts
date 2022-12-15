import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TrafficLightEvent} from "../models/trafficLightType";
import {WSService} from "../ws/ws.service";
import {TrafficLight, TrafficsLights} from "../action";

@Component({
  selector: 'app-traffic-light',
  template: `<div class="flex flex-col">
      <span class="h-4 w-4 rounded-full" [ngClass]="state === 'red' ? 'bg-red-300' : 'bg-red-900'" (click)="setRed()"></span>
      <span class="h-4 w-4 rounded-full" [ngClass]="state === 'red' ? 'bg-green-900' : 'bg-green-300'" (click)="setGreen()"></span>
    </div>`
})
export class TrafficLightComponent implements OnInit {

  @Input() number: number = 0
  @Input() state: "red" | "green" = "red"
  @Output() traffic = new EventEmitter<TrafficLightEvent>();

  constructor(private readonly wsService: WSService) {}

  trafficLight: TrafficLight | undefined

  ngOnInit(): void {
    this.wsService.trafficLight?.subscribe(trafficLights => {
      this.trafficLight = trafficLights.trafficsLight[this.number]
      this.state = this.trafficLight.state
    })
  }

  setRed() {
    this.traffic.emit({state: "red", position: this.number})
  }

  setGreen() {
    this.traffic.emit({state: "green", position: this.number})
  }

}
