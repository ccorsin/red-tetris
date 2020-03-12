import React, { useState } from 'react';
import { connect } from 'react-redux';
import { StyledApp, StyledTitle } from '../components/styles/StyledApp';
import '../components/styles/Style.css';
 
import { HashRouter, Route, Switch, Redirect, Link } from 'react-router-dom';
import { useStore, useDispatch } from 'react-redux';

import Playground from '../components/Playground';
import NotFound from '../components/NotFound';
import Menu from '../components/Menu';
import Alert from '../components/Alert';
import { StyledHomeButton } from '../components/styles/StyledHomeButton';


const App = () => {
  const store = useStore();
  const dispatch = useDispatch();

  const [isAlert, setIsAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isRunning, setIsRunning] = useState("");
  const [socket, setSocket] = useState(null);

  const turnOffAlert = (calling) => {
    setIsAlert(calling);
    setAlertMessage("");
  };

  const leaveRoom = () => {
    turnOffAlert(false);
    setIsRunning(false)
    dispatch({ type: "TOGGLE_RUNNING", isRunning: false });
    if (socket !== null) {
      socket.close();
      setSocket(null);
    }
    return <Redirect to="/" />;
  };

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
            {isRunning ? <Redirect to="/" /> : <Playground setIsAlert={setIsAlert} setAlertMessage={setAlertMessage} socket={socket} setSocket={setSocket} setIsRunning={setIsRunning} />}
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