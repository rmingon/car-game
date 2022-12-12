import {Component, OnInit} from '@angular/core';
import {WSService} from "../ws/ws.service";
import {Messages} from "../models/action";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  msg: string = ""
  messages: Messages[] = []

  constructor(private readonly wsService: WSService) {}

  ngOnInit() {
    this.wsService.messages?.subscribe(msg => {
      console.log(msg)
      this.messages.push(msg)
    })
  }

  sendMessage() {
    this.wsService.ws.next({
      command: "COMMAND",
      id: this.wsService.id,
      func: "message",
      arg: {from: this.wsService.role, msg: this.msg }
    })
    this.msg = ""
  }

}
