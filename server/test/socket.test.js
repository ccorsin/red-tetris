const Socket = require('../helpers/socket');
const io = require('socket.io-client');
const params = require( '../config/params');
const http = require('http');

let httpServer;
let httpServerAddr;
let ClientSocket;
let sockets;
const {host, port} = params;

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

describe('basic socket.io example', () => {
    it('should communicate between client and server', () => {return new Promise((done) => {
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
    });});  
});
