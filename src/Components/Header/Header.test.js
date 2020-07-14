import React from 'react';
import { Switch, Typography } from '@material-ui/core';
import { shallow } from 'enzyme';
import Header from './Header';

describe('Header', () => {
  const mockToggleDarkMode = jest.fn();
  const wrapper = shallow(<Header  toggleDarkMode={mockToggleDarkMode} darkMode={true}/>);
  it('Header should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('There should be one switch button present in the header to toggle dark and light theme', () => {
    expect(wrapper.find(Switch)).toHaveLength(1);
  });

  it('When the switch is clicked toggleDarkMode should be called', () => {
    const toggle = wrapper.find(Switch);
    toggle.props().onChange();
    expect(mockToggleDarkMode).toHaveBeenCalled();
  });

  it('The dark mode toggle should be accompanied by typographys with children light and dark', () => {
    const light = wrapper.find(Typography).at(1).props();
    const dark = wrapper.find(Typography).at(2).props();
    const expectedLight = { style: { display: 'inline' }, children: 'Light' };
    const expectedDark = { style: { display: 'inline' }, color: 'secondary', children: 'Dark' };
    expect(light).toEqual(expectedLight);
    expect(dark).toEqual(expectedDark);
  })

  it('There should be an h1 header with a value of Launch Master', () => {
    const header = wrapper.find(Typography).first().props();
    expect(header.variant).toEqual('h1');
    expect(header.children).toEqual('Launch Master');
  })

})