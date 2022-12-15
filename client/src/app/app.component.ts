import {Component, OnInit} from '@angular/core';
import {WSService} from "./ws/ws.service";
import {TrafficLightEvent} from "./models/trafficLightType";
import {sendCarEvent} from "./action";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  type = ""
  constructor(public readonly wsService: WSService) {}

  ngOnInit(): void {

  }

  setTrafficEvent(event: TrafficLightEvent) {
    this.wsService.ws.next({
      command: "COMMAND",
      func: "setTrafficLight",
      arg: event,
      id: this.wsService.id
    })
  }

  setCarEvent(event: sendCarEvent) {
    console.log(event)
    this.wsService.ws.next({
      command: "COMMAND",
      func: "sendCar",
      arg: event,
      id: this.wsService.id
    })
  }


}
