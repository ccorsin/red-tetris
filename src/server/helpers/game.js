import Player from "./player";
import Tetriminos from "./tetriminos"

export default class Game {
    constructor(player, room) {
        this.leader = player;
        this.room = room;
        this.players = [];
        this.players.push(player);
        this.running = false;
        this.tetriminos = [];
        this.playerGhosts = [];
    }

    isPlayer(players, player) {
        for (var i = 0; i < players.length; i++) {
            if (players[i].id == player.id) {
              return i;
            }
        }
        return -1;
    }

    init_player_round() {
      for (var i = 0; i < this.players.length; i++) {
        this.players[i].add_round();
      }    
    }

    update_player_round(player) {
      this.players[this.isPlayer(this.players, player)].add_round();
      return this.players[this.isPlayer(this.players, player)];
    }

    update_player_line(player) {
        this.players[this.isPlayer(this.players, player)].set_line(player.player.pos.y);
        return this.players[this.isPlayer(this.players, player)];
    }

    clear_tetriminos() {
        let min = this.players[0].round;
        for (var i = 0; i < this.players.length; i++) {
            if (this.players[i].round < min) {
                min = this.players[i].round;
            }
        }
        for (var i = 0; i < this.players.length; i++) {
            this.players[i].round -= min;
        }
        this.tetriminos.splice(0, this.tetriminos.length - min);
    }

    check_tetriminos(player) {
      if (this.players[this.isPlayer(this.players, player)].round >= this.tetriminos.length) {
        // TO DO > WHEN FRONT OK then reshape
          // this.clear_tetriminos();
          return true;
      }
      return false;
    }

    add_tetriminos() {
      // generate random tetriminos
      let tetromino = new Tetriminos().randomTetromino();
      this.tetriminos.push(tetromino);
    }

    add_player(player) {
      this.players.push(player);
    }

    remove_player(player) {
      let index = this.players.findIndex(p => p.id === player.id);
      if (index > -1) {
        this.players.splice(index, 1);
      }
      if ((player = this.leader)) {
        this.leader = this.players[0];
      }
    }

    start_game() {
      this.running = true;
    }

    end_game() {
      this.running = false;
    }
    }