import React from 'react';
import ReactDom from 'react-dom';
import { Router } from 'react-router-dom';
import { shallow } from 'enzyme';
import Tetris from '../Tetris';
import toJson from "enzyme-to-json";
import { createLogger } from 'redux-logger';
import sinon from "sinon";
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
  it('rendering correctly with no shapes', () => {
    let wrapper = shallow(
      <Provider store={store}>
        <Tetris socket={io('http://0.0.0.0:3504')} room={42} playerCount={0} />
      </Provider>
    )
    expect(wrapper.html()).toMatchSnapshot()
  });
})

// describe('<Tetris/> Component', () => {
//   // const onKeyDown = sinon.spy();
//   // const div = document.createElement('div');
//   let wrapper;
//   // let spy;

//   const setState = jest.fn();
//   const useStateSpy = jest.spyOn(React, 'useState');
//   useStateSpy.mockImplementation((init) => [init, setState]);

//   beforeEach(() => {
//     wrapper = shallow(<Provider store={store}><Tetris socket={io('http://0.0.0.0:3504')} room={42} playerCount={1} /></Provider>);
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('has the initial state nextTetromino of []', () => {
//     console.log(wrapper.state().debug())

//     expect(wrapper.state('nextTetromino')).toEqual([]);
//   })

//   // it("should match the snapshot", () => {
//   //   expect(wrapper).toMatchSnapshot();
//   // });

//   // it('It should simulate keydown events', () => {
//   //   spy = jest.spyOn(wrapper.instance(), 'onKeyDown');
//   //   // const input = wrapper.find('div');
//   //   wrapper.instance().forceUpdate();
//   //   const mockEvent = {
//   //     target: {
//   //       e: "37",
//   //     }
//   //   };
//   //   wrapper.find("div").simulate("move", mockEvent);
//     // console.log(onKeyDown.called)
//     // input.simulate('keyDown', { keyCode: 40 });
//   //   expect(onKeyDown.called).to.be.true;

//   // });

//   // it('It should simulate keydown events', () => {
//   //   const onKeyDown = sinon.spy();
//   //   const wrapper = shallow(<Provider store={store}><Tetris socket={io('http://0.0.0.0:3504')} room={42} playerCount={1} onKeyDown={onKeyDown}/></Provider>);
//   //   const input = wrapper.find('div');
//   //   // console.log(input.debug())
//   //   input.simulate('keyDown', { keyCode: 40 });

//   //   expect(onKeyDown.called).to.be.true;
//   // });
// });