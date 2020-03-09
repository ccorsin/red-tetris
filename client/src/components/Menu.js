import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { StyledMenuWrapper, StyledMenu, StyledImg } from "./styles/StyledMenu";
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
      <div class="imageTitle">
        <img
          src="https://www.pngkit.com/png/full/273-2736039_517-name-of-tetris-shapes-263-colorfulness.png"
          width="100%"
          alt="tetris_title"
        />
      </div>

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
