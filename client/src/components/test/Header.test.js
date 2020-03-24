import React from 'react';
import ReactDom from 'react-dom';

import Header from '../Header';

import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import { ioSocketMiddleWare } from '../../middleware/ioSocketMiddleWare';

import socketReducer from "../../reducers/socket";
import tetriminosReducer from "../../reducers/tetriminos";

import io from 'socket.io-client';

const initialState = {};
const rootReducer = combineReducers({
    sock: socketReducer,
    tetriminos: tetriminosReducer
});

const middleware = [
    ioSocketMiddleWare,
    thunk,
    createLogger()
];

export const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware))


describe('<Header/> Component', () => {
  it('rendering correctly with no shapes', () => {
    const div = document.createElement('div')
    ReactDom.render(
      <Provider store={store}>
        <Header
          commands={""}
          isLeader={true}
          room={42}
          socket={io('http://0.0.0.0:3504')}/>
      </Provider>, div)
    ReactDom.unmountComponentAtNode(div)
  });
});

// describe('<Header/> Component', () => {
//   it('rendering correctly with no shapes', () => {
//     const div = document.createElement('div')
//     ReactDom.render(
//       <Provider store={store}>
//         <Header/>
//       </Provider>, div)
//     ReactDom.unmountComponentAtNode(div)
  // });
  // it('rendering correctly with shapes', () => {
  //   // const tetriminos = new Tetriminos
  //   // let tetro = []
  //   // for (let i = 0; i < 5; i++) {
  //   //   tetro.push(tetriminos.randomTetromino())
  //   // }
  //   let wrapper = shallow(
  //     <Header playerCount='1' commands='0'/>
  //   )
  //   expect(toJson(wrapper)).toMatchSnapshot()
  // })
// })


/**

  if (isLeader && !isRunning) {
    commands = <span>You can start the game !</span>;
  } else if (!isRunning) {
    commands = <span>Wait for {gameLeader} to start the game !</span>;
  } else {
    commands = <span>Game is ON !</span>;
  }

 */

    // it('contains only a line in a <div> element', () => {
    //   const wrapper = shallow(<Provider store={store}><Header commands={<span>Wait for XXX to start the game !</span>} isLeader={false} /></Provider>);
    //   expect(wrapper).toContainReact(<div></div>);
    // });
    // it('does not contain any <button> element', () => {
    //   const wrapper = shallow(<Provider store={store}><Header commands={<span>Wait for XXX to start the game !</span>} isLeader={false} /></Provider>);
    //   expect(wrapper.find('button').length).toEqual(0);
    // });