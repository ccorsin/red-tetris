import React from 'react';
import { StyledSpectrum, StyledRow } from './styles/StyledSpectrum';
import { useSelector } from 'react-redux'

import Cell from './Cell';

const Spectrum = ({ stage, title }) => {
  const players = useSelector(state => state.sock.players);
	const currentPlayer = useSelector(state => state.sock.currentPlayer);
	
	const getColor = (y, x) => {
		if (players && currentPlayer) {
			let color;
			for (let player of players) {
				if (y >= player.spectre[x] && player.id !== currentPlayer.id) {
					color = player.color;
					if (player.spectre[x] === 19 && y === 19) {
						color = '0, 0, 0';
					}
					break;
				}
				color = '0, 0, 0';
			}
			return color;
		}
	};
		
	return (
		<StyledSpectrum width={stage[0].length} height={stage.length}>
			{stage.map((row, y) => (
			<StyledRow className="row" key={y}>
				{row.map((cell, x) => <Cell key={x} type={cell[0]} color={getColor(y, x)} size={1} cell={false}/>)}
			</StyledRow>
			))}
		</StyledSpectrum>
	);
}
export default Spectrum;
