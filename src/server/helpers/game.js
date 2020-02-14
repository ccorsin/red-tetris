import Player from "./player"

export default class Game {
    constructor(player, room) {
        this.leader = player
        this.room = room
        this.players = []
        this.players.push(player)
        this.running = false
    }

    add_player(player) {
        this.players.push(player)
    }

    remove_player(player) {
        let index = this.players.findIndex(p => p.id === player.id);
        if (index > -1) {
            this.players.splice(index, 1);        
        }
        if (player = this.leader) {
            this.leader = this.players[0]
        }
    }

    start_game() {
        this.running = true
    }

    end_game() {
        this.running = false
    }
}