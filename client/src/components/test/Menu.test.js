import React from 'react';
import { Router, MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import { useHistory } from "react-router-dom";
import { render, fireEvent } from '@testing-library/react';
import Menu from '../Menu';
import NotFound from '../NotFound';
import toJson from "enzyme-to-json"

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('RouteMenu', () => {
  it('Redirects to correct URL on click', () => {
    const wrapper = shallow(
      <MemoryRouter initialEntries={[ '/' ]}>
        <Menu />
      </MemoryRouter>,
    );
    expect(wrapper.find(Menu)).toHaveLength(1);
    expect(wrapper.find(NotFound)).toHaveLength(0);
  });

  it('Should have room input', () => {
    const { getByPlaceholderText } = render(
      <MemoryRouter initialEntries={[ '/' ]}>
        <Menu />
      </MemoryRouter>,
    );
    expect(getByPlaceholderText('ROOM')).toMatchObject({
      placeholder:'ROOM', type:'text'})
  });

  // it('Should have room input field with propoer props', () => {
  //   const container = mount(
  //     <MemoryRouter initialEntries={['/']}>
  //       <Menu />
  //     </MemoryRouter>,
  //   );
  //   expect(container.find('input[placeholder="ROOM"]').props()).toEqual({
  //     placeholder: 'ROOM',
  //     type: 'text',
  //     onChange: expect.any(Function),
  //   });
  // });

  // it('Should have room input field', () => {
  //   const container = mount(
  //     <MemoryRouter initialEntries={['/']}>
  //       <Menu />
  //     </MemoryRouter>,
  //   );
  //   expect(container.find('input[placeholder="ROOM"]').length).toEqual(1);
  // });

  it('Should have player input', () => {
    const { getByPlaceholderText } = render(
      <MemoryRouter initialEntries={[ '/' ]}>
        <Menu />
      </MemoryRouter>,
    );
    expect(getByPlaceholderText('PLAYER')).toMatchObject({
      placeholder:'PLAYER', type:'text'})
  });

  it('Should have button', () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={[ '/' ]}>
        <Menu />
      </MemoryRouter>,
    );
    const mockSubmit= jest.fn();
    getByRole('button').goToRoom = mockSubmit;
    getByRole('button').goToRoom();
    fireEvent.click(getByRole('button'));
    expect(mockSubmit).toHaveBeenCalled();
  });

  // test state
  // it('component state.expanded is false', function () {
  //   const wrapper = mount(
  //     <MemoryRouter initialEntries={['/']}>
  //       <Menu />
  //     </MemoryRouter>,
  //   );
  //   console.log(wrapper.state('roomIsValid'))
  //   console.log(wrapper.state('playerIsValid'))
  //   console.log(wrapper.state('player'))
  //   console.log(wrapper.state('roomNb'))
  //   console.log(wrapper.state())
  //   // expect(wrapper.state('roomIsValid')).to.be.false;
  // });

  it('Button should be disabled', () => {
    // const { getByRole } = render(
    //   <MemoryRouter initialEntries={['/']}>
    //     <Menu />
    //   </MemoryRouter>,
    // );
    // expect(getByRole('button')).toHaveAttribute('disabled');
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <Menu />
      </MemoryRouter>,
    );
    const submitButton = wrapper.find('button');
    submitButton.simulate('click');
    expect(submitButton.prop('disabled')).toBe(true);
  });

  it('Input for player name change values', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <Menu />
      </MemoryRouter>,
    );
    const formName = wrapper.find('input[placeholder="PLAYER"]');
    formName.simulate('change', { target: { value: 'Hello' } });
    expect(wrapper.find('input[placeholder="PLAYER"]').prop('value')).toBe('Hello');
  });

  it('Input for room nb change values', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <Menu />
      </MemoryRouter>,
    );
    const formRoom = wrapper.find('input[placeholder="ROOM"]');
    formRoom.simulate('change', { target: { value: '123' } });
    expect(wrapper.find('input[placeholder="ROOM"]').prop('value')).toBe('123');
  });

  it('Should have error displayed onMouseOver', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <Menu />
      </MemoryRouter>,
    );
    console.log((wrapper.find('span[test="player"]').exists))
    // wrapper.find('.menu_input').simulate("mouseover");
    expect(wrapper.find('span[test="player"]').exists).toBeTruthy();
    // expect(wrapper.find('.menu_input').exists).toBeTruthy();
    // expect(wrapper.find('.menu_input')).toBeNull();
  });

  //
  it('', () => {

  });

  // it('Input change enable submit', () => {
  //   const onChangeMock = jest.fn();
  //   const wrapper = mount(
  //     <MemoryRouter initialEntries={['/']}>
  //       <Menu />
  //     </MemoryRouter>,
  //   );
  //   const formRoom = wrapper.find('input[placeholder="ROOM"]');
  //   formRoom.simulate('change', { target: { value: '123' } });
  //   expect(wrapper.find('input[placeholder="ROOM"]').prop('value')).toBe('123');
  //   // test valid input values
  //   // test if onChange have been called
  // });
});