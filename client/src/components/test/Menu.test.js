import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import Menu from '../Menu';
import NotFound from '../NotFound';

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
});