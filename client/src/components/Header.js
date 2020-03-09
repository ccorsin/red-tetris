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
					<h1>{count}</h1>
					{commands}
			</StyledHeader>
    );
};

export default Header;
