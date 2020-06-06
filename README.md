# Project
Tetrisis a puzzle game (see Wikipedia), whose subject is to contain falling pieces aslong as possible in a Playground. The game is over when the field no longer offers enoughroom for a new piece to fall. When one or more lines of land are complete, they disappear, allowing to postpone the expiry of the game.

The game relies on a client / server architecture. The client runtime environment is a browser. The server is written with NodeJS.Clients and server communicate via http.
The communication between the server and the clients is bi-directional, we used socket.io for its implementation.

# On xubuntu vm
```
$ sudo service postgresql stop
```
IMPORTANT : then use sudo to execute the commands below

# To start the server with docker-compose
```
$ npm run start
```
# To watch the server logs
```
$ npm run log
```

Access Tertris on : http://localhost:3005/tetris

# Useful commands
Watch all containers
```
$  docker ps -a
```
Clean all about docker containers
```
$ docker stop $(docker ps -a -q)
$ docker system prune
```

# To get both client & server coverage
First, you have to run the tests separately
```
$ npm run server:coverage
$ npm run client:coverage
```
Then, install globaly istanbul-coverage :
```
$ npm install -g istanbul-combine
```
and execute in the root folder :
```
$ istanbul-combine -d coverage -p detail -r lcov client/coverage/coverage-final.json server/coverage/coverage-final.json
```
or
```
$ npm run coverage:all
```

![alt text](https://github.com/ccorsin/red-tetris/blob/master/Screenshot%202020-06-06%20at%2020.53.02.png?raw=true)
![alt text](https://github.com/ccorsin/red-tetris/blob/master/Screenshot%202020-06-06%20at%2020.52.15.png?raw=true)
