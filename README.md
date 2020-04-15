# to start the server with docker-compose
```
$ npm run start
```
# to watch the server logs
```
$ npm run log
```
# Useful commands
watch all containers
```
$  docker ps -a
```
clean all about docker containers
```
$ docker stop $(docker ps -a -q)
$ docker system prune
```

# to get both client & server coverage
first, you have to run the tests separately
```
$ npm run server:coverage
$ npm run client:coverage
```
then, install globaly istanbul-coverage :
```
$ npm install -g istanbul-combine
```
and execute in the root folder :
```
$ istanbul-combine -d coverage -p detail -r lcov client/coverage/coverage-final.json server/coverage/coverage-final.json
```