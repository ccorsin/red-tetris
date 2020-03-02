const Tetriminos = require('./tetriminos');

class Game {
    constructor(player, room) {
        this.leader = player;
        this.room = room;
        this.players = [];
        this.players.push(player);
        this.running = false;
        this.tetriminos = [];
    }

    isPlayer(players, player) {
        for (let i = 0; i < players.length; i++) {
            if (players[i].id == player.id) {
              return i;
            }
        }
        return -1;
    }

    init_player_round() {
      for (let i = 0; i < this.players.length; i++) {
        this.players[i].add_round();
      }
      // en generer en avance sinon bug - a resoudre peut etre mieux
      for (let i = 0; i < 5; i++) {
        this.add_tetriminos();
      }
    }

    // distribuer freeze
    freeze_players(player) {
        for (let i = 0; i < this.players.length; i++) {
            if (i != this.isPlayer(this.players, player)) {
              this.players[i].add_freeze();
            }
            else {
              this.players[i].remove_line();
            }
        }
    }

    update_player(player) {
      this.players[this.isPlayer(this.players, player)].add_round();
      if ((19 - player.player.pos.y) > this.players[this.isPlayer(this.players, player)].line) {
        this.players[this.isPlayer(this.players, player)].set_line(player.player.pos.y);
      }
    }

    game_over_player(player) {
      this.players[this.isPlayer(this.players, player)].lose();
    }

    clear_tetriminos() {
        let min = this.players[0].round;
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].round < min) {
                min = this.players[i].round;
            }
        }
        for (let i = 0; i < this.players.length; i++) {
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

    check_winner() {
      let win = 0;
      let winner;
      for (var i = 0; i < this.players.length; i++) {
        if (!this.players[i].loser) {
          win += 1;
          winner = this.players[i];
        };
      }
      if (win == 1) {
        return winner;
      }
      else {
        return false;
      }
    }

    reset_game() {
      const new_leader = this.leader.reset_player();
      this.leader = new_leader;
      const new_players = this.players.map(function(p) { 
        p = p.reset_player(); 
        return p;
      });
      this.players = new_players;
      this.tetriminos = [];
    }
  }
module.exports = Game;
