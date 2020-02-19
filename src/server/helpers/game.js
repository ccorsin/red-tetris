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
                   this.playerStates = [];
                   this.playerGhosts = [];
                 }

                 isPlayer(players, player) {
                   for (var i = 0; i < players.length; i++) {
                     if (players[i] == player) {
                       return i;
                     }
                   }
                   return -1;
                 }

                 // nb of tetriminos players collided
                 update_playerState(player) {
                   this.playerStates[this.isPlayer(this.players, player)] += 1;
                 }

                 clear_tetriminos() {
                    function minValue(arr) {
                        let min = arr[0];

                        for (let val of arr) {
                            if (val < min) {
                                min = val;
                            }
                        }
                        return min;
                    }
                    let doneTetri = minValue(this.playerStates);
                    for (var i = 0; i < players.length; i++) {
                        this.playerStates[i] -= doneTetri;
                    }
                    this.tetriminos.splice(0, this.tetriminos.length - doneTetri);
                 }

                 check_tetriminos(player) {
                    // count tetriminos // playerState
                    if (this.playerStates[this.isPlayer(this.players, player)] == this.tetriminos.length) {
                        // clear tetriminos
                        this.clear_tetriminos();
                        return true;
                    }
                    return false;
                 }

                 // contains list of tetriminos
                 add_tetriminos() {
                   // generate random tetriminos
                   const tetromino = Tetriminos.randomTetromino();
                   this.tetriminos.push(tetromino);
                 }

                 // playerGhosts

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