 import React from 'react';
import { StyledStage, StyledRow } from './styles/StyledStage';
import { useSelector } from 'react-redux'

import Cell from './Cell';

const Stage = ({ stage, currentPlayer }) => {
  const winner = useSelector(state => state.sock.winner);

  const TETROMINOS = {
    0: { color: "220, 220, 220" },
    1: { color: "0, 0, 0" },
    I: { color: "80, 227, 230" },
    J: { color: "36, 95, 223" },
    L: { color: "223, 173, 36" },
    O: { color: "223, 217, 36" },
    S: { color: "48, 211, 56" },
    T: { color: "132, 61, 198" },
    Z: { color: "227, 78, 78" }
  };
  
  const color = (cell) => {
    let color;
    if (currentPlayer && currentPlayer.loser) {
      color = '96, 96, 96';
    }
    else if (currentPlayer && winner && currentPlayer.id === winner.id && currentPlayer.winner) {
      color = '63, 191, 191'
    }
    else {
      color = TETROMINOS[cell[0]].color;
    }
    return color;
  }
  
  return (
    <StyledStage width={stage[0].length} height={stage.length}>
      {stage.map((row, y) => (
      <StyledRow className="row" key={y}>
          {row.map((cell, x) => <Cell key={x} type={cell[0]} color={color(cell)} size={3}/>)}
      </StyledRow>
    ))}
  </StyledStage>
  );
}

export default Stage;
