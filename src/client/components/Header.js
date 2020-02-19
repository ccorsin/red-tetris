import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
    width: 25%;
    filter: grayscale(0.95);
    margin-top: 10px;
    margin-bottom: 10px;
    font-family: Pixel, Arial, Helvetica, sans-serif;
`;

const Header = ({ playerCount, commands }) => {
    let count;
    if (playerCount > 1) {
        count = playerCount + " players in the game.";
    } else {
        count = playerCount + " player in the game.";
    }
      return (
        <StyledHeader>
            <img src ="https://www.pngkit.com/png/full/273-2736039_517-name-of-tetris-shapes-263-colorfulness.png" width="100%"/>
            <h1>{count}</h1>
            {commands}
        </StyledHeader>
    );
};

export default Header;
