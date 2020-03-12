import styled from 'styled-components';

export const StyledSpectrum = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  border: 1px solid white;

  @media (max-width: 1025px) {
    margin: 0;
  }
`;

export const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
  width: auto;
  width: 100%;
`;
