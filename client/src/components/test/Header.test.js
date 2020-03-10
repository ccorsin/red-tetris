import React from 'react'
import { shallow } from 'enzyme';
// import { Tetriminos } from '../../../server/models'
import Header from '../Header'
import toJson from "enzyme-to-json"

describe('<Header/> Component', () => {
  it('rendering correctly with no shapes', () => {
    let wrapper = shallow(
      <Header playerCount='1' commands='0'/>
    )
    expect(wrapper).toMatchSnapshot();
  });
  // it('rendering correctly with shapes', () => {
  //   // const tetriminos = new Tetriminos
  //   // let tetro = []
  //   // for (let i = 0; i < 5; i++) {
  //   //   tetro.push(tetriminos.randomTetromino())
  //   // }
  //   let wrapper = shallow(
  //     <Header playerCount='1' commands='0'/>
  //   )
  //   expect(toJson(wrapper)).toMatchSnapshot()
  // })
})