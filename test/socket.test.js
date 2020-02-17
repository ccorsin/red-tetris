import Socket from "../src/server/helpers/socket"
import Player from "../src/server/helpers/player"
import Game from "../src/server/helpers/game"
import io from 'socket.io-client';
import ioBack from 'socket.io';
const http = require('http');
import params  from '../params'
var webSocketServer = require('ws').server;

let ClientSocket;
let httpServer;
let httpServerAddr;
let socket;
let sockets;
const {host, port} = params

beforeAll((done) => {
    // jest.setTimeout(20000);
    // httpServer = http.createServer();
    // httpServerAddr = httpServer.listen().address();
    // ClientSocket = ioBack(httpServer)
    // sockets = new Socket ();
    // sockets.initEngine([], ClientSocket)
    done();
  });
  
afterAll((done) => {
    // ClientSocket.close();
    // httpServer.close();
    done();
});

// beforeEach((done) => {
//     socket = io.connect(`http://[${host}]:${port}`, {
//       'reconnection delay': 0,
//       'reopen delay': 0,
//       'force new connection': true,
//       transports: ['websocket'],
//     });
//     socket.on('connect', () => {
//       done();
//     });
//   });


// afterEach((done) => {
//     if (socket.connected) {
//         socket.disconnect();
//     }
//     done();
// });

// describe('basic socket.io example', () => {
    // test('should communicate', (done) => {
    // it('should update player with given values', () => {
    //     let player;
    //     player = new Player('name', 42);
    //     expect(player).toEqual({
    //         name: 'name',
    //         id: 42
    //     })
    // })
    //   ClientSocket.emit('echo', 'Hello World');
    //   socket.once('echo', (message) => {
    //     expect(message).toBe('Hello World');
    //     done();
    //   });
    //   ClientSocket.on('connection', (mySocket) => {
    //     expect(mySocket).toBeDefined();
    //   });
    // });
    // test('should communicate with waiting for socket.io handshakes', (done) => {
    //   socket.emit('examlpe', 'some messages');
    //   setTimeout(() => {
    //     done();
    //   }, 50);
    // });
//   });

describe('Player class is made to represent a player, store its name and socket id', () => {
    let player;
    beforeEach(() => { player = new Player('name', 42);});

    it('should update player with given values', () => {
        expect(player).toEqual({
            name: 'name',
            id: 42
        })
    })
 })