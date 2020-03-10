import styled from 'styled-components';


export const StyledStagesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  
`;

export const StyledPlayground = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 100%;
    @media (max-width: 768px) {
      position: absolute;
      z-index: 1;
    }
`;