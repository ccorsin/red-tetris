import Player from "./player"

export default class Game {
    constructor(leader, id, room) {
        this.leader = new Player (leader, id)
        this.room = room
        this.players = []
        this.players.push(new Player (leader, id))
        this.running = false
    }
    add_player(player, id) {
        this.players.push(new Player (player, id))
    }

    remove_player(player, id) {
        let index = this.players.findIndex(p => p.id === id);
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