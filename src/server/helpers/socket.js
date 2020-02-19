import Game from './game'
import Player from './player'
import socketIO from 'socket.io';

export default class Socket {
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
            process.stdout.write("Socket connected: " + socket.id + '\n')
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
                    this.io.sockets.in(room).emit('players_game', this.games[is_room].players.length, this.games[is_room].leader.name);
                }
                else if (is_room >= 0 && this.games[is_room].running == true) {
                    socket.emit('message', 'The game is currently running - impossible to join !');
                }
                else {
                    let game = new Game (player, room);
                    this.games.push(game);
                    socket.emit('message', 'Welcome to the game #' + socket.room + ' ' + socket.username + ' !');
                    socket.join(room);
                }

                socket.on('disconnect', () => {
                    process.stdout.write("Socket disconnected: " + socket.id + '\n')
                    socket.leave(room);
                    this.games[this.isRoom (this.games, room)].remove_player(player);
                    if (this.games[this.isRoom (this.games, room)].players.length > 0) {
                    this.io.sockets.in(room).emit('message', socket.username + ' has left the game');
                    this.io.sockets.in(room).emit('players_game', this.games[this.isRoom (this.games, room)].players.length, this.games[this.isRoom (this.games, room)].leader.name);
                    }
                    else {
                    this.games.splice(this.isRoom (this.games, room), 1);
                    }
                });
            });
            socket.on('collision', (player, room, line) => {
                console.log(player, room, line)
                //
                // const curGame = games[isRoom(this.games, room)];
                // curGame.update_playerState(player);
                // if (check_tetriminos(player)) {
                //     curGame.add_tetriminos();
                // }
            // emit event that actualize front tetrominos list
            });
            socket.on('start', room => {
                this.games[this.isRoom(this.games, room)].start_game();
                this.io.sockets.in(room).emit('toggle_game', true);
            });
            socket.on('end', room => {
                this.games[this.isRoom(this.games, room)].end_game();
                this.io.sockets.in(room).emit('toggle_game', false);
            });
        })
    }
}