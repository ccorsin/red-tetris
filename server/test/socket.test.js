const Socket = require('../helpers/socket');
const io = require('socket.io-client');
const params = require( '../config/params');
const http = require('http');
const Game = require("../helpers/game");
const Player = require("../helpers/player");

let httpServer;
let httpServerAddr;
let ClientSocket;
let sockets;
const {host, port} = params.server;

const player1 = new Player('p1', 'a');
const game = new Game(player1, 42);

beforeAll((done) => {
  jest.setTimeout(20000);
  httpServer = http.createServer();
  httpServerAddr = httpServer.listen().address();
  sockets = new Socket (httpServer);
  sockets.initEngine();
  done();
});
  
afterAll((done) => {
  httpServer.close();
  done();
});

beforeEach((done) => {
  ClientSocket = io.connect(`http://[${host}]:${port}`, {
    'reconnection delay': 0,
    'reopen delay': 0,
    'force new connection': true,
    transports: ['websocket'],
  });
  sockets.games = [];
  ClientSocket.on('connect', () => {
      done();
  });
});


afterEach((done) => {
  if (ClientSocket.connected) {
      ClientSocket.disconnect();
  }
  done();
});

describe('Testing backend answer from front emit actions', () => {
  it('should communicate between client and server', (done) => {
      sockets.io.emit('echo', 'Hello World');
      ClientSocket.on('echo', (message) => {
          expect(message).toBe('Hello World');
          done();
      });
      sockets.io.on('connection', (socket) => {
          expect(socket).toBeDefined();
          done();
      });
      done();
  });

  it('should return the room position in games array', (done) => {
      sockets.games.push(game)
      expect(sockets.isRoom(sockets.games, '42')).toBe(0)
      done();
  });

  it('should return -1 if not in the games array', (done) => {
    sockets.games.push(game)
    expect(sockets.isRoom(sockets.games, '43')).toBe(-1)
    done();
  });

  it('player creating new room', (done) => {
      ClientSocket.on('message', (message) => {
          expect(message).toBe('Welcome to the game #42 p1 !');
          done();
      });
      expect(sockets.games).toHaveLength(0);
      ClientSocket.emit('room', '42', 'p1');
      setTimeout(() => {
        expect(sockets.games).toHaveLength(0);
        // done();
      });
  });

    it('socket on collision', (done) => {
        ClientSocket.emit('collision', player1, '42');
        setTimeout(() => {
          done();
        }, 100);
    });

    it('socket on game_over', (done) => {
        ClientSocket.emit('game_over', player1, '42');
        setTimeout(() => {
          done();
        }, 100);
    });

    it('socket on smash', (done) => {
        ClientSocket.emit('smash', player1, '42');
        setTimeout(() => {
          done();
        }, 100);
    });

    it('socket on start', (done) => {
        ClientSocket.emit('room', '42', 'p1');
        ClientSocket.emit('start', '42');
        setTimeout(() => {
          done();
        }, 100);
    });

    it('socket on end', (done) => {
        ClientSocket.emit('room', '42', 'p1');
        ClientSocket.emit('end', '42');
        setTimeout(() => {
          done();
        }, 100);
    });

    // it('player reaching a running room', (done) => {
    //     ClientSocket.on('isRunning', function() {
    //         done();
    //     });
    //     ClientSocket.emit('room', '42', 'p1');
    //     setTimeout(() => {
    //         ClientSocket.emit('start', '42');
    //         ClientSocket.emit('room', '42', 'p2');
    //     }, 100);
    // });
});