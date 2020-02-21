import React from 'react';
import { StyledStage, StyledRow } from './styles/StyledStage';
import { TETROMINOS } from '../tetrominos';
import { useSelector } from 'react-redux'


import Cell from './Cell';

const Stage = ({ stage, title }) => {
  const currentPlayer = useSelector(state => state.sock.currentPlayer);

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
