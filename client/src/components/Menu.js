import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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
    <div>
      <div>
        <input
          type="text"
          placeholder="PLAYER"
          onChange={e => checkPlayer(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="ROOM"
          onChange={e => checkRoom(e.target.value)}
        />
        <span role="alert" id="error-name-required">
          Only numbers.
        </span>
      </div>
      <div>
        <button onClick={e => goToRoom(true)} disabled={!isValid}>
          PLAY
        </button>
      </div>
    </div>
  );
};

export default Menu;
