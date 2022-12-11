import {Party} from "./party";
import {makeId} from "./utils";
import {WebSocket} from "ws";

class Game {
  parties = new Map<String, Party>()

  newGame(role: "SENDER" | "ROUTER", ws: WebSocket) {
    const id = makeId(8)
    this.parties.set(id, new Party(role, ws, id))
    this.news()
  }

  join(id: string, ws: WebSocket) {
    (this.parties.get(id))?.join(ws)
    this.news()
  }

  command(id: string, func: keyof Party, arg: object) {
    if (!this.parties.has(id))
      throw "ERROR";
    // @ts-ignore
    (this.parties.get(id))[func](arg)
  }

  partyNeeds() : object[] {
    let needs: object[] = [] // TODO needs interface
    this.parties.forEach(party => {
      if (party.needPlayer()) {
        needs.push({
          need: party.roleNeed(),
          id: party.id
        })
      }
    })
    return needs
  }

  news() {
    this.parties.forEach(party => {
      party.sendToPlayers({
        party_number: this.partyNumber(),
        party_needs: this.partyNeeds()
      })
    })
  }

  partyNumber() : number {
    return this.parties.size
  }
}

// Singleton
export default new Game()