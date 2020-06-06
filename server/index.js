const http = require('http');
const express = require('express');
const Socket = require("./helpers/socket");
const params = require('./config/params');
const cors = require('cors');
const router = require('./api/router');

class Server {
  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use('/tetris-api/',
      router
    );
    this.http = http.Server(this.app);
    this.sockets = new Socket(this.http).initEngine();
  }

  listen() {
    this.app.get('*', function (req, res) {
      res.status(404).send('<img src="http://giphygifs.s3.amazonaws.com/media/5ftsmLIqktHQA/giphy.gif" alt="hin hin hin ! This is not the magic word">');
    });
    const port = process.env.MAIN_PORT !== undefined ? process.env.MAIN_PORT : params.server.port;
    this.http.listen(port, () => {
      console.log(`Listening on port ${port}\n`);
    });
  }
}

new Server().listen();