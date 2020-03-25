import React from 'react';
import ReactDom from 'react-dom';
import { Router } from 'react-router-dom';
import Playground from '../Playground';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
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
    const setIsAlert = jest.fn();
    const setIsRunning = jest.fn();
    const setAlertMessage = jest.fn();
    // const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
    // ReactDom.render(
    //   <Provider store={store}>
    //     <Router history={historyMock}>
    //       <Playground setIsAlert={""} setAlertMessage={""} setIsRunning={""}/>
    //     </Router>
    //   </Provider>, div)
    // ReactDom.unmountComponentAtNode(div)
    const playground = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/room/#0[op]']}>
          <Playground path='/room' setIsAlert={setIsAlert} setIsRunning={setIsRunning} setAlertMessage={setAlertMessage}/>
        </MemoryRouter>
      </Provider>
    )
    console.log(playground.debug())
    expect(playground.find('Header').length).toEqual(0);
    // expect(setIsAlert).not.toHaveBeenCalled();
    // expect(setIsRunning).not.toHaveBeenCalled();
    // expect(setAlertMessage).not.toHaveBeenCalled();

  });
})