import React, { useEffect, useState } from 'react';
import { connect, useSelector, useStore } from 'react-redux';
import io from 'socket.io-client';
import { StyledApp, StyledTitle } from '../components/styles/StyledApp';
import '../components/styles/Style.css';
 
import { HashRouter, Route, Switch } from 'react-router-dom';

import Playground from '../components/Playground';
import NotFound from '../components/NotFound';
import Menu from '../components/Menu';
// import Alert from '../components/Alert';

const socket = io('http://0.0.0.0:3504');

const App = () => {
  const store = useStore();
  const [isRunning, setIsRunning] = useState(false);
  const [isAlert, setIisAlert] = useState(false);
  const [message, setMessage] = useState("");
  let alertOn = useSelector(state => state.alert.message);

  // TO DO STYLE HERE
  let playground = <span>Game is currently running in this room.</span>;

  if (isRunning !== true) {
    playground = <Playground socket={socket}/>
  }

  // useEffect(() => {
    console.log("in hook")
    console.log(store.getState().alert)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [alertOn]);

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
          <span style={{ color: 'limegreen' }}>R</span>
          <span style={{ color: 'blue' }}>I</span>
          <span style={{ color: 'purple' }}>S</span>
        </StyledTitle>
        <Switch>
          <Route path="/" exact component={Menu} />
          <Route path="/room" component={() => playground} />
          <Route component={NotFound} />
        </Switch>
      </StyledApp>
      {alertOn}
    </HashRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    message: state.message
  }
}
export default connect(mapStateToProps, null)(App)