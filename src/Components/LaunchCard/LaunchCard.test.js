import React from 'react';
import { shallow } from 'enzyme';
import { mockLaunchWithAllData, mockLaunchMissingData } from '../../mockLaunches';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import VideoCam from '@material-ui/icons/Videocam';
import LaunchCard from './LaunchCard';

describe('LaunchCard', () => {
  it('should match snapshot when probabily, vidURLs, launch confirmed, fail reason, missions, rocket config, pads, and status are defined or OK', () => {
    const wrapperWithPercentage = shallow(<LaunchCard launch={mockLaunchWithAllData}/>);
    expect(wrapperWithPercentage).toMatchSnapshot();
  });

  it('Component should show alternate text or not display elements at all if data is undefined', () => {
    const wrapperDataMissing = shallow(<LaunchCard launch={mockLaunchMissingData} />);
    expect(wrapperDataMissing).toMatchSnapshot();
  });
});