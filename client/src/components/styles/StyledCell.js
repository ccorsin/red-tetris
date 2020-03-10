import styled from 'styled-components';

export const StyledCell = styled.div`
  width: ${props => props.size}vh;
  height: ${props => props.size}vh;
  border-radius: 4px;
  border: 0.2px solid ##DCDCDC;
  background: rgba(${props => props.color}, 0.8);

  @media (min-width: 1025px) {
    width: 3vh;
    height: 3vh;
  }

`;
