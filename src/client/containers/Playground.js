import React, { useEffect, useState } from 'react'
import Tetris from "../components/Tetris";

const Playground = ({ socket, message }) => {
  const [playerCount, setPlayerCount] = useState(1);
  const [gameLeader, setGameLeader] = useState(username);
  const [runningState, setRunningState] = useState(false);

    let room = "";
    let username = "";

    const reg = /(\/#[\d]+)(\[\w+\])/;
    const params = reg.exec(window.location.href);
    if (params !== null) {
      room = params[1].slice(9);
      username = params[2].slice(1, -1);
    }

    const startGame = () => {
      socket.emit("start", room);
    };
    const endGame = () => {
      socket.emit("end", room);
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
      socket.on("players_game", function(count, leader) {
        setPlayerCount(count);
        setGameLeader(leader);
      });
      socket.on("toggle_game", function(isRunning) {
        setRunningState(isRunning);
      });
    }, []);

    return (
      <div>
        <div>
          {status}
          {commands}
          <h1>Currently {playerCount} players in the game.</h1>
        </div>
        <Tetris />
      </div>
    );
}
export default Playground;
