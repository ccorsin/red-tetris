import React from 'react';

import { StyledDisplay, StyledDisplayCase } from './styles/StyledDisplay';
import { StyledTetromino, StyledRow } from './styles/StyledTetromino';
import Cell from './Cell';

import { TETROMINOS } from "../utils/tetrominos-colors.js";

const color = (cell) => {
  return TETROMINOS[cell].color;
}

const Display = ({ text, tetro }) => (
  <StyledDisplay>
    <StyledDisplayCase>
      <p>{text}</p>
      {tetro && tetro.shape ?
        <StyledTetromino width={tetro.shape[0].length} height={tetro.shape.length}>
          {tetro.shape.map((row, y) => (
            <StyledRow className="row" key={y}>
              {row.map((cell, x) => <Cell key={x} type={cell[0]} color={color(cell)} size={1.5} cell={true} />)}
            </StyledRow>
          ))}
        </StyledTetromino> :
        <div></div>
      }

    </StyledDisplayCase>
  </StyledDisplay >
);

export default Display;
