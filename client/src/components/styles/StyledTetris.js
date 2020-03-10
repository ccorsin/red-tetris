import styled from 'styled-components';

export const StyledTetrisWrapper = styled.div`
  background-size: cover;
  overflow: hidden;
  `;
  
export const StyledTetris = styled.div`
  display: flex;
`;

export const StyledTetrisGameBar = styled.div`
  display: flex;
  flex-direction: column;
    @media (max-width: 768px) {
      width: 50%;
      
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
