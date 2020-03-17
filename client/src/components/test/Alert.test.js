import React from 'react'
import { shallow } from 'enzyme';
import Alert from '../Alert';
import toJson from "enzyme-to-json"

describe('<Alert/> Component', () => {
  it('rendering correctly Alert', () => {
    let wrapper = shallow(
      <Alert message='alert' turnOffAlert=''/>
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})