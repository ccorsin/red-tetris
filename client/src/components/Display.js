import React from 'react';
import { StyledDisplay, StyledDisplayCase } from './styles/StyledDisplay';

const Display = ({ gameOver, text, number }) => (
  <StyledDisplay>
    {
      gameOver ? (
        <StyledDisplayCase>
          <p>{text}</p>
        </StyledDisplayCase>

      ) : (
        <StyledDisplayCase>
          <p>{text}</p>
          <p>{number}</p>
        </StyledDisplayCase>
      )
    }
    </StyledDisplay >
);

export default Display;
