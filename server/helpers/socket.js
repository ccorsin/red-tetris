const Game = require('./game');
const Player = require('./player');
const socketIO = require('socket.io');

class Socket {
    constructor(http) {
        this.games = [];
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
        this.io.sockets.on('connection', (socket) => {
            process.stdout.write("Socket connected: " + socket.id + '\n');
            socket.on('room', (room, username) => {
                socket.username = username;
                socket.room = room;
                const player = new Player (username, socket.id);
                let is_room = this.isRoom (this.games, room);
                if (is_room >= 0 && this.games[is_room].running == false) {
                    this.games[is_room].add_player(player);
                    socket.emit('message', 'Welcome to the game #' + socket.room + ' ' + socket.username + ' !');
                    this.io.sockets.in(room).emit('message', socket.username + ' has joined the game folks !');
                    socket.join(room);
                    this.io.sockets.in(room).emit('players_game', this.games[is_room].leader.name, this.games[is_room].players);
                }
                else if (is_room >= 0 && this.games[is_room].running == true) {
                    socket.emit('isRunning', 'The game is currently running - impossible to join !');
                }
                else {
                    let game = new Game (player, room);
                    this.games.push(game);
                    socket.emit('message', 'Welcome to the game #' + socket.room + ' ' + socket.username + ' !');
                    socket.join(room);
                }
                socket.on('disconnect', () => {
                    process.stdout.write("Socket disconnected: " + socket.id + '\n');
                    socket.leave(room);
                    this.games[this.isRoom (this.games, room)].remove_player(player);
                    if (this.games[this.isRoom (this.games, room)].players.length > 0) {
                    this.io.sockets.in(room).emit('message', socket.username + ' has left the game');
                    this.io.sockets.in(room).emit('players_game', this.games[this.isRoom (this.games, room)].leader.name, this.games[this.isRoom (this.games, room)].players);
                    }
                    else {
                    this.games.splice(this.isRoom (this.games, room), 1);
                    }
                });
                socket.emit('player', player);
                socket.on('collision', (player, room) => {
                    const curGame = this.games[this.isRoom(this.games, room)];
                    let updatedPlayer = curGame.update_player(player);
                    if (curGame.check_tetriminos(player)) {
                        curGame.add_tetriminos();
                        // refill
                        this.io.sockets.in(room).emit('refill', curGame.tetriminos);
                    }
                    this.io.sockets.in(room).emit('players', curGame.players);
                    socket.emit('player', updatedPlayer);
                });
                socket.on('game_over', (player, room) => {
                    console.log("GAME OVER")
                    const curGame = this.games[this.isRoom(this.games, room)];
                    let updatedPlayer = curGame.game_over_player(player);
                    socket.emit('player', updatedPlayer);
                    this.io.sockets.in(room).emit('players', curGame.players);
                });
                socket.on('smash', (player, room) => {
                    console.log('smash')
                    const curGame = this.games[this.isRoom(this.games, room)];
                    curGame.freeze_players(player);
                    this.io.sockets.in(room).emit('freeze', player);
                });
            });
            socket.on('start', room => {
                const curGame = this.games[this.isRoom(this.games, room)];
                curGame.start_game();
                curGame.init_player_round();
                this.io.sockets.in(room).emit('refill', curGame.tetriminos);
                this.io.sockets.in(room).emit('toggle_game', true);
            });
            socket.on('end', room => {
                this.games[this.isRoom(this.games, room)].end_game();
                this.io.sockets.in(room).emit('toggle_game', false);
            });
        });
    }
}

module.exports = Socket;