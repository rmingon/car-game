import { Injectable } from '@angular/core';
import { webSocket } from "rxjs/webSocket";
import {filter, map, Observable, Subject, Subscribable} from "rxjs";

interface Data {
  id: string
}

interface Needs {
  type: string,
  needs: object[],
  number_parties: number,
}

@Injectable({
  providedIn: 'root'
})
export class WSService {
  ws = webSocket<object>("ws://localhost:8080");
  wsSubject = new Subject<object>()
  id: string = ""

  needs: Observable<object> // TODO type needs

  constructor() {
    this.ws.subscribe((data) => {
      // console.log(data)
      // @ts-ignore
      if (data?.id) {
        // @ts-ignore
        this.id = data?.id
      }
    })

    this.needs = this.ws.pipe(filter(el => el.hasOwnProperty('needs')))

    this.wsSubject.subscribe((data) => {
      const dataWithId = {...data, id: this.id}
      this.ws.next(dataWithId)
    })
  }
}
