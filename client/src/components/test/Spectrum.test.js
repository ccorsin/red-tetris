import React from 'react'
import ReactDom from 'react-dom'
import { shallow } from 'enzyme';

import Spectrum from '../Spectrum';

import toJson from "enzyme-to-json";
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

describe('<Spectrum/> Component', () => {
    it('rendering correctly with no shapes', () => {
      const div = document.createElement('div');
      ReactDom.render(
        <Provider store={store}>
          <Spectrum/>
        </Provider>, div)
      ReactDom.unmountComponentAtNode(div)

    });
});
