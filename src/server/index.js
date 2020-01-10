import fs  from 'fs'
import debug from 'debug'

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

const initEngine = io => {
  io.sockets.on('connection', function(socket){
    loginfo("Socket connected: " + socket.id)
    socket.on('room', (room, username) => {
      socket.username = username;
      socket.room = room;
      socket.emit('message', 'Welcome to the game #' + socket.room + ' ' + socket.username + ' !');
      io.sockets.in(room).emit('message', socket.username + ' has joined the game folks !');
      socket.join(room);
    });
    socket.on('action', (action) => {
      // if(action.type === 'server/ping'){
      //   socket.emit('action', {type: 'pong'})
      // }
    })
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

      initEngine(io)
      resolve({stop})
    })
  })
  return promise
}
