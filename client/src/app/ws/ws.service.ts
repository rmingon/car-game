import {Injectable, OnInit} from '@angular/core';
import { webSocket } from "rxjs/webSocket";
import {filter, map, Observable, pipe, Subject, Subscribable} from "rxjs";
import {Id, Needs} from "../models/action";

@Injectable({
  providedIn: 'root'
})
export class WSService implements OnInit {
  ws = webSocket<object>("ws://localhost:8080");
  id: string = ""

  constructor() {}

  join(id: string) {
    this.id = id
    this.ws.next({
      command: 'JOIN',
      id
    })
  }

  ngOnInit(): void {
    this.ws
      // @ts-ignore
      .pipe(filter<Id>((el => el.type === 'id')))
      .subscribe((next: Id) => {
        this.id = next.id
    })
  }

  newGame(type: string) {
    this.ws.next({
      command: 'NEW_GAME',
      role: type
    })
  }
}
