import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import io from "socket.io-client";
import { StyledApp, StyledTitle } from '../components/styles/StyledApp';
import "../components/styles/Style.css";

import { HashRouter, Route, Switch } from 'react-router-dom';

import Playground from "../components/Playground";
import NotFound from '../components/NotFound';
import Menu from "../components/Menu";

const socket = io('http://0.0.0.0:3504');

const App = () => {

  const [isRunning, setIsRunning] = useState(false);

  // TO DO STYLE HERE
  let playground = <span>Game is currently running in this room.</span>;

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
        <StyledTitle>
          <span style={{ color: 'red' }}>T</span>
          <span style={{ color: 'orange' }}>E</span>
          <span style={{ color: 'yellow' }}>T</span>
          <span style={{ color: 'green' }}>R</span>
          <span style={{ color: 'blue' }}>I</span>
          <span style={{ color: 'purple' }}>S</span>
        </StyledTitle>
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