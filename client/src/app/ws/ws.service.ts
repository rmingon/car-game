import {Injectable, OnInit} from '@angular/core';
import { webSocket } from "rxjs/webSocket";
import {filter, map, Observable, pipe, Subject, Subscribable} from "rxjs";
import {Cars, Connect, Messages, Needs, role} from "../models/action";

@Injectable({
  providedIn: 'root'
})
export class WSService implements OnInit {
  ws = webSocket<object>("ws://localhost:8080");

  id: string = ""
  role: role | undefined

  cars: Observable<Cars> | undefined

  messages: Observable<Messages> | undefined

  constructor() {

    this.ws.subscribe(next => {
      console.log(next)
    })

    this.ws
      // @ts-ignore
      .pipe(filter<Connect>((el => el.type === 'id')))
      .subscribe((next: Connect) => {
        this.id = next.id
        this.role = next.role
      })

    this.cars = this.ws
      // @ts-ignore
      .pipe(filter<Cars>(el => el.type==="cars"))

    this.messages = this.ws
      // @ts-ignore
      .pipe(filter<Messages>(el => el.type==="msg"))

  }

  join(id: string, role: role) {
    this.id = id
    this.role = role
    this.ws.next({
      command: 'JOIN',
      id
    })
  }

  ngOnInit(): void {

  }

  newGame(type: string) {
    this.ws.next({
      command: 'NEW_GAME',
      role: type
    })
  }
}
