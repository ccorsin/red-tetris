import React from 'react';
import { StyledStage, StyledRow } from './styles/StyledStage';
import { useSelector, useDispatch } from 'react-redux'

import Cell from './Cell';

const Stage = ({ stage, title }) => {
  const players = useSelector(state => state.sock.players);
  return (
    <StyledStage width={stage[0].length} height={stage.length}>
    <h2>{title}</h2>
    {stage.map((row, y) => (
      <StyledRow className="row" key={y}>
        {row.map((cell, x) => <Cell key={x} type={cell[0]} />)}
      </StyledRow>
    ))}
  </StyledStage>
  );
}

export default Stage;
