const Game = require('./game');
const Player = require('./player');
const Games = require('./games');
const socketIO = require('socket.io');

class Socket {
    constructor(http) {
        this.games = new Games();
        this.io = socketIO(http, { pingTimeout: 60000 });
    }

    isRoom(games, room) {
        for (var i = 0; i < games.length ; i++) {
            if (games[i].room == room) {
            return i;
            }
        }
        return (-1);
    }

    initEngine() {
        // TO DO fix bug when player has same name same room
        this.io.sockets.on('connection', (socket) => {
            process.stdout.write("Socket connected: " + socket.id + '\n');
            socket.once('room', (room, username) => {
                socket.username = username;
                socket.room = room;
                const player = new Player (username, socket.id);
                let is_room = this.isRoom (this.games.games, room);
                if (is_room >= 0 && this.games.games[is_room].running == false) {
                    // this.games[is_room].add_player(player);
                    this.games.add_player_to_game(player, this.games.games[is_room]);
                    socket.emit('message', 'Welcome to the game #' + socket.room + ' ' + socket.username + ' !');
                    this.io.sockets.in(room).emit('message', socket.username + ' has joined the game folks !');
                    socket.join(room);
                    this.io.sockets.in(room).emit('players', this.games.games[is_room].leader.name, this.games.games[is_room].players);
                }
                else if (is_room >= 0 && this.games.games[is_room].running == true) {
                    socket.emit('isRunning')
                }
                else {
                    // let game = new Game (player, room);
                    // this.games.push(game);
                    this.games.create_game(player, room)
                    socket.emit('message', 'Welcome to the game #' + socket.room + ' ' + socket.username + ' !');
                    socket.join(room);
                }
                // TO DO function to leave the room
                if(this.io.sockets.adapter.rooms[room]['sockets'][socket.id] !== undefined) {
                    socket.on('disconnect', () => {
                        process.stdout.write("Socket disconnected: " + socket.id + '\n');
                        socket.leave(room);
                        const {curGame, winner } = this.games.player_leaving(this.isRoom(this.games.games, room), player)
                        // const curGame = this.games.games[this.isRoom(this.games.games, room)];
                        // if (curGame !== undefined) {
                            // curGame.remove_player(player);
                            if (curGame.players.length > 0) {
                                this.io.sockets.in(room).emit('message', socket.username + ' has left the game');
                                // let winner = curGame.check_winner();
                                if (winner && curGame.running === true) {
                                    // winner.win();
                                    // curGame.end_game();
                                    this.io.sockets.in(room).emit('win', winner);
                                    this.io.sockets.in(room).emit('players', this.games.games[this.isRoom (this.games.games, room)].leader.name, this.games.games[this.isRoom (this.games.games, room)].players);
                                }
                                else {
                                    this.io.sockets.in(room).emit('players', this.games.games[this.isRoom (this.games.games, room)].leader.name, this.games.games[this.isRoom (this.games.games, room)].players);
                                }
                            }
                            else {
                                this.games.games.splice(this.isRoom (this.games.games, room), 1);
                            }
                        // }
                    });
                }
                socket.emit('player', player);
                socket.on('collision', (player, room) => {
                    // const curGame = this.games.games[this.isRoom(this.games.games, room)];
                    // curGame.update_player(player);
                    const { curGame, need_refill } = this.games.collision(this.isRoom(this.games.games, room), player)
                    this.io.sockets.in(room).emit('players', curGame.leader.name, curGame.players);
                    // if (curGame.check_tetriminos(player)) {
                        // curGame.add_tetriminos();
                    if (need_refill) {
                        this.io.sockets.in(room).emit('refill', curGame.tetriminos);
                    }
                });
                socket.on('game_over', (player, room) => {
                    // const curGame = this.games.games[this.isRoom(this.games.games, room)];
                    // curGame.game_over_player(player);
                    // let winner = curGame.check_winner();
                    // if (winner) {
                    //     winner.win();
                    //     this.io.sockets.in(room).emit('win', winner.name + ' won the game !', winner);
                    // }
                    const { curGame, winner } = this.games.game_over(this.isRoom(this.games.games, room), player);
                    if (winner) {
                        this.io.sockets.in(room).emit('win', winner);
                    }
                    this.io.sockets.in(room).emit('players', curGame.leader.name, curGame.players);
                });
                socket.on('smash', (player, room) => {
                    // const curGame = this.games.games[this.isRoom(this.games.games, room)];
                    // curGame.freeze_players(player);
                    const curGame = this.games.smash_player(this.isRoom(this.games.games, room), player)
                    this.io.sockets.in(room).emit('players', curGame.leader.name, curGame.players);
                    socket.broadcast.to(room).emit('freeze');
                });
            });
            socket.on('start', room => {
                // const curGame = this.games.games[this.isRoom(this.games.games, room)];
                const curGame = this.games.start_one_game(this.isRoom(this.games.games, room))
                // curGame.start_game();
                // curGame.init_players_tetriminos();
                this.io.sockets.in(room).emit('players', curGame.leader.name, curGame.players);
                this.io.sockets.in(room).emit('refill', curGame.tetriminos);
                this.io.sockets.in(room).emit('start_game');
                // curGame.update_players_round();
            });
            socket.on('end', room => {
                // this.games.games[this.isRoom(this.games.games, room)].end_game();
                this.games.end_one_game(this.isRoom(this.games.games, room))

            });
            socket.on('reset', room => {
                // this.games.games[this.isRoom(this.games.games, room)].reset_game();
                this.games.reset_one_game(this.isRoom(this.games.games, room))
                this.io.sockets.in(room).emit('restart_game', this.games.games[this.isRoom (this.games.games, room)].players);
            });
        });
    }
}

module.exports = Socket;