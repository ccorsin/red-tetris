import React from 'react';
import { StyledStage, StyledRow } from './styles/StyledStage';

import Cell from './Cell';

const Stage = ({ stage, title, currentPlayer }) => {

  const TETROMINOS = {
    0: { color: "220, 220, 220" },
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
    else {
      color = TETROMINOS[cell[0]].color;
    }
    return color;
  }
  
  return (
    <StyledStage width={stage[0].length} height={stage.length}>
    <h2>{title}</h2>
      {stage.map((row, y) => (
      <StyledRow className="row" key={y}>
        {row.map((cell, x) => <Cell key={x} type={cell[0]} color={color(cell)} />)}
      </StyledRow>
    ))}
  </StyledStage>
  );
}

export default Stage;
