import { useState, useEffect } from 'react';
import { createStage } from '../gameHelpers';
import { useSelector, useDispatch } from 'react-redux'
import { STAGE_WIDTH, STAGE_HEIGHT } from '../gameHelpers';


export const useStage = (player, resetPlayer, socket, room, gameOver) => {
  const [stage, setStage] = useState(createStage());
  const [rowsCleared, setRowsCleared] = useState(0);
  const currentPlayer = useSelector(state => state.sock.currentPlayer);
  const tetriminos = useSelector(state => state.tetriminos.tetriminos);
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
            console.log("SMAAAAAAAAAASH");
            dispatch({ type: 'SMASH', player: currentPlayer, room: room, socket });
          }
            return ack;
          }
          ack.push(row);
          return ack;
      }, []);

    // SOCKET stage
      // const updateStage = prevStage => {
      //   // First flush the stage
      //   const newStage = prevStage.map(row =>
      //     row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell))
      //   );
      //   // Then draw the tetromino
      //   player.tetromino.forEach((row, y) => {
      //     row.forEach((value, x) => {
      //       if (value !== 0) {
      //         newStage[y + player.pos.y][x + player.pos.x] = [
      //           value,
      //           `${player.collided ? 'merged' : 'clear'}`,
      //         ];
      //       }
      //     });
      //   });

      const updateStage = prevStage => {
        let newStage = [];

        if (currentPlayer && currentPlayer.freeze >= 0) {
          prevStage.forEach((row, y) => {
            if (currentPlayer && currentPlayer.freeze >= 0) {
              if (y < STAGE_HEIGHT - currentPlayer.freeze) {
                if (y - currentPlayer.freeze >= 0) {
                  // remonter les lignes
                  console.log(STAGE_HEIGHT - currentPlayer.freeze)
                  newStage.push(row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell)));
                } 
                else {
                  console.log("nieee")
                }
              } else {
                // push frozen line at the bottom
                console.log("push frozen line at the bottom")
                newStage.push(frozenLine);
              }
            }
          })
        } else {
          // First flush the stage
          newStage = prevStage.map(row =>
            row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell))
          );
        }
          // console.log("newStage")
          // console.log(newStage)

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

      // if (!gameOver) {
      //   socket.on('freeze', function (player) {
      //     // console.log("socket on freeze")
      //     if (currentPlayer && currentPlayer.freeze >= 0) {
      //       // if (player.id != currentPlayer.id) {
      //         // remonter le tout d'une ligne
      //         newStage.splice(0, currentPlayer.freeze);
      //         // reecrire le bas
      //         for (let i = (STAGE_HEIGHT - currentPlayer.freeze); i < STAGE_HEIGHT; i++) {
      //           console.log("PUSH FROZEN LINE")
      //           newStage.push(frozenLine);
      //         }
      //       // }
      //     }
      //   });
      // }

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
    setStage(prev => updateStage(prev));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    player.collided,
    player.pos.x,
    player.pos.y,
    player.tetromino,
    resetPlayer,
  ]);

  return [stage, setStage, rowsCleared];
};
