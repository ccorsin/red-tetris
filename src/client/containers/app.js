import React, { useEffect, useState } from 'react'
import { StyledApp } from '../components/styles/StyledApp';

import { connect } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'
import io from 'socket.io-client'
// import Playground from "./Playground"
import Tetris from "../components/Tetris";
const socket = io('http://0.0.0.0:3004');

const App = ({message}) => {
  const dispatch = useDispatch()
  
  // point d'entree
  // gerer l'attribution des room
  // component recupere le nom et generate newGame ou input roomName
  // socket - gestion attribution room et playerid pour redirection vers Playground
  /*
    
  useEffect(() => {
    socket.emit('newRoom', username); // generate newRoom
    socket.on('goPlay', function (goPlay) {
      // URL redirection to Playground
      // goPlay.roomNb
    })

  */


  // SI params dans l'URL => Playground
  console.log(window.location.href);
  const reg = /(#[\d]+)(\[\w+\])/;
  const params = reg.exec(window.location.href);
  console.log(params);
  
  let room;
  let username;
  let commands = "";

  // ?
  const [playerCount, setPlayerCount] = useState(1);

  if (params !== null) {
    room = params[1].substring(1);
    username = params[2].slice(1,-1);
    
    const [gameLeader, setGameLeader] = useState(username);
    const [runningState, setRunningState] = useState(false);
    const startGame = () => {
      dispatch({type: 'START', room: room, socket})
    }
    const endGame = () => {
      dispatch({type: 'END', room: room, socket})
    }
    const isLeader = username == gameLeader
  
    if (isLeader && !runningState) {
      commands = <button onClick={startGame}>START</button>;
    } else if (isLeader && runningState) {
      commands = <button onClick={endGame}>STOP</button>;
    } else if (!runningState) {
      commands = <h2>Wait for {gameLeader} to start the game !</h2>
    } else {
      commands = <h2>Game is ON !</h2>
    }

    useEffect(() => {
      socket.emit('room', room, username);
      socket.on('message', function(message) {
        alert(message);
      })
      socket.on('players_game', function(count, leader) {
        setPlayerCount(count);
        setGameLeader(leader)
      });
      socket.on('toggle_game', function(isRunning) {
        setRunningState(isRunning)
      });
    }, [])
  }

  

  //

  return (
    <StyledApp>
      {status}
      {commands}
      {params !== null ? (
        <div>
          <h1>Currently {playerCount} players in the game.</h1>
          <Tetris />
          {/* <Playground 
          /> */}
        </div>
        ) : (
          <div>
          </div>
        ) }
    </StyledApp>
  );
}

const mapStateToProps = (state) => {
  return {
    message: state.message
  }
}
export default connect(mapStateToProps, null)(App)