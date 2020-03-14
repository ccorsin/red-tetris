import styled from 'styled-components';

export const StyledTetrisWrapper = styled.div`
  min-width: 300px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding-top: 2vh;
  width: 100%;
  justify-content: space-around;
  margin: 1vh 0vw 0vh 0vw;

  @media (max-width: 1025px) {
    flex-direction: column;
    margin: auto;
    flex-wrap: wrap;
  }
`;

export const StyledGO = styled.div`
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  font-size: -webkit-xxx-large;
`;

export const StyledTetrisAside = styled.div`
  display: flex;
  flex-direction: row;
  margin: 2vw;

  @media (max-width: 1025px) {
    padding-top: 2vh;
    justify-content: space-between;
  }
`;

export const StyledTetris = styled.div`
  display: flex;
  width: 100%;
`;

export const StyledTetrisGameBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 20%;
  height: auto;

  @media (max-width: 1025px) {
    margin: 0vh 10% 0vh 0vh;

  }
`;