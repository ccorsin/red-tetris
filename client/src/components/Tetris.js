import React, { useState, useEffect } from "react";

import { createStage, checkCollision } from '../gameHelpers';
import { StyledTetrisWrapper, StyledTetrisAside, StyledTetris, StyledTetrisGameBar, StyledGO } from './styles/StyledTetris';
import { useSelector, useDispatch, useStore } from 'react-redux'

// Custom Hooks
import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useGameStatus } from '../hooks/useGameStatus';

// Components
import Stage from './Stage';
import Display from './Display';
import Spectrum from './Spectrum';

const Tetris = ({ socket, room, playerCount }) => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer, gameOver, room, socket);
  // eslint-disable-next-line no-unused-vars
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);
  const dispatch = useDispatch();
  const currentPlayer = useSelector(state => state.sock.currentPlayer);
  const store = useStore();

  const collide = (playerData) => {
    const newCurrentPlayer = {...currentPlayer, round: currentPlayer.round + 1}
    dispatch({ type: "ADD_ROUND", currentPlayer: newCurrentPlayer });
    dispatch({ type: 'COLLISION', player: playerData, room, socket })
  };

  const startGame = (currentPlayer, tetriminos) => {
    // Reset everything
    setStage(createStage());
    setDropTime(1000);
    resetPlayer(currentPlayer, tetriminos);
    setScore(0);
    setLevel(0);
    setRows(0);
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
        if (store.getState().sock.players.length === 1) {
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
    updatePlayerPos({ x: 0, y: i - 1, collided: false });
    setDropTime(100);
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

  useEffect(() => {
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
          <Stage stage={stage} currentPlayer={currentPlayer}/>
      </StyledTetris>
      <StyledTetrisAside>
        {gameOver ? (
          <StyledGO>
            <Display gameOver={gameOver} text="Game Over" />
          </StyledGO>
        ) : (
          <StyledTetrisGameBar>
              <Display text={`SCORE`} number={score} /> {/* TO DO add next piece */}
              <Display text={`SCORE`} number={score} />
              <Display text={`ROWS`} number={rows} />
              <Display text={`LEVEL`} number={level} />
            </StyledTetrisGameBar>
          )}
        {spectrum}
      </StyledTetrisAside>
    </StyledTetrisWrapper>
  );
};


export default Tetris;