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

  // it('turn off alert on click', () => {
  //   const mockTurnoffAlert = jest.fn();
  //   const wrapper = shallow(<Alert message='alert' turnOffAlert={mockTurnoffAlert}/>);
  //   console.log(wrapper.find('.styled.button'))
  //   wrapper.find(styled.button).simulate('click');
  //   expect(mockTurnoffAlert).toHaveBeenCalled();
  // })
})