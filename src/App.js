import React from 'react';
import Header from './Components/Header/Header';
import LaunchCard from './Components/LaunchCard/LaunchCard';

import { Grid, createMuiTheme, ThemeProvider, Typography, CircularProgress } from '@material-ui/core';
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
      console.log('loading');
      const launches = await getUpcomingLaunches(10);
      const localThemePrefs = await localStorage.getItem('darkMode');
      const darkMode = localThemePrefs ? JSON.parse(localThemePrefs): false;
      await this.setState({
        launches,
        darkMode,
        loading: false,
      });
    } catch(e) {
      console.log(e);
      this.setState({ error: e, loading: false });
    }
  }

  toggleDarkMode = async () => {
    const { darkMode } = this.state;
    await localStorage.setItem('darkMode', !darkMode);
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
          fontFamily: 'Pacifico, Roboto',
          fontSize: 48,
        }
      }
    });

    return (
      <ThemeProvider theme={theme}>
        <main style={{ backgroundColor: darkMode ? '#000': '#fafafa' }}>
          <Header toggleDarkMode={this.toggleDarkMode} darkMode={darkMode}/>
            <Grid
              container
              justify="center"
              alignItems="center"
              style={{ padding: '20px 0px'}}
            >
              { loading ? <CircularProgress color="inherit" /> : this.renderUpcomingLaunches()}
            </Grid>
        </main>
      </ThemeProvider>
    );
  }
}

export default App;
