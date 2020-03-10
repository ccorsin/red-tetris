import React from 'react';
import { StyledCell } from './styles/StyledCell';

// React.memo makes sure we only re-render the changed cells
const Cell = ({ type, color, size }) => (
  <StyledCell type={type} color={color} size={size}>
  </StyledCell>
);
// {console.log('rerender cell')}

export default React.memo(Cell);
