import { Component } from '@angular/core';
import {WSService} from "../ws/ws.service";
import {filter} from "rxjs";
import {Need, Needs} from "../models/action";

@Component({
  selector: 'app-need-party',
  templateUrl: './need-party.component.html'
})
export class NeedPartyComponent {
  needs: Need[] | undefined

  constructor(public readonly wsService: WSService) {
    this.wsService.ws
    // @ts-ignore
      .pipe(filter<Needs>((el) => el.type === "needs"))
      .subscribe((next: Needs) => {
        this.needs = next.needs
      })
  }
}
