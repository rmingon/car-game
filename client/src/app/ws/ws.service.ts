import { Injectable } from '@angular/core';
import { webSocket } from "rxjs/webSocket";
import {Subject} from "rxjs";

interface Data {
  id: string
}

@Injectable({
  providedIn: 'root'
})
export class WSService {
  ws = webSocket<object>("ws://localhost:8080");
  wsSubject = new Subject<object>()
  id: string = ""

  constructor() {
    this.ws.subscribe((data) => {
      console.log(data)
      // @ts-ignore
      if (data?.id) {
        // @ts-ignore
        this.id = data?.id
      }
    })
    this.wsSubject.subscribe((data) => {
      const dataWithId = {...data, id: this.id}
      this.ws.next(dataWithId)
    })
  }
}
