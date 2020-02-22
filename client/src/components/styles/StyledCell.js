import styled from 'styled-components';

export const StyledCell = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 4px;
  border: 0.2px solid ##DCDCDC;
  background: rgba(${props => props.color}, 0.8);
`;
