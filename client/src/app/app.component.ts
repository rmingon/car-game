import {Component, OnInit} from '@angular/core';
import {WSService} from "./ws/ws.service";
import {TrafficLightEvent} from "./models/trafficLightType";
import {take} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  type = ""
  constructor(private readonly wsService: WSService) {}

  ngOnInit(): void {

  }

  newGame() {
    this.wsService.ws.next({
      command: 'NEW_GAME',
      role: this.type
    })
  }

  join() {
    this.wsService.wsSubject.next({
      command: 'JOIN'
    })
  }

  setTrafficEvent(event: TrafficLightEvent) {
    this.wsService.wsSubject.next({
      command: "COMMAND",
      func: "setTrafficLight",
      arg: event
    })
    console.log(event)
  }
}
