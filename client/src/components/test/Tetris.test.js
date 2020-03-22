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

// describe('<Tetris/> Component', () => {
//   it('rendering correctly with no shapes', () => {
//     const div = document.createElement('div')
//     ReactDom.render(
//       <Provider store={store}>
//         <Tetris socket={io('http://0.0.0.0:3504')} room={42} playerCount={0} />
//       </Provider>, div)
//     ReactDom.unmountComponentAtNode(div)
//   });
// })

describe('<Tetris/> Component', () => {
  it('renders without crashing', () => {
    let wrapper = shallow(
      <Provider store={store}>
        <Tetris socket={io('http://0.0.0.0:3504')} room={42} playerCount={0} />
      </Provider>
    )
    expect(wrapper.html()).toMatchSnapshot()
  });

  it("button role doesn't exist", () => {
    const { queryByTestId } = render(
      <Provider store={store}>
        <Tetris socket={io('http://0.0.0.0:3504')} room={42} playerCount={0}/>
      </Provider>);
    expect(queryByTestId(/role/i)).toBeNull();
    expect(queryByTestId(/tabIndex/i)).toBeNull();
    expect(queryByTestId(/onKeyDown/i)).toBeNull();
    expect(queryByTestId(/onKeyUp/i)).toBeNull();
    // expect(queryByTestId(/myTetris/i)).toBe(<Stage></Stage><div></div>);
    // expect(queryByTestId(/myGB/i)).toBe(<div></div>);
    // expect(queryByTestId(/otherTetris/i)).toBe(<div></div>);
    // expect(queryByTestId(/myGO/i)).toBeNull();
  });

  it("gamebar text at initialization", () => {
    const { getByTestId, getAllByTestId } = render(
      <Provider store={store}>
        <Tetris socket={io('http://0.0.0.0:3504')} room={42} playerCount={1} />
      </Provider>);
    expect(getByTestId(/myGB/i).textContent).toBe("NEXTSCORE0ROWS0LEVEL0");
  });


  describe('<TestComponent />', () => {
    let wrapper;
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation((init) => [init, setState]);

    beforeEach(() => {
      wrapper = shallow(
        <Provider store={store}>
          <Tetris socket={io('http://0.0.0.0:3504')} room={42} playerCount={0} />
        </Provider>
      );
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    describe('Count Up', () => {
      it('callswhat', () => {
        wrapper.find('Tetris').props().onKeyDown;
        console.log(wrapper.find('Tetris').props())
        expect(setState).toHaveBeenCalledWith([20, 20, 20, 20, 20, 20, 20, 20, 20, 20]);
        expect(setState).toHaveBeenCalledWith(0);
        expect(setState).toHaveBeenCalledWith(expect.any(Function));
      });
    });

  });

  it('It should simulate ArrowDown events', () => {
    const onKeyDown = sinon.spy();
    const wrapper = shallow(
      <Provider store={store}>
        <Tetris socket={io('http://0.0.0.0:3504')} room={42} playerCount={1} onKeyDown={onKeyDown}/>
      </Provider>
    );
    const input = wrapper.find('Tetris');
    input.simulate('keyDown', {
      keyCode: 40,
      which: 40,
      key: "ArrowDown"
    });
    console.log(onKeyDown) // [Function]
    // expect(onKeyDown).toHaveBeenCalled();  //  // Matcher error: received value must be a mock or spy function / Received has type: function / Received has value: [Function anonymous]
    expect(onKeyDown.called).toBe(true);
  });
  it('It should simulate ArrowLeft events', () => {
    const onKeyDown = sinon.spy();
    const wrapper = shallow(
      <Provider store={store}>
        <Tetris socket={io('http://0.0.0.0:3504')} room={42} playerCount={1} onKeyDown={onKeyDown} />
      </Provider>
    );
    const input = wrapper.find('Tetris');
    input.simulate('keyDown', {
      keyCode: 37,
      which: 37,
      key: "ArrowLeft"
    });
    console.log(onKeyDown) // [Function]
    // expect(onKeyDown).toHaveBeenCalled();  //  // Matcher error: received value must be a mock or spy function / Received has type: function / Received has value: [Function anonymous]
    expect(onKeyDown.called).toBe(true);
  });
  it('It should simulate ArrowRight events', () => {
    const onKeyDown = sinon.spy();
    const wrapper = shallow(
      <Provider store={store}>
        <Tetris socket={io('http://0.0.0.0:3504')} room={42} playerCount={1} onKeyDown={onKeyDown} />
      </Provider>
    );
    const input = wrapper.find('Tetris');
    input.simulate('keyDown', {
      keyCode: 39,
      which: 39,
      key: "ArrowRight"
    });
    console.log(onKeyDown) // [Function]
    // expect(onKeyDown).toHaveBeenCalled();  //  // Matcher error: received value must be a mock or spy function / Received has type: function / Received has value: [Function anonymous]
    expect(onKeyDown.called).toBe(true);
  });
  it('It should simulate ArrowUp events', () => {
    const onKeyDown = sinon.spy();
    const wrapper = shallow(
      <Provider store={store}>
        <Tetris socket={io('http://0.0.0.0:3504')} room={42} playerCount={1} onKeyDown={onKeyDown} />
      </Provider>
    );
    const input = wrapper.find('Tetris');
    input.simulate('keyDown', {
      keyCode: 38,
      which: 38,
      key: "ArrowUp"
    });
    console.log(onKeyDown.called) // [Function]
    // expect(onKeyDown).toHaveBeenCalled();  //  // Matcher error: received value must be a mock or spy function / Received has type: function / Received has value: [Function anonymous]
    expect(onKeyDown.called).toBe(true);
  });
  it('It should simulate onKeyUp events', () => {
    const onKeyUp = sinon.spy();
    const wrapper = shallow(
      <Provider store={store}>
        <Tetris socket={io('http://0.0.0.0:3504')} room={42} playerCount={1} onKeyUp={onKeyUp} />
      </Provider>
    );
    const input = wrapper.find('Tetris');
    input.simulate('keyUp', {
      keyCode: 38,
      which: 38,
      key: "ArrowUp"
    });
    console.log(onKeyUp.called) // [Function]
    // expect(onKeyDown).toHaveBeenCalled();  //  // Matcher error: received value must be a mock or spy function / Received has type: function / Received has value: [Function anonymous]
    expect(onKeyUp.called).toBe(true);
  });

  // it('test component attributes', () => {
  //     const wrapper = mount(
  //     <Provider store={store}>
  //       <Tetris socket={io('http://0.0.0.0:3504')} room={42} playerCount={1} />
  //     </Provider>
  //   );
  //   expect(wrapper.find('Tetris').props()).toEqual({
  //     role: "button",
  //     tabIndex: "0",
  //     onKeyDown:  expect.any(Function),
  //     onKeyUp:  expect.any(Function)
  //   });
  // });

  // it("should call preventDefault", () => {
  //   const mockPreventDefault = jest.fn();
  //   const onKeyDown = {
  //     preventDefault: mockPreventDefault
  //   };
  //   const wrapper = shallow(
  //     <Provider store={store}>
  //       <Tetris socket={io('http://0.0.0.0:3504')} room={42} playerCount={1} onKeyDown={onKeyDown} />
  //     </Provider>
  //   );
  //   const input = wrapper.find('Tetris');
  //   input.simulate('keyDown', {
  //     keyCode: 38,
  //     which: 38,
  //     key: "ArrowUp"
  //   });
  //   // wrapper.instance().handleSubmit(mockEvent);
  //   expect(onKeyDown).toHaveBeenCalled();  //  // Matcher error: received value must be a mock or spy function / Received has type: function / Received has value: [Function anonymous]
  //   // expect(mockPreventDefault).toHaveBeenCalled();
  // });

  // it('It should simulate keydown events', () => {
  //   const { getByTestId } = render(
  //     <Provider store={store}>
  //       <Tetris socket={io('http://0.0.0.0:3504')} room={42} playerCount={1} />
  //     </Provider>);
  //     expect(getByTestId('tetetetris')).toHaveAttribute('role');
  //     expect(getByTestId('tetetetris')).toHaveAttribute('tabIndex');
  //     expect(getByTestId('tetetetris')).toHaveAttribute('onKeyDown', expect.any(Function));
  //     expect(getByTestId('tetetetris')).toHaveAttribute('onKeyUp');
  //   });

})
