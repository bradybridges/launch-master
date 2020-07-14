import React from 'react';
import { shallow } from 'enzyme';
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

  const mockLaunchWithAllData = {
    failreason: 'The launch failed spontaneously',
    hashtag: null,
    holdreason: null,
    id: 1828,
    infoURL: null,
    infoURLs: ['https://www.nro.gov/Portals/65/documents/news/Press%20Kit_Launch_NROL-129.pdf?ver=2020-07-07-134345-553'],
    inhold: 0,
    isoend: "20200715T130000Z",
    isonet: "20200715T130000Z",
    isostart: "20200715T130000Z",
    location: {
      countryCode: 'USA',
      id: 19,
      infoURL: '',
      name: 'Wallops Island, Virginia, USA',
      pads: [{
        agencies: [{
          abbrev: 'NASA',
          countryCode: 'USA',
          id: 44,
          infoURL: null,
          infoURLs: [
            'http://www.nasa.gov',
            'https://www.youtube.com/channel/UCLA_DiR1FfKNvjuUpBHmylQ',
            'https://twitter.com/nasa',
            'https://facebook.com/nasa'
          ],
          name: 'National Aeronautics and Space Administration',
          type: 1,
          wikiURL: 'http://en.wikipedia.org/wiki/National_Aeronautics_and_Space_Administration',
        }],
        id: 110,
        infoURL: '',
        latitude: 37.831,
        longitude: -75.4911,
        mapURL: 'http://maps.google.com/maps?q=37.831N,75.4911W',
        name: 'Launch Area 0 B, Wallops Island, Virginia',
        wikiURL: '',
      }],
      wikiURL: '',
    },
    lsp: {
      abbrev: 'NGIS',
      countryCode: 'USA',
      id: 257,
      infoURL: null,
      infoURLs: [
        'http://www.northropgrumman.com/AboutUs/BusinessSectors/InnovationSystems/Pages/default.aspx',
        'https://twitter.com/northropgrumman',
        'https://www.facebook.com/NorthropGrumman',
      ],
      name: 'Northrop Grumman Innovation Systems',
      type: 3,
      wikiURL: 'https://en.wikipedia.org/wiki/Northrop_Grumman#Innovation_Systems'
    },
    missions: [{
      agencies: [{
        abbrev: 'NRO',
        countryCode: 'USA',
        id: 101,
        infoURL: null,
        infoURLs: [
          'http://www.nro.gov/',
          'https://www.facebook.com/NationalReconnaissanceOffice',
          'https://twitter.com/NatReconOfc',
          'https://www.youtube.com/c/nationalreconnaissanceoffice'
        ],
        name: 'National Reconnaissance Office',
        type: 1,
        wikiURL: 'https://en.wikipedia.org/wiki/National_Reconnaissance_Office',
      }],
      description: 'Classified payload for the U.S. National Reconnaissance Office.',
      id: 1234,
      name: 'NROL-129',
      type: 7,
      typeName: 'Government/Top Secret', 
    }],
    name: 'Minotaur IV | NROL-129',
    net: 'July 15, 2020 13:00:00 UTC',
    netstamp: 1594818000,
    probability: 90, 
    rocket: {
      agencies: [{
        abbrev: 'OSC',
        countryCode: 'USA',
        id: 100,
        infoURL: null,
        infoURLs: [
          'http://orbital.com',
          'https://www.youtube.com/channel/UCLr1shBflPt0esLOrNFqAPA',
          'https://twitter.com/OrbitalATK',
          'https://www.facebook.com/OrbitalATK',
        ],
        name: 'Orbital Sciences Corporation',
        type: 3,
        wikiURL: 'http://en.wikipedia.org/wiki/Orbital_Sciences_Corporation',
      }],
      configuration: 'IV',
      familyname: 'Minotaur',
      id: 59,
      imageSizes: [320, 400, 640, 720, 768, 800, 960, 1024, 1080, 1280, 1440, 1920],
      imageURL: 'https://launchlibrary1.nyc3.digitaloceanspaces.com/RocketImages/placeholder_1920.png',
      infoURLs: [
        'https://www.orbitalatk.com/flight-systems/space-launch-vehicles/minotaur/docs/BR06005_3862%20MinotaurIV_R1.pdf',
      ],
      name: 'Minotaur IV',
      wikiURL: 'https://en.wikipedia.org/wiki/Minotaur_IV',
    },
    status: 1,
    tbddate: 0,
    tdbtime: 0,
    vidURL: null,
    vidURLs: ['https://www.ustream.tv/channel/nasa-tv-wallops'],
    westamp: 1594818000,
    windowend: 'July 15, 2020 13:00:00 UTC',
    windowstart: 'July 15, 2020 13:00:00 UTC',
    wsstamp: 1594818000,
  };

  const mockLaunchMissingData = {
    failreason: null,
    hashtag: null,
    holdreason: null,
    id: 1828,
    infoURL: null,
    infoURLs: ['https://www.nro.gov/Portals/65/documents/news/Press%20Kit_Launch_NROL-129.pdf?ver=2020-07-07-134345-553'],
    inhold: 0,
    isoend: "20200715T130000Z",
    isonet: "20200715T130000Z",
    isostart: "20200715T130000Z",
    location: {
      countryCode: 'USA',
      id: 19,
      infoURL: '',
      name: 'Wallops Island, Virginia, USA',
      pads: [],
      wikiURL: '',
    },
    lsp: {
      abbrev: 'NGIS',
      countryCode: 'USA',
      id: 257,
      infoURL: null,
      infoURLs: [
        'http://www.northropgrumman.com/AboutUs/BusinessSectors/InnovationSystems/Pages/default.aspx',
        'https://twitter.com/northropgrumman',
        'https://www.facebook.com/NorthropGrumman',
      ],
      name: 'Northrop Grumman Innovation Systems',
      type: 3,
      wikiURL: 'https://en.wikipedia.org/wiki/Northrop_Grumman#Innovation_Systems'
    },
    missions: [],
    name: 'Minotaur IV | NROL-129',
    net: 'July 15, 2020 13:00:00 UTC',
    netstamp: 1594818000,
    probability: null, 
    rocket: {
      agencies: [{
        abbrev: 'OSC',
        countryCode: 'USA',
        id: 100,
        infoURL: null,
        infoURLs: [
          'http://orbital.com',
          'https://www.youtube.com/channel/UCLr1shBflPt0esLOrNFqAPA',
          'https://twitter.com/OrbitalATK',
          'https://www.facebook.com/OrbitalATK',
        ],
        name: 'Orbital Sciences Corporation',
        type: 3,
        wikiURL: 'http://en.wikipedia.org/wiki/Orbital_Sciences_Corporation',
      }],
      configuration: null,
      familyname: 'Minotaur',
      id: 59,
      imageSizes: [320, 400, 640, 720, 768, 800, 960, 1024, 1080, 1280, 1440, 1920],
      imageURL: 'https://launchlibrary1.nyc3.digitaloceanspaces.com/RocketImages/placeholder_1920.png',
      infoURLs: [
        'https://www.orbitalatk.com/flight-systems/space-launch-vehicles/minotaur/docs/BR06005_3862%20MinotaurIV_R1.pdf',
      ],
      name: 'Minotaur IV',
      wikiURL: 'https://en.wikipedia.org/wiki/Minotaur_IV',
    },
    status: 2,
    tbddate: 1,
    tdbtime: 1,
    vidURL: null,
    vidURLs: [],
    westamp: 1594818000,
    windowend: 'July 15, 2020 13:00:00 UTC',
    windowstart: 'July 15, 2020 13:00:00 UTC',
    wsstamp: 1594818000,
  };

  it('should match snapshot when probabily, vidURLs, launch confirmed, fail reason, missions, rocket config, pads, and status are defined or OK', () => {
    const wrapperWithPercentage = shallow(<LaunchCard launch={mockLaunchWithAllData}/>);
    expect(wrapperWithPercentage).toMatchSnapshot();
  });

  it('Component should show alternate text or not display elements at all if data is undefined', () => {
    const wrapperDataMissing = shallow(<LaunchCard launch={mockLaunchMissingData} />);
    expect(wrapperDataMissing).toMatchSnapshot();
  });
});