import React from 'react'
import { shallow } from 'enzyme';
import DisplayTetromino from '../Display';
import toJson from "enzyme-to-json"

describe('<DisplayTetromino/> Component', () => {
  it('rendering correctly DisplayTetromino', () => {
    let wrapper = shallow(
      <DisplayTetromino text='text' tetro='L'/>
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})