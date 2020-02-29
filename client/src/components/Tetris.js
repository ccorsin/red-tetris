import React, { useState, useEffect } from "react";

import { STAGE_HEIGHT, createStage, checkCollision, tetriminosHeight } from '../gameHelpers';
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

const Tetris = ({ socket, room, playerCount }) => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  // WIP
  const store = useStore();

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer, gameOver, room, socket);
  // eslint-disable-next-line no-unused-vars
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
  // const [rows, level, setLevel] = useGameStatus( // GROS BUG SUR useInterval si on retire le score
    rowsCleared
  );
  const dispatch = useDispatch();
  const currentPlayer = useSelector(state => state.sock.currentPlayer);
  const tetriminos = useSelector(state => state.tetriminos.tetriminos);

  const collide = (playerData) => {
    dispatch({ type: 'COLLISION', player: playerData, room, socket })
  };

  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  // emboiter direct tetriminos si possible
  const teleportPlayer = () => {
    // calculer le nombre de ligne
    let i = STAGE_HEIGHT - player.pos.y - tetriminosHeight(player.tetromino);
    // TO DO line pas mis a jour
    let dist = i - store.getState().sock.currentPlayer.line;
    // console.log(i)
    // console.log(store.getState().sock.currentPlayer.line)
    // console.log(dist)
    // setDropTime(1000);
    drop(dist);
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      // Activate the interval again when user releases down arrow.
      if (keyCode === 40) {
        setDropTime(1000 / (level + 1));
      }
    }
  };

  const startGame = () => {
    // Reset everything
    setStage(createStage());
    setDropTime(1000);
    resetPlayer(currentPlayer, tetriminos);
    // setScore(0);
    // setLevel(0);
    // setRows(0);
    setGameOver(false);
  };

  const drop = (dist) => {
    // Increase level when player has cleared 10 rows
    if (rows > (level + 1) * 10) {
      setLevel(prev => prev + 1);
      // Also increase speed
      setDropTime(1000 / (level + 1) + 200);
    }
    if (!checkCollision(player, stage, { x: 0, y: dist })) {
      updatePlayerPos({ x: 0, y: dist, collided: false });
    } else {
      if (player.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);
        dispatch({ type: 'GAME_OVER', player: currentPlayer, room, socket })
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
      // SOCKET COLLISION
      const playerData = { ...currentPlayer, player};
      collide(playerData);
    }
  };

  const dropPlayer = (dist) => {
    // We don't need to run the interval when we use the arrow down to
    // move the tetromino downwards. So deactivate it for now.
    setDropTime(null);
    drop(dist);
  };

  // This one starts the game
  // Custom hook by Dan Abramov
  useInterval(() => {
    drop(1);
  }, dropTime);

  const move = (e) => {
    e.preventDefault();
    if (!gameOver) {
      if (e.keyCode === 37) {
        movePlayer(-1);
      } else if (e.keyCode === 39) {
        movePlayer(1);
      } else if (e.keyCode === 40) {
        dropPlayer(1);
      } else if (e.keyCode === 38) {
        playerRotate(stage, 1);
      } else if (e.keyCode === 32) {
        teleportPlayer();
      }
    }
  };

  let spectrum = "";
  if (playerCount > 1) {
    spectrum = <Spectrum stage={createStage()} title="SPECTRUM"/>
  }

  useEffect(() => {
    socket.on('freeze', function () {
      dispatch({ type: 'DO_FREEZE', freeze: true });
    });
    socket.on('refill', function (tetriminos) {
      dispatch({ type: 'REFILL', tetriminos });
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
          <StartButton callback={startGame} />
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
