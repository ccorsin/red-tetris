import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { StyledMenuWrapper, StyledMenu } from "./styles/StyledMenu";
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
      <StyledMenu>
        <span className="menu_label">TAKE A ROOM NUMBER</span>
        <div className="menu_input">
            <input
              type="text"
              placeholder="PLAYER"
              onChange={e => checkPlayer(e.target.value)}
            />
            <span className="error-number-required">ONLY LETTERS OR NUMBERS</span>
        </div>
        <div className="menu_input">
            <input
              type="text"
              placeholder="ROOM"
              onChange={e => checkRoom(e.target.value)}
            />
            <span className="error-number-required">ONLY NUMBERS</span>
        </div>
        <div className="menu_input">
          <button className="button-to-game" onClick={e => goToRoom(true)} disabled={!isValid}>
            PLAY
          </button>
        </div>
      </StyledMenu>
    </StyledMenuWrapper>
  );
};

export default Menu;
