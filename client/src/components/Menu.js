import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { StyledMenuWrapper, StyledMenu, StyledTitle } from "./styles/StyledMenu";
import "./styles/Style.css";

import { regex } from "../utils/regex";

const Menu = () => {
  const [isValid, setIsValid] = useState(false);
  const [player, setPlayer] = useState("PLAYER");
  const [roomNb, setRoomNb] = useState("");
  let history = useHistory();

  const checkRoom = value => {
      if (regex.room.exec(value)) {
          setIsValid(true);
          setRoomNb(value);
      } else {
          setIsValid(false);
          setRoomNb("");
      }
  };

  const checkPlayer = value => {
    if (regex.username.exec(value) && regex.room.exec(value)) {
      setIsValid(true);
      setPlayer(value);
    } else {
      setIsValid(false);
      setPlayer("PLAYER");
    }
  };

  const goToRoom = () => {
    if (isValid) {
      history.push("/room/#" + roomNb + "[" + player + "]");
      setPlayer("PLAYER");
      setRoomNb("");
      setIsValid(false);
    }
  }

  return (
    <StyledMenuWrapper>
      <StyledTitle>
        <span style={{ color: 'red' }}>T</span>
        <span style={{ color: 'orange'}}>E</span>
        <span style={{ color: 'yellow'}}>T</span>
        <span style={{ color: 'green'}}>R</span>
        <span style={{ color: 'blue'}}>I</span>
        <span style={{ color: 'purple'}}>S</span>
      </StyledTitle>
      <StyledMenu>
        <span>TAKE A ROOM NUMBER</span>
        <div class="menu_input">
          <div>
            <input
              type="text"
              placeholder="PLAYER"
              onChange={e => checkPlayer(e.target.value)}
            />
            <span class="error-number-required">ONLY LETTERS OR NUMBERS</span>
          </div>
        </div>
        <div class="menu_input">
          <div>
            <input
              type="text"
              placeholder="ROOM"
              onChange={e => checkRoom(e.target.value)}
            />
            <span class="error-number-required">ONLY NUMBERS</span>
          </div>
        </div>
        <div>
          <button onClick={e => goToRoom(true)} disabled={!isValid}>
            PLAY
          </button>
        </div>
      </StyledMenu>
    </StyledMenuWrapper>
  );
};

export default Menu;
