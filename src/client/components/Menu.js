import React, { useState } from "react";

const Menu = ({ playerName, roomNb, goToRoom }) => {
    const reg = /^([\d]+)$/;
    const [isValid, setisValid] = useState(false);
    const checkRoom = value => {
        if (reg.exec(value)) {
            setisValid(true);
            roomNb(value);
        } else {
            setisValid(false);
            roomNb("");
        }
    };
    
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
