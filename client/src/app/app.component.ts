import {Component, OnInit} from '@angular/core';
import {WSService} from "./ws/ws.service";
import {TrafficLightEvent} from "./models/trafficLightType";
import {filter, take} from "rxjs";
import {Cars} from "./models/action";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  type = ""
  constructor(public readonly wsService: WSService) {}

  ngOnInit(): void {
    this.wsService.ws
    // @ts-ignore
      .pipe(filter<Cars>(el => el.type==="cars"))
      .subscribe((cars: Cars) => {
        console.log(cars)
      })
  }

  setTrafficEvent(event: TrafficLightEvent) {
    this.wsService.ws.next({
      command: "COMMAND",
      func: "setTrafficLight",
      arg: event,
      id: this.wsService.id
    })
  }


}
