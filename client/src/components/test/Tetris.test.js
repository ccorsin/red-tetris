import React from 'react';
import ReactDom from 'react-dom';
import { Router } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import Tetris from '../Tetris';
import Stage from '../Stage';
import toJson from "enzyme-to-json";
import { createLogger } from 'redux-logger';
import sinon from "sinon";
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { render, fireEvent, getByTestId, getByRole, getAllByTestId } from '@testing-library/react';
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
  const socket = io('http://0.0.0.0:3504');

  it('rendering correctly with no shapes', () => {
    const div = document.createElement('div')
    ReactDom.render(
      <Provider store={store}>
        <Tetris socket={socket} room={42} playerCount={0} />
      </Provider>, div)
    ReactDom.unmountComponentAtNode(div)
  });
  it('renders without crashing', () => {
    let wrapper = shallow(
      <Provider store={store}>
        <Tetris socket={socket} room={42} playerCount={0} />
      </Provider>
    )
    expect(wrapper.html()).toMatchSnapshot()
  });
  // it("button role doesn't exist", () => {
  //   const { queryByTestId } = render(
  //     <Provider store={store}>
  //       <Tetris socket={socket} room={42} playerCount={0}/>
  //     </Provider>);
  //   // expect(queryByTestId(/myTetris/i)).toBe(<Stage></Stage><div></div>);
  //   // expect(queryByTestId(/myGB/i)).toBe(<div></div>);
  //   // expect(queryByTestId(/otherTetris/i)).toBe(<div></div>);
  //   // expect(queryByTestId(/myGO/i)).toBeNull();
  // });

  // it("gamebar text at initialization", () => {
  //   const { getByTestId, getAllByTestId } = render(
  //     <Provider store={store}>
  //       <Tetris socket={socket} room={42} playerCount={1} />
  //     </Provider>);
  //   expect(getByTestId(/myGB/i).textContent).toBe("NEXTSCORE0ROWS0LEVEL0");
  // });

  let wrapper;
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState')
  useStateSpy.mockImplementation((init) => [init, setState]);
  const onKeyDown = sinon.spy();

  beforeEach(() => {
    wrapper = shallow(
      <Provider store={store}>
        <Tetris socket={socket} room={42} playerCount={0} />
      </Provider>
    );
  });
  // <Tetris socket={socket} room={42} playerCount={0} onKeyDown={onKeyDown} />

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should have 234 divs', () => {
    const container = mount(
      <Provider store={store}>
        <Tetris socket={socket} room={42} playerCount={2} />
      </Provider>
    );
    expect(container.find('div').length).toEqual(234);
  });

  // describe('Keydown', () => {
  //   it('It should simulate ArrowDown events', () => {
  //     const input = wrapper.find('Tetris');
  //     input.simulate('keyDown', {
  //       keyCode: 40,
  //       which: 40,
  //       key: "ArrowDown"
  //     });
  //     expect(onKeyDown.called).toBe(true);
  //   });
  //   it('It should simulate ArrowLeft events', () => {
  //     const input = wrapper.find('Tetris');
  //     input.simulate('keyDown', {
  //       keyCode: 37,
  //       which: 37,
  //       key: "ArrowLeft"
  //     });
  //     expect(onKeyDown.called).toBe(true);
  //   });
  //   it('It should simulate ArrowRight events', () => {
  //     const input = wrapper.find('Tetris');
  //     input.simulate('keyDown', {
  //       keyCode: 39,
  //       which: 39,
  //       key: "ArrowRight"
  //     });
  //     expect(onKeyDown.called).toBe(true);
  //   });
  //   it('It should simulate ArrowUp events', () => {
  //     const input = wrapper.find('Tetris');
  //     input.simulate('keyDown', {
  //       keyCode: 38,
  //       which: 38,
  //       key: "ArrowUp"
  //     });
  //     // expect(onKeyDown).toHaveBeenCalled();  //  // Matcher error: received value must be a mock or spy function / Received has type: function / Received has value: [Function anonymous]
  //     expect(onKeyDown.called).toBe(true);
  //   });
  // });
  // describe('Keydown', () => {
  //   it('It should simulate onKeyUp events', () => {
  //     const onKeyUp = sinon.spy();
  //     const wrapper = shallow(
  //       <Provider store={store}>
  //         <Tetris socket={socket} room={42} playerCount={1} onKeyUp={onKeyUp} />
  //       </Provider>
  //     );
  //     const input = wrapper.find('Tetris');
  //     input.simulate('keyUp', {
  //       keyCode: 38,
  //       which: 38,
  //       key: "ArrowUp"
  //     });
  //     console.log(onKeyUp.called) // [Function]
  //     // expect(onKeyDown).toHaveBeenCalled();  //  // Matcher error: received value must be a mock or spy function / Received has type: function / Received has value: [Function anonymous]
  //     expect(onKeyUp.called).toBe(true);
  //   });
  // });

  it('test component attributes', () => {
      const wrapper = mount(
      <Provider store={store}>
        <Tetris socket={socket} room={42} playerCount={1} />
      </Provider>
    );
    expect(wrapper.find('Tetris').props()).toEqual({
      playerCount: 1,
      room: 42,
      socket: socket,
      // role: "button",
      // tabIndex: "0",
  //     onKeyDown:  expect.any(Function),
  //     onKeyUp:  expect.any(Function)
    });
  });


  it('It should simulate keydown events', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Tetris socket={socket} room={42} playerCount={1} />
      </Provider>);
      expect(getByTestId('tetetetris')).toHaveAttribute('role');
      expect(getByTestId('tetetetris')).toHaveAttribute('tabIndex');
      // expect(getByTestId('tetetetris')).toHaveAttribute('onKeyDown', onKeyDown);
      // expect(getByTestId('tetetetris')).toHaveAttribute('onKeyUp');
    });

  // })
})
