const http = require('http');
const express = require('express');
const Socket = require("./helpers/socket");
const params = require('./config/params');

class Server {
  constructor() {
    this.app = express();
    this.http = http.Server(this.app);
    this.sockets = new Socket(this.http).initEngine();
  }

  listen() {
    const {host, port} = params.server;
    this.http.listen(port, host, () => {
      console.log(`Listening on http://${host}:${port}\n`);
    });
  }
}

new Server().listen();