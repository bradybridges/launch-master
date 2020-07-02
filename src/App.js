import React from 'react';
import Header from './Components/Header/Header';
import LaunchCard from './Components/LaunchCard/LaunchCard';

import { Grid, createMuiTheme, ThemeProvider, Typography } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

import { getUpcomingLaunches } from './apiCalls';

class App extends React.Component {
  state = {
    launches: null,
    darkMode: false,
    error: null,
    loading: true,
  };

  componentDidMount = async () => {
    try {
      const launches = await getUpcomingLaunches(10);
      this.setState({ launches, loading: false });
    } catch(e) {
      console.log(e);
      this.setState({ error: e, loading: false });
    }
  }

  toggleDarkMode = () => {
    const { darkMode } = this.state;
    this.setState({ darkMode: !darkMode });
  }

  renderUpcomingLaunches = () => {
    const { launches } = this.state;

    if(launches) {
      return launches.launches.map((launch) => {
        return (
          <Grid item direction="column" xs={12} md={10} lg={8} key={launch.name}>
            <LaunchCard launch={launch}/>
          </Grid>
        );
      });
    } else {
      return <h1>We couldn't find any upcoming launches...</h1>;
    }
  }
  
  
  render() {
    const { darkMode, loading } = this.state;
    const theme = createMuiTheme({
      palette: {
        type: darkMode ? 'dark': 'light',
        primary: {
          main: darkMode ? '#000': '#3f51b5',
          contrastText: darkMode ? '#000': '#fafafa',
        },
        background: {
          paper: darkMode ? '#000': '#fff',
          default: darkMode ? '#000': '#fafafa',
        }
      },
      typography: {
        h1: {
          color: darkMode ? red[400]: '#fff',
        }
      }
    })
    return (
      <ThemeProvider theme={theme}>
        <main style={{ backgroundColor: darkMode ? '#000': '#fafafa' }}>
          <Header toggleDarkMode={this.toggleDarkMode}/>
          {loading ? <h1>Loading...</h1> : (
            <Grid
              container
              justify="center"
              alignItems="center"
              style={{ padding: '20px 0px'}}
            >
              {this.renderUpcomingLaunches()}
            </Grid>
          )}
        </main>
      </ThemeProvider>
    );
  }
}

export default App;
