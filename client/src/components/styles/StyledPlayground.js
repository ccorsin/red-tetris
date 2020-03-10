import styled from 'styled-components';


export const StyledStagesWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const StyledPlayground = styled.div`
  display: flex;
  flex-direction: column;
  min-width: fit-content;
 
  @media (max-width: 1025px) {
    z-index: 1;
    margin: auto;
  }
`;