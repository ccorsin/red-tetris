import React from 'react';
import ReactDom from 'react-dom';
import { shallow } from 'enzyme';
// import { Tetriminos } from '../../../server/models'
import Header from '../Header';
import toJson from "enzyme-to-json";
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
})