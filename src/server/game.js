import Player from "./player"

export default class Game {
    constructor(leader, id, room) {
        this.leader = leader
        this.room = room
        this.players = []
        this.players.push(new Player (leader, id))
        this.running = false
    }
    add_player(player, id) {
        this.players.push(new Player (player, id))
    }

    remove_player(player) {
        let index = this.players.indexOf(player)
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

    is_running() {
        this.running
    }

    count_players() {
        this.players.length
    }

    display_players() {
        console.log ("Currently " + this.count_players + " players in the game." )
    }
}