 import React from 'react';
import { StyledStage, StyledRow } from './styles/StyledStage';
import { useSelector } from 'react-redux'

import Cell from './Cell';

const Stage = ({ stage, currentPlayer }) => {
  const winner = useSelector(state => state.sock.winner);

  const TETROMINOS = {
    0: { color: "0, 0, 0" },
    1: { color: "0, 0, 0" },
    I: { color: "0, 255, 255" },
    J: { color: "225, 0, 0" },
    L: { color: "0, 0, 255" },
    O: { color: "255, 255, 0" },
    S: { color: "50, 205, 50" },
    T: { color: "128, 0, 128" },
    Z: { color: "255, 165, 0" }
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
