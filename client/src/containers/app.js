import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import io from "socket.io-client";
import { StyledApp } from '../components/styles/StyledApp';

import { HashRouter, Route, Switch } from 'react-router-dom';

import Playground from "../components/Playground";
import NotFound from '../components/NotFound';
import Menu from "../components/Menu";

const socket = io('http://0.0.0.0:3504');

const App = () => {

  const [isRunning, setIsRunning] = useState(false);

  let playground = <h1>Game is currently running in this room.</h1>;

  if (isRunning !== true) {
    playground = <Playground socket={socket}/>
  }

  useEffect(() => {
    socket.on("isRunning", function() {
      setIsRunning(true)
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HashRouter>
      <StyledApp>
        <Switch>
          <Route path="/" exact component={Menu} />
          <Route path="/room" component={() => playground} />
          <Route component={NotFound} />
        </Switch>
      </StyledApp>

    </HashRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    message: state.message
  }
}
export default connect(mapStateToProps, null)(App)