import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useStore } from 'react-redux';
import { useHistory } from "react-router-dom";

import { regex } from "../utils/regex";

import { StyledPlayground, StyledStagesWrapper } from "./styles/StyledPlayground";
import "./styles/Style.css";
import Header from "./Header";
import Tetris from "./Tetris";

import io from 'socket.io-client';

let socket;

const Playground = ({ setIsAlert, setAlertMessage, setIsRunning }) => {
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
  const [gameLeader, setGameLeader] = useState({name: username, id: 0});
  const dispatch = useDispatch();
  const store = useStore();
  const isRunning = store.getState().sock.isRunning;

  // const isLeader = (username === gameLeader.name);
  const isLeaderRef = useRef(username === gameLeader.name);

  if (isLeaderRef.current && !isRunning) {
    commands = <span>You can start the game !</span>;
  } else if (!isRunning) {
    commands = <span>Wait for {gameLeader.name} to start the game !</span>;
  } else {
    commands = <span>Game is ON !</span>;
  }

  useEffect(() => {
    socket = io('http://0.0.0.0:3504');
    return () => {
      socket.close();
    }
  }, []);

  useEffect(() => {
    if (socket !== undefined) {
      socket.emit("room", room, username);
      socket.on("players", function(leader, players) {
        setPlayerCount(players.length);
        setGameLeader(leader);
        const isLeader = (socket.id === leader.id) || leader.id === 0;
        isLeaderRef.current = isLeader;
        dispatch({ type: "UPDATE_PLAYERS", players });
        let currentPlayer = store.getState().sock.currentPlayer;
        let tmp = {};
        if (currentPlayer && currentPlayer.id) {
          tmp = players.filter(e => (e.id === currentPlayer.id ? true : false))[0];
          dispatch({ type: "CURRENT_PLAYER", currentPlayer: tmp });
        }
      });
      socket.on("player", function(player) {
        dispatch({ type: "CURRENT_PLAYER", currentPlayer: player });
      });
      socket.on("message", function (message) {
        setIsAlert(true);
        setAlertMessage(message);
      });
      socket.on("isRunning", function () {
        dispatch({ type: "TOGGLE_RUNNING", isRunning: true });
        setIsRunning(true);
        setIsAlert(true);
        setAlertMessage("A game is currently running in this room. Please chose another number.");
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <StyledPlayground>
      <Header
        commands={commands}
        isLeader={isLeaderRef.current}
        room={room}
        socket={socket}
      />
      <StyledStagesWrapper>
        <Tetris socket={socket} room={room} playerCount={playerCount}/>
      </StyledStagesWrapper>
    </StyledPlayground>
  );
}
export default Playground;
