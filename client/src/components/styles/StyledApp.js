import styled from 'styled-components';
// import { createGlobalStyle } from 'styled-components'

// createGlobalStyle`
//   @font-face {
//     font-family: 'theboldfont';
//     src: 
//     local('theboldfont'),
//     url('../../fonts/theboldfont.ttf') 
//     format('opentype');
//   }
// `

export const StyledApp = styled.div`
  background: black;
  font-family: 'theboldfont';
  display: flex;
  flex - direction: column;
  min-height: -webkit-fill-available;
`;

export const StyledTitle = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 15vh;
    margin: 5vh 5vw 0;
    width: fit-content;
    @media (max-width: 1025px) {
      position: absolute;
      z-index: 0;
    }
`;