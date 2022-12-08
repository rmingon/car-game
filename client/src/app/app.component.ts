import { Component } from '@angular/core';
import {WSService} from "./ws/ws.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  type = ""
  constructor(private readonly wsService: WSService) {}

  newGame() {
    this.wsService.subject.next({ message: 'some message' })
    console.log("new game", this.type)
  }
}
