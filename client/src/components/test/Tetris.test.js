import React from 'react';
import ReactDom from 'react-dom';
import { Router } from 'react-router-dom';
import { shallow } from 'enzyme';
import Tetris from '../Tetris';
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

describe('<Tetris/> Component', () => {
    it('rendering correctly with no shapes', () => {
        const div = document.createElement('div')
        ReactDom.render(
            <Provider store={store}>
                <Tetris socket={io('http://0.0.0.0:3504')} room={42} playerCount={0}/>
            </Provider>, div)
        ReactDom.unmountComponentAtNode(div)
        });
})