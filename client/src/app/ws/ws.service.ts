import { Injectable } from '@angular/core';
import { webSocket } from "rxjs/webSocket";

@Injectable({
  providedIn: 'root'
})
export class WSService {
  subject = webSocket("ws://localhost:8080");

  constructor() {
    this.subject.subscribe((data) => console.log(data))
  }
}
