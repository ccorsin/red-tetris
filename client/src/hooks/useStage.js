import { useState, useEffect } from 'react';
import { createStage } from '../gameHelpers';
import { useSelector, useDispatch } from 'react-redux'
import { STAGE_WIDTH, STAGE_HEIGHT } from '../gameHelpers';

export const useStage = (player, resetPlayer, gameOver, room, socket) => {
  const [stage, setStage] = useState(createStage());
  const [rowsCleared, setRowsCleared] = useState(0);
  const [frozen, setFrozen] = useState(0);
  const currentPlayer = useSelector(state => state.sock.currentPlayer);
  const tetriminos = useSelector(state => state.tetriminos.tetriminos);
  const freeze = useSelector(state => state.sock.freeze);
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
      console.log("UPDATE")
      let newStage = [];
      let tmpStage = [];
      // SOCKET stagepar intermitance
      if (currentPlayer && currentPlayer.freeze >= 0) {
        if (freeze) {
          // TODO PB DE SYNC ou d'async
          tmpStage = prevStage.slice((currentPlayer.freeze - frozen), STAGE_HEIGHT);
          setFrozen(currentPlayer.freeze);
          dispatch({ type: 'DO_FREEZE', freeze: false });
        } else {
          tmpStage = prevStage;
        }
        for (let i = 0; i < STAGE_HEIGHT; i++) {
          if (i < tmpStage.length) {
            newStage.push(tmpStage[i].map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell)));
          } else {
            newStage.push(frozenLine);
          }
        }
      } else {
        // First flush the stage
        newStage = prevStage.map(row =>
          row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell))
        );
      }

      // Then draw the tetromino
      player.tetromino.forEach((row, y) => {
        if (currentPlayer && currentPlayer.freeze >= 0) {
          if (y < STAGE_HEIGHT - currentPlayer.freeze) {
            row.forEach((value, x) => {
              if (value !== 0) {
                newStage[y + player.pos.y][x + player.pos.x] = [
                  value,
                  `${player.collided ? 'merged' : 'clear'}`,
                ];
              }
            });
          }
        }
      });

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
    freeze
  ]);

  return [stage, setStage, rowsCleared];
};
