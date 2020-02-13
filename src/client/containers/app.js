import React, { useEffect, useState } from 'react'
import { StyledApp } from '../components/styles/StyledApp';

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  // useRouteMatch
} from "react-router-dom";

import history from "../history";

import { connect } from 'react-redux'
import io from 'socket.io-client'
import Playground from "./Playground";
import Menu from "../components/Menu";

const socket = io('http://0.0.0.0:3004');

const App = ({message}) => {

  // Set menu value
  const [player, setPlayer] = useState("PLAYER");
  const [roomNb, setRoomNb] = useState("");
  const [go, setGo] = useState(false);
  const [path, setPath] = useState("/");

  // send ids to socket
  if (go) {
    socket.emit("room", roomNb, player);
    setPath("/tetris/#"+roomNb+"["+player+"]");
    setPlayer("PLAYER");
    setRoomNb("");
    setGo(false);
    history.push(path);
  }

  let room = "";
  let username = "";
  useEffect(() => {
    console.log(path);
    // SI params dans l'URL => Playground
    const reg = /(\/tetris\/#[\d]+)(\[\w+\])/;
    const params = reg.exec(window.location.href);
    if (params !== null) {
      room = params[1].slice(9);
      username = params[2].slice(1, -1);

      // let match = useRouteMatch("/tetris/");
      // return <Playground socket={socket} room={room} username={username} />;
    }
  }, []);
 
  return (
    <StyledApp>
      <Router history={history}>
        <Route path="/tetris/">
          <Playground socket={socket} room={room} username={username} />
        </Route>
        <Route exact path="/">
          <Menu playerName={setPlayer} roomNb={setRoomNb} goToRoom={setGo} />
        </Route>
      </Router>
    </StyledApp>
  );
}

const mapStateToProps = (state) => {
  return {
    message: state.message
  }
}
export default connect(mapStateToProps, null)(App)