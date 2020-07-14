import React from 'react';
import { shallow } from 'enzyme';
import { mockLaunches } from './mockLaunches';
import { Grid, createMuiTheme, ThemeProvider, Typography, CircularProcess } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import * as api from './apiCalls';
import App from './App';

describe('App', () => {
  api.getUpcomingLaunches = jest.fn().mockImplementation(() => {
    return Promise.resolve(mockLaunches);
  });

  api.getPastLaunches = jest.fn().mockImplementation(() => {
    return Promise.resolve(mockLaunches);
  });

  const wrapper  = shallow(<App />);

  it('should match snapshot when app is loading', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match default state', () => {
    const expectedDefaultState = {
      upcomingLaunches: null,
      pastLaunches: null,
      darkMode: false,
      error: null,
      loading: true,
      timeframe: false,
      numResults: 10
    };
    expect(wrapper.state()).toEqual(expectedDefaultState);
  });

  it('toggleLaunchTimeFrames should toggle timeframe in state', () => {
    expect(wrapper.state('timeframe')).toEqual(false);
    wrapper.instance().toggleLaunchTimeFrames();
    expect(wrapper.state('timeframe')).toEqual(true);
  });

  it('setTimeFrame should be able to set a specific timeframe bool', () => {
    expect(wrapper.state('timeframe')).toEqual(true);
    wrapper.instance().setTimeFrame(false);
    expect(wrapper.state('timeframe')).toEqual(false);
  });

  it('setNumResults should update state with a new number', () => {
    expect(wrapper.state('numResults')).toEqual(10);
    wrapper.instance().setNumResults(25);
    expect(wrapper.state('numResults')).toEqual(25);
  });

  it('returnTodaysDate should return ten character dates', () => {
    const todaysDate = wrapper.instance().getTodaysDate();
    expect(todaysDate.length).toEqual(10);
  });

  it('getOneMonthBackDate should return a ten digit date', () => {
    const oneMonthBackDate = wrapper.instance().getOneMonthBackDate();
    console.log(oneMonthBackDate);
    expect(oneMonthBackDate.length).toEqual(10);
  })
});