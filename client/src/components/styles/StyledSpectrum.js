import styled from 'styled-components';

export const StyledSpectrum = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  @media (max-width: 1025px) {
    margin: 0;
  }
`;

export const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
