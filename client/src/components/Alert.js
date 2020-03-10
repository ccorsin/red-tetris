import React from 'react';
import styled from 'styled-components';

const StyledAlert = styled.div`
  width: ${props => props.size}vh;
  height: ${props => props.size}vh;
  border-radius: 0px;
  background: rgba(${props => props.color}, 1);

  @media (min-width: 1025px) {
    width: 3vh;
    height: 3vh;
  }
`;

const Alert = ({ message }) => {
  return (
    <StyledAlert>
      <span>{message}</span>
      {/* <button> OK </button> */}
    </StyledAlert>
	);
};

export default Alert;
