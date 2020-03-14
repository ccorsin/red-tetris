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

export const StyledAdversity = styled.div`
  display: flex;
  flex-direction: row;
  flex-direction: row;
  justify-content: space-around;
    width: 100%;
`;

export const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
  width: auto;
  width: 100%;
`;

export const StyledName = styled.div`
  color: rgba(${props => props.color}, 1) !important;
`;

export const StyledNameLabel = styled.div`
  color: white;
`;

export const StyledNameColumn = styled.div`
  display: flex;
  flex-direction: column;
      margin-right: 1vw
`;
