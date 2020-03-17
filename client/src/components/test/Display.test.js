import React from 'react'
import { shallow } from 'enzyme';
import Display from '../Display';
import toJson from "enzyme-to-json"

describe('<Display/> Component', () => {
  it('rendering correctly Display', () => {
    let wrapper = shallow(
      <Display text='text' number='42'/>
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})