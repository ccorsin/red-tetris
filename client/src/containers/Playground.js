import React, { useEffect, useState } from "react";
import Tetris from "../components/Tetris";
import Header from "../components/Header";
import { useDispatch, useStore } from 'react-redux'

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
  const store = useStore();
  const dispatch = useDispatch()

  const isLeader = username === gameLeader;

  let commands = "";
  const isRunning = store.getState().sock.isRunning;
  if (isLeader && !isRunning) {
    commands = <h2>You can start the game !</h2>;
  } else if (!isRunning) {
    commands = <h2>Wait for {gameLeader} to start the game !</h2>;
  } else {
    commands = <h2>Game is ON !</h2>;
  }

  useEffect(() => {
    let currentPlayer = store.getState().sock.currentPlayer;
    socket.emit("room", room, username);
    socket.on("message", function(message) {
      alert(message);
    });
    socket.on("players_game", function(leader, players) {
      setPlayerCount(players.length);
      setGameLeader(leader);
      dispatch({ type: "UPDATE_PLAYERS", players });
    });
    socket.on("players", function(players) {
      dispatch({ type: "UPDATE_PLAYERS", players });
      let currentPlayer = store.getState().sock.currentPlayer;
      let tmp = {};
      if (currentPlayer && currentPlayer.id) {
        tmp = players.filter(e => (e.id === currentPlayer.id ? true : false))[0];
        dispatch({ type: "CURRENT_PLAYER", currentPlayer:tmp });
      }
    });
    socket.on("player", function(player) {
      dispatch({ type: "CURRENT_PLAYER", currentPlayer: player });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div>
        <Header playerCount={playerCount} commands={commands}/>
      </div>
      <Tetris socket={socket} room={room} playerCount={playerCount} isLeader={isLeader}/>
    </div>
  );
}
export default Playground;
