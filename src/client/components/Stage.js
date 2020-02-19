import React from 'react';
import { StyledStage, StyledRow } from './styles/StyledStage';
import { TETROMINOS } from '../tetrominos';

import Cell from './Cell';

const Stage = ({ stage, title }) => {
  return (
    <StyledStage width={stage[0].length} height={stage.length}>
    <h2>{title}</h2>
    {stage.map((row, y) => (
      <StyledRow className="row" key={y}>
        {row.map((cell, x) => <Cell key={x} type={cell[0]} color={TETROMINOS[cell[0]].color} />)}
      </StyledRow>
    ))}
  </StyledStage>
  );
}

export default Stage;
