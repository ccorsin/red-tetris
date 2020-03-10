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
`;

export const StyledTetrisGameBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 2vh 2vw 0vh 0vh;

  @media (max-width: 1025px) {
    width: 50%;
    margin: 0vh 0vw 0vh 0vh;
  }

`;

// flex-direction: column;
// align-items: center;
// padding: 20px;
// margin: 0 auto;
// max-width: 900px;

// aside {
//   display: flex;
//   flex-direction: row;
// }
