import {WebSocket, WebSocketServer} from 'ws';
import {makeId} from "./utils";
import {Party} from "./party";
import Game from "./game";

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function message(message) {
    try {
      let data = JSON.parse(message.toString())
      if (data.command === "NEW_GAME")
        Game.newGame(data.role, ws)
      if (data.command === "JOIN")
        Game.join(data.id, ws)
      if (data.command === "COMMAND")
        Game.command(data.id, data.func, data.arg)
    } catch (e) {
      ws.send(JSON.stringify({error: e}))
    }
  })

  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({
        type: "needs",
        number_parties: Game.partyNumber(),
        needs: Game.partyNeeds()
      }))
    }
  });
});