import fs  from 'fs'
import debug from 'debug'
import Game from "./game"
import { getMaxListeners } from 'cluster'

const logerror = debug('tetris:error')
  , loginfo = debug('tetris:info')

const initApp = (app, params, cb) => {
  const {host, port} = params
  const handler = (req, res) => {
    const file = req.url === '/bundle.js' ? '/../../build/bundle.js' : '/../../index.html'
    fs.readFile(__dirname + file, (err, data) => {
      if (err) {
        logerror(err)
        res.writeHead(500)
        return res.end('Error loading index.html')
      }
      res.writeHead(200)
      res.end(data)
    })
  }

  app.on('request', handler)

  app.listen({host, port}, () =>{
    loginfo(`tetris listen on ${params.url}`)
    cb()
  })
}

const isRoom = (games, room) => {
  for (var i = 0; i < games.length ; i++) {
    if (games[i].room == room) {
      return i;
    }
  }
  return (-1);
}

const initEngine = (io, games) => {
  io.sockets.on('connection', function(socket){
    loginfo("Socket connected: " + socket.id)
    socket.on('room', (room, username) => {
      socket.username = username;
      socket.room = room;
      let is_room = isRoom (games, room);
      if (is_room >= 0 && games[is_room].running == false) {
        games[is_room].add_player(username, socket.id);
        socket.emit('message', 'Welcome to the game #' + socket.room + ' ' + socket.username + ' !');
        io.sockets.in(room).emit('message', socket.username + ' has joined the game folks !');
        socket.join(room);
        io.sockets.in(room).emit('players_game', games[is_room].players.length, games[is_room].leader.name);
      }
      else if (is_room >= 0 && games[is_room].running == true) {
        socket.emit('message', 'The game is currently running - impossible to join !');
      }
      else {
        let game = new Game (username, socket.id, room);
        games.push(game);
        socket.emit('message', 'Welcome to the game #' + socket.room + ' ' + socket.username + ' !');
        socket.join(room);
      }
      socket.on('disconnect', function(){
        loginfo("Socket disconnected: " + socket.id)
        socket.leave(room);
        games[isRoom (games, room)].remove_player(username, socket.id);
        if (games[isRoom (games, room)].players.length > 0) {
          io.sockets.in(room).emit('message', socket.username + ' has left the game');
          io.sockets.in(room).emit('players_game', games[isRoom (games, room)].players.length, games[isRoom (games, room)].leader.name);
        }
        else {
          games.splice(isRoom (games, room), 1);
        }
      });
    });
    socket.on('start', room => {
      let is_room = isRoom (games, room);
      games[is_room].start_game();
      io.sockets.in(room).emit('toggle_game', true);
    });
    socket.on('end', room => {
      let is_room = isRoom (games, room);
      games[is_room].end_game();
      io.sockets.in(room).emit('toggle_game', false);
    });
    // socket.on('action', (action) => {
    //   // if(action.type === 'server/ping'){
    //   //   socket.emit('action', {type: 'pong'})
    //   // }
    // })
  })
}

export function create(params){
  const promise = new Promise( (resolve, reject) => {
    const app = require('http').createServer()
    initApp(app, params, () =>{
      const io = require('socket.io')(app)
      const stop = (cb) => {
        io.close()
        app.close( () => {
          app.unref()
        })
        loginfo(`Engine stopped.`)
        cb()
      }
      let games = [];
      initEngine(io, games)
      resolve({stop})
    })
  })
  return promise
}
