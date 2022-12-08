import { WebSocketServer } from 'ws';
import {makeId} from "./utils";
import {Game} from "./game";

const wss = new WebSocketServer({ port: 8080 });

const party = new Map()

wss.on('connection', function connection(ws) {
  ws.on('message', function message(message) {
    let data = JSON.parse(message.toString())
    if (data.command === "NEW_GAME")
      party.set(makeId(8), new Game(data.role, ws))
    if (data.command === "COMMAND")
      (party.get(data.id))[data.func](...data.arg)
  });
});