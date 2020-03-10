import styled from 'styled-components';

// border: 1px solid rgba(${props => props.color}, 0.5);
export const StyledCell = styled.div`
  width: ${props => props.size}vh;
  height: ${props => props.size}vh;
  border-radius: 0px;
  background: rgba(${props => props.color}, 1);

  @media (min-width: 1025px) {
    width: 3vh;
    height: 3vh;
  }
`;
