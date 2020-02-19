import React from 'react';
import { StyledSpectrum, StyledRow } from './styles/StyledSpectrum';
import { useSelector, useDispatch } from 'react-redux'

import Cell from './Cell';

const Spectrum = ({ stage, title }) => {
  const players = useSelector(state => state.sock.players);
    const getColor = (y) => {
        if (players) {
            let color;
            for (let player of players) {
                if (y == player.line) {
                    color = player.color;
                    break;
                }
                color = '245, 245, 245';
            }
            return color;
        }
    }
    return (
        <StyledSpectrum width={stage[0].length} height={stage.length}>
        <h2>{title}</h2>
        {stage.map((row, y) => (
        <StyledRow className="row" key={y}>
            {row.map((cell, x) => <Cell key={x} type={cell[0]} color={getColor(19 - y)} />)}
        </StyledRow>
        ))}
    </StyledSpectrum>
    );
}
export default Spectrum;
