import { WebSocketServer } from 'ws';
import {makeId} from "./utils";
import {Game} from "./game";

const wss = new WebSocketServer({ port: 8080 });

const party = new Map()

wss.on('connection', function connection(ws) {
  ws.on('message', function message(message) {
    try {
      let data = JSON.parse(message.toString())
      if (data.command === "NEW_GAME") {
        const id = makeId(8)
        party.set(id, new Game(data.role, ws, id))
      }
      if (data.command === "JOIN")
        (party.get(data.id)).join(ws)
      if (data.command === "COMMAND")
        (party.get(data.id))[data.func](data.arg)
    } catch (e) {
      console.error(e)
    }
  })
});