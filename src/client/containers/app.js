import React, { useEffect, useState } from 'react'
import { StyledApp } from '../components/styles/StyledApp';

import { connect } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'
import io from 'socket.io-client'
const socket = io('http://0.0.0.0:3004');

import Playground from "./Playground";
import NotFound from '../components/NotFound';
// import Menu from "../components/Menu";

const App = ({ message }) => {
  // let room = "";
  // let username = "";

  // const reg = /(\/#[\d]+)(\[\w+\])/;
  // const params = reg.exec(window.location.href);
  // if (params !== null) {
  //   room = params[1].slice(9);
  //   username = params[2].slice(1, -1);
  // }

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