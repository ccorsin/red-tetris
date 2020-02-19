import React, { useEffect, useState } from "react";
import Tetris from "../components/Tetris";
import Header from "../components/Header";
import { useSelector, useDispatch } from 'react-redux'

const Playground = ({ socket, message }) => {
  let room = "";
  let username = "";

  const reg = /(#[\d]+)(\[\w+\])/;
  const params = reg.exec(window.location.href);
  if (params !== null) {
    room = params[1].substring(1);
    username = params[2].slice(1,-1);
  }

  const [playerCount, setPlayerCount] = useState(1);
  const [gameLeader, setGameLeader] = useState(username);
  const [runningState, setRunningState] = useState(false);
  const [currentPlayer, setcurrentPlayer] = useState({});
  const dispatch = useDispatch()

  const startGame = () => {
      dispatch({type: 'START', room: room, socket})
  };
  const endGame = () => {
      dispatch({type: 'END', room: room, socket})
  };
  const isLeader = username == gameLeader;

  let commands = "";
  if (isLeader && !runningState) {
    commands = <button onClick={startGame}>START</button>;
  } else if (isLeader && runningState) {
    commands = <button onClick={endGame}>STOP</button>;
  } else if (!runningState) {
    commands = <h2>Wait for {gameLeader} to start the game !</h2>;
  } else {
    commands = <h2>Game is ON !</h2>;
  }

  useEffect(() => {
    socket.emit("room", room, username);
    socket.on("message", function(message) {
      alert(message);
    });
    socket.on("players_game", function(leader, players) {
      setPlayerCount(players.length);
      setGameLeader(leader);
      dispatch({type: 'UPDATE_PLAYERS', players})
    });
    socket.on("toggle_game", function(isRunning) {
      setRunningState(isRunning);
    });
    socket.on("spectre", function(players) {
      dispatch({type: 'UPDATE_PLAYERS', players});
    })
    socket.on("player", function (player) {
      setcurrentPlayer(player);
    });
  }, []);

  return (
    <div>
      <div>
        <Header playerCount={playerCount} commands={commands}/>
      </div>
      <Tetris socket={socket} room={room} playerObject={currentPlayer} playerCount={playerCount}/>
    </div>
  );
}
export default Playground;
