import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { StyledApp, StyledTitle } from '../components/styles/StyledApp';
import '../components/styles/Style.css';
 
import { HashRouter, Route, Switch, Redirect, Link } from 'react-router-dom';

import Playground from '../components/Playground';
import NotFound from '../components/NotFound';
import Menu from '../components/Menu';
import Alert from '../components/Alert';
import { StyledHomeButton } from "../components/styles/StyledHomeButton";

const socket = io('http://0.0.0.0:3504');

const App = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const turnOffAlert = (calling) => {
    setIsAlert(calling);
    setAlertMessage("");
  };

  const leaveRoom = () => {
    turnOffAlert(false);
    // TO DO dispatch a leave room function
    return <Redirect to="/" />;
  };

  useEffect(() => {
    socket.on("message", function (message) {
      setIsAlert(true);
      setAlertMessage(message);
    });
    socket.on("isRunning", function() {
      setIsRunning(true);
      setIsAlert(true);
      setAlertMessage("A game is currently running in this room. Please chose another number.");
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
          <span style={{ color: 'limegreen' }}>R</span>
          <span style={{ color: 'blue' }}>I</span>
          <span style={{ color: 'purple' }}>S</span>
        </StyledTitle>
        {isAlert ? <Alert message={alertMessage} turnOffAlert={turnOffAlert}/> : <div></div> }
        <Switch>
          <Route path="/" exact component={Menu} />
          <Route path="/room">
            {isRunning ? <Redirect to="/" /> : <Playground socket={socket} />}
          </Route>
          <Route component={NotFound} />
        </Switch>
        <Link to="/">
          <StyledHomeButton onClick={() => { leaveRoom(); }}> T </StyledHomeButton>
        </Link> 
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