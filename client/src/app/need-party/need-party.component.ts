import { Component } from '@angular/core';
import {WSService} from "../ws/ws.service";


@Component({
  selector: 'app-need-party',
  templateUrl: './need-party.component.html'
})
export class NeedPartyComponent {
  constructor(private readonly wsService: WSService) {
    this.wsService.needs.subscribe(next => {
      console.log(next)
    })
  }
}
