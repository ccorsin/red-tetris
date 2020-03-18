import React from 'react';
import { Router } from 'react-router-dom';
import { shallow } from 'enzyme';
import { useHistory } from "react-router-dom";
import Menu from '../Menu';
import toJson from "enzyme-to-json"

describe('<Menu/> Component', () => {
  it('rendering correctly Menu', () => {
    const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
    let wrapper = shallow(
      <Router history={historyMock}>
        <Menu/>
      </Router>
    )
    expect(wrapper.html()).toMatchSnapshot()
  })
})