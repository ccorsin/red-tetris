import React from 'react'
import { shallow } from 'enzyme';
import DisplayTetromino from '../DisplayTetromino';
import toJson from "enzyme-to-json"

describe('<DisplayTetromino/> Component', () => {
  it('rendering correctly DisplayTetromino', () => {
    const tetro = { color: '255, 255, 0', shape: [["O", "0"],["O", "O"]]};
    let wrapper = shallow(
      <DisplayTetromino text={'text'} tetro={tetro}/>
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})