import { loginfo } from '../index'
import Game from './game'
import Player from './player'

export default class Socket {
    isRoom(games, room) {
        for (var i = 0; i < games.length ; i++) {
            if (games[i].room == room) {
            return i;
            }
        }
        return (-1);
    }

    initEngine(games, io) {
        io.sockets.on('connection', (socket) => {
            loginfo("Socket connected: " + socket.id)

            socket.on('room', (room, username) => {
                socket.username = username;
                socket.room = room;
                const player = new Player (username, socket.id);
                let is_room = this.isRoom (games, room);
                if (is_room >= 0 && games[is_room].running == false) {
                    games[is_room].add_player(player);
                    socket.emit('message', 'Welcome to the game #' + socket.room + ' ' + socket.username + ' !');
                    io.sockets.in(room).emit('message', socket.username + ' has joined the game folks !');
                    socket.join(room);
                    io.sockets.in(room).emit('players_game', games[is_room].players.length, games[is_room].leader.name);
                }
                else if (is_room >= 0 && games[is_room].running == true) {
                    socket.emit('message', 'The game is currently running - impossible to join !');
                }
                else {
                    let game = new Game (player, room);
                    games.push(game);
                    socket.emit('message', 'Welcome to the game #' + socket.room + ' ' + socket.username + ' !');
                    socket.join(room);
                }

                socket.on('disconnect', () => {
                    loginfo("Socket disconnected: " + socket.id)
                    socket.leave(room);
                    games[this.isRoom (games, room)].remove_player(player);
                    if (games[this.isRoom (games, room)].players.length > 0) {
                    io.sockets.in(room).emit('message', socket.username + ' has left the game');
                    io.sockets.in(room).emit('players_game', games[this.isRoom (games, room)].players.length, games[this.isRoom (games, room)].leader.name);
                    }
                    else {
                    games.splice(this.isRoom (games, room), 1);
                    }
                });
            })
        })
    }
}