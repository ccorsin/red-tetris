import http from 'http';
import express from 'express';
import Socket from "./helpers/socket"
import params  from '../../params'

class Server {
  constructor() {
    this.app = express();
    this.http = http.Server(this.app);
    this.sockets = new Socket(this.http).initEngine();
  }

  listen() {
    const {host, port} = params.server;
    this.http.listen(port, host, () => {
      process.stdout.write(`Listening on http://${host}:${port}\n`);
    });
  }
}

new Server().listen();