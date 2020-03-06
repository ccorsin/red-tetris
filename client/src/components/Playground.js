import React, { useEffect, useState } from "react";
import { useDispatch, useStore } from 'react-redux';
import { useHistory } from "react-router-dom";

import { createStage } from '../gameHelpers';
import { regex } from "../utils/regex";

import Header from "./Header";
import Tetris from "./Tetris";
import Spectrum from './Spectrum';

const Playground = ({ socket }) => {
  const params = regex.url.exec(window.location.href);
  let history = useHistory();

  let commands = "";
  let room = "";
  let username = "";

  if (params !== null) {
    room = params[1].substring(1);
    username = params[2].slice(1, -1);
  } else {
    history.push("/");
  }

  const [playerCount, setPlayerCount] = useState(1);
  const [gameLeader, setGameLeader] = useState(username);
  const dispatch = useDispatch()
  const store = useStore();
  const isRunning = store.getState().sock.isRunning;

  const isLeader = username === gameLeader;

  if (isLeader && !isRunning) {
    commands = <h2>You can start the game !</h2>;
  } else if (!isRunning) {
    commands = <h2>Wait for {gameLeader} to start the game !</h2>;
  } else {
    commands = <h2>Game is ON !</h2>;
  }

  let spectrum = "";
  if (playerCount > 1) {
    spectrum = <Spectrum stage={createStage()} title="SPECTRUM" />
  }

  useEffect(() => {
    socket.emit("room", room, username);
    socket.on("message", function(message) {
      alert(message);
    });
    socket.on("players", function(leader, players) {
      setPlayerCount(players.length);
      setGameLeader(leader);
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
        <Header playerCount={playerCount} commands={commands} />
      </div>
      <div>
        <Tetris socket={socket} room={room} isLeader={isLeader}/>
        {spectrum}
      </div>
    </div>
  );
}
export default Playground;
