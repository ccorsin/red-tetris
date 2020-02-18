import React, { useState } from "react";
import { useHistory } from "react-router-dom";


const Menu = () => {
  let history = useHistory();
  const reg = /^([\d]+)$/;
  const [isValid, setisValid] = useState(false);
  const [player, setPlayer] = useState("PLAYER");
  const [roomNb, setRoomNb] = useState("");

  const checkRoom = value => {
      if (reg.exec(value)) {
          setisValid(true);
          setRoomNb(value);
      } else {
          setisValid(false);
          setRoomNb("");
      }
  };

  const goToRoom = () => {
    if (isValid) {
      history.push("/playground/#" + roomNb + "[" + player + "]");
      socket.emit("room", roomNb, player);
      // setPath("/playground/#" + roomNb + "[" + player + "]");
      setPlayer("PLAYER");
      setRoomNb("");
      setisValid(false);
    }
  }
    
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="PLAYER"
          onChange={e => playerName(e.target.value)}
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
