import { useState, useEffect } from 'react';
import { createStage } from '../gameHelpers';
import { useSelector, useDispatch, useStore } from 'react-redux'
import {
  STAGE_WIDTH,
} from "../gameHelpers";

export const useStage = (player, resetPlayer, gameOver, room, socket) => {
  const [stage, setStage] = useState(createStage());
  const [rowsCleared, setRowsCleared] = useState(0);
  const [frozen, setFrozen] = useState(0);
  const [froze, setFroze] = useState(false);
  const currentPlayer = useSelector(state => state.sock.currentPlayer);
  const tetriminos = useSelector(state => state.tetriminos.tetriminos);
  const store = useStore();
  const dispatch = useDispatch()
  const setFrozenLine = () => {
    let line = [];
    for (let i = 0; i < STAGE_WIDTH; i++) {
      line.push([1, 'frozen']);
    }
    return line;
  }
  const frozenLine = setFrozenLine();

  useEffect(() => {

    setRowsCleared(0);

    const sweepRows = newStage =>
      newStage.reduce((ack, row) => {
        if (row.findIndex(cell => cell[0] === 0) === -1 && row.findIndex(cell => cell[0] === 1) === -1) {
            if (!gameOver) {
              setRowsCleared(prev => prev + 1);
              ack.unshift(new Array(newStage[0].length).fill([0, 'clear']));
              // SOCKET SMASH
              dispatch({ type: 'SMASH', player: currentPlayer, room: room, socket });
            }
            return ack;
          }
          ack.push(row);
          return ack;
      }, []);

      const updateStage = prevStage => {
        // First flush the stage
        const newStage = prevStage.map(row =>
          row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell))
        );
        // Then draw the tetromino
        player.tetromino.forEach((row, y) => {
          row.forEach((value, x) => {
            if (value !== 0) {
              newStage[y + player.pos.y][x + player.pos.x] = [
                value,
                `${player.collided ? 'merged' : 'clear'}`,
              ];
            }
          });
        });

      // Then check if we got some score if collided
      if (player.collided) {
        resetPlayer(currentPlayer, tetriminos);
        return sweepRows(newStage);
      }
      return newStage;
    };

    // Here are the updates
    if (!gameOver) {
      setStage(prev => updateStage(prev));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    player.collided,
    player.pos.x,
    player.pos.y,
    player.tetromino,
    resetPlayer,
  ]);

  useEffect((currentPlayer) => {
    console.log("in the hOok")
    const addLine = prev => {
      // const currPlayer = store.getState().currentPlayer;
      for (let i = 0; i < currentPlayer.freeze; i++) {
        prev.shift()
        prev.push(new Array(prev[0].length).fill([1, 'frozen']))
      }
      return prev
    } 
    if (currentPlayer && currentPlayer.freeze > 0 && !gameOver) setStage(prev => addLine(prev))
  }, [currentPlayer]);

  return [stage, setStage, rowsCleared];
};
