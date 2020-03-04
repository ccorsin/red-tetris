import React, { useState, useEffect } from "react";

import { createStage, checkCollision } from '../gameHelpers';
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';
import { useSelector, useDispatch, useStore } from 'react-redux'

// Custom Hooks
import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useGameStatus } from '../hooks/useGameStatus';

// Components
import Stage from './Stage';
import Spectrum from './Spectrum';
import Display from './Display';
import StartButton from './StartButton';

const Tetris = ({ socket, room, playerCount, isLeader }) => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer, gameOver, room, socket);
  // eslint-disable-next-line no-unused-vars
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    // const [rows, level, setLevel] = useGameStatus( // GROS BUG SUR useInterval si on retire le score
    rowsCleared
  );
  const dispatch = useDispatch();
  const currentPlayer = useSelector(state => state.sock.currentPlayer);
  const isRunning = useSelector(state => state.sock.isRunning);
  const store = useStore();

  const collide = (playerData) => {
    // socket.emit('test',  playerData);
    dispatch({ type: 'COLLISION', player: playerData, room, socket })
  };

  let isRestart = store.getState().sock.winner !== undefined;

  const clickStart = () => {
    if (isRestart) {
      dispatch({ type: 'RESET', room, socket })
    }
    else {
      dispatch({ type: 'START', room, socket })
    }
  }

  const startGame = (currentPlayer, tetriminos) => {
    // Reset everything
    setStage(createStage());
    setDropTime(1000);
    resetPlayer(currentPlayer, tetriminos);
    // setScore(0);
    // setLevel(0);
    // setRows(0);
    setGameOver(false);
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      // Activate the interval again when user releases down arrow.
      if (keyCode === 32 || keyCode === 40) {
        setDropTime(1000 / (level + 1));
      }
    }
  };

  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const drop = () => {
    // Increase level when player has cleared 10 rows
    if (rows > (level + 1) * 10) {
      setLevel(prev => prev + 1);
      // Also increase speed
      setDropTime(1000 / (level + 1) + 200);
    }
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      if (player.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);
        dispatch({ type: 'GAME_OVER', player: currentPlayer, room, socket })
        if (playerCount === 1) {
          dispatch({ type: 'END', socket, room });
        }
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
      const playerData = { ...currentPlayer, player };
      collide(playerData);
    }
  };

  const dropPlayer = () => {
    // We don't need to run the interval when we use the arrow down to
    // move the tetromino downwards. So deactivate it for now.
    setDropTime(null);
    drop();
  };

  function dropFallPlayer () {
    let i = 0;
    while (!checkCollision(player, stage, { x: 0, y: i })) i++;
    updatePlayerPos({ x: 0, y: i - 2, collided: false });
    setDropTime(1);
  }
  
  // This one  the game
  // Custom hook by Dan Abramov
  useInterval(() => {
    drop();
  }, dropTime);

  const move = (e) => {
    e.preventDefault();
    if (!gameOver) {
      if (e.keyCode === 37) {
        movePlayer(-1);
      } else if (e.keyCode === 39) {
        movePlayer(1);
      } else if (e.keyCode === 40) {
        dropFallPlayer();
      } else if (e.keyCode === 38) {
        playerRotate(stage, 1);
      } else if (e.keyCode === 32) {
        dropPlayer();
      }
    }
  };

  let spectrum = "";
  if (playerCount > 1) {
    spectrum = <Spectrum stage={createStage()} title="SPECTRUM" />
  }

  let button = "";
  if (isLeader === true && isRunning !== true) {
    button = <StartButton callback={clickStart} />
  }

  useEffect(() => {
    socket.on('freeze', function () {
      dispatch({ type: 'DO_FREEZE', freeze: true });
    });
    socket.on('start_game', function () {
      const currentPlayer = store.getState().sock.currentPlayer
      const tetriminos = store.getState().tetriminos.tetriminos
      dispatch({ type: 'REFILL', tetriminos });
      if (currentPlayer) {
        startGame(currentPlayer, tetriminos);
        const newCurrentPlayer = {...currentPlayer, round: currentPlayer.round + 1}
        dispatch({ type: "ADD_ROUND", currentPlayer: newCurrentPlayer });
      }
    });
    socket.on('restart_game', function (players) {
      dispatch({ type: "UPDATE_PLAYERS", players });
      let currentPlayer = store.getState().sock.currentPlayer;
      let tmp = {};
      if (currentPlayer && currentPlayer.id) {
        tmp = players.filter(e => (e.id === currentPlayer.id ? true : false))[0];
        dispatch({ type: "CURRENT_PLAYER", currentPlayer: tmp });
      }
      dispatch({ type: 'START', room, socket })
    })
    socket.on('refill', function (tetriminos) {
      dispatch({ type: 'REFILL', tetriminos });
    });
    socket.on("win", function (message, player) {
      alert(message);
      dispatch({ type: 'WINNER', player, socket, room });
      setDropTime(null);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={e => move(e)}
      onKeyUp={keyUp}
    >
      <StyledTetris>
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
              <div>
                {/* <Display text={`Score: ${score}`} />
              <Display text={`rows: ${rows}`} />
              <Display text={`Level: ${level}`} /> */}
              </div>
            )}
          {button}
        </aside>
        <aside>
          <Stage stage={stage} currentPlayer={currentPlayer} title="YOU" />
          {spectrum}
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;