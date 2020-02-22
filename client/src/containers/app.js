import React from 'react'
import { connect } from "react-redux";
import io from "socket.io-client";
import { StyledApp } from '../components/styles/StyledApp';

import Playground from "./Playground";
// import NotFound from '../components/NotFound';
// import Menu from "../components/Menu";

// import {
//   BrowserRouter as Router,
//   // Redirect,
//   Switch,
//   Route,
//   // useRouteMatch
// } from "react-router-dom";
// import history from "../history";

const socket = io('http://0.0.0.0:3004');


const App = ({ message }) => {
  // let room = "";
  // let username = "";
  // const reg = /(#[\d]+)(\[\w+\])/;
  // const params = reg.exec(window.location.href);
  // if (params !== null) {
  //   room = params[1].substring(1);
  //   username = params[2].slice(1, -1);
  // }
  //   let match = useRouteMatch("/tetris/");
  //   return <Playground socket={socket} room={room} username={username} />;
  // }
  // }, []);
 
  return (
      <StyledApp>
        <Playground socket={socket} message={message}/>
        {/* <NotFound /> */}
      </StyledApp>
  );
}

const mapStateToProps = (state) => {
  return {
    message: state.message
  }
}
export default connect(mapStateToProps, null)(App)