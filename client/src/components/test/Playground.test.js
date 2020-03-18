import React from 'react';
import ReactDom from 'react-dom';
import { Router } from 'react-router-dom';
import Playground from '../Playground';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import { ioSocketMiddleWare } from '../../middleware/ioSocketMiddleWare';

import socketReducer from "../../reducers/socket";
import tetriminosReducer from "../../reducers/tetriminos";

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

describe('<Playground/> Component', () => {
  it('rendering correctly with no shapes', () => {
    const div = document.createElement('div')
    const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
    ReactDom.render(
      <Provider store={store}>
            <Router history={historyMock}>
                <Playground setIsAlert={""} setAlertMessage={""} setIsRunning={""}/>
            </Router>
      </Provider>, div)
    ReactDom.unmountComponentAtNode(div)
  });
})