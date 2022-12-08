import { Component } from '@angular/core';
import {WSService} from "./ws/ws.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  constructor(private readonly wsService: WSService) {
  }
}
