import React from 'react'
import { shallow } from 'enzyme';
import Menu from '../Menu';
import toJson from "enzyme-to-json"

describe('<Menu/> Component', () => {
  it('rendering correctly Menu', () => {
    let wrapper = shallow(
      <Menu/>
    )
    expect(wrapper.html()).toMatchSnapshot()
  })
})