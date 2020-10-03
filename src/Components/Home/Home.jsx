import React, { Component } from "react";
import Header from "../Header/Header";
import LaunchCard from "../LaunchCard/LaunchCard";
import LaunchOptionsBar from "../LaunchOptionsBar/LaunchOptionsBar";

import {
  Grid,
  createMuiTheme,
  ThemeProvider,
  CircularProgress,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { getUpcomingLaunches, getPastLaunches } from "../../apiCalls";

class Home extends Component {
  state = {
    upcomingLaunches: null,
    pastLaunches: null,
    darkMode: false,
    error: null,
    loading: true,
    timeframe: false,
    numResults: 10,
  };

  componentDidMount = async () => {
    try {
      const windowEnd = this.getTodaysDate();
      const windowStart = this.getOneMonthBackDate();
      const upcomingLaunches = await getUpcomingLaunches(50);
      const pastLaunches = await getPastLaunches(windowStart, windowEnd);
      const localThemePrefs = await localStorage.getItem("darkMode");
      const darkMode = localThemePrefs ? JSON.parse(localThemePrefs) : false;

      setTimeout(() => {
        this.setState({
          upcomingLaunches,
          pastLaunches,
          darkMode,
          loading: false,
        });
      }, 1000);
    } catch (e) {
      console.log(e);
      this.setState({ error: e, loading: false });
    }
  };

  toggleDarkMode = async () => {
    const { darkMode } = this.state;
    await localStorage.setItem("darkMode", !darkMode);
    this.setState({ darkMode: !darkMode });
  };

  toggleLaunchTimeFrames = () => {
    this.setState({ timeframe: !this.state.timeframe });
  };

  setTimeFrame = (bool) => {
    if (bool === this.state.timeframe) return;
    this.setState({ timeframe: bool });
  };

  setNumResults = (num) => {
    this.setState({ numResults: num });
  };

  getTodaysDate = () => {
    const today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    const year = today.getFullYear();

    if (day < 10) {
      day = `0${day}`;
    }

    if (month < 10) {
      month = `0${month}`;
    }

    return `${year}-${month}-${day}`;
  };

  getOneMonthBackDate = () => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    let month = date.getMonth() + 1;
    const year = date.getFullYear();

    if (month < 10) {
      month = `0${month}`;
    }
    return `${year}-${month}-01`;
  };

  renderUpcomingLaunches = () => {
    const { upcomingLaunches, numResults } = this.state;

    if (upcomingLaunches) {
      const launchCards = upcomingLaunches.launches.map((launch, i) => {
        return <LaunchCard key={launch.id} launch={launch} past={false} />;
      });
      return launchCards.slice(0, numResults);
    } else {
      return <h1>We couldn't find any upcoming launches...</h1>;
    }
  };

  renderPastLaunches = () => {
    const { pastLaunches } = this.state;

    if (pastLaunches) {
      return pastLaunches.launches.map((launch) => {
        return <LaunchCard key={launch.id} launch={launch} past={true} />;
      });
    } else {
      return <h1>We couldn't find any past launches...</h1>;
    }
  };

  render() {
    const { darkMode, loading, timeframe, numResults } = this.state;

    const theme = createMuiTheme({
      palette: {
        type: darkMode ? "dark" : "light",
        primary: {
          main: darkMode ? "#000" : "#3f51b5",
          contrastText: darkMode ? "#000" : "#fafafa",
        },
        background: {
          paper: darkMode ? "#000" : "#fff",
          default: darkMode ? "#000" : "#fafafa",
        },
      },
      typography: {
        h1: {
          color: darkMode ? red[400] : "#fff",
          fontFamily: "Pacifico, Roboto",
          fontSize: 48,
        },
        h4: {
          color: darkMode ? red[400] : "#000",
          fontSize: 20,
          fontFamily: "Roboto",
          padding: "1em",
        },
      },
    });

    return (
      <ThemeProvider theme={theme}>
        <main style={{ backgroundColor: darkMode ? "#000" : "#fafafa" }}>
          <Header toggleDarkMode={this.toggleDarkMode} darkMode={darkMode} />
          <LaunchOptionsBar
            setTimeFrame={this.setTimeFrame}
            setNumResults={this.setNumResults}
            numResults={numResults}
            timeframe={this.state.timeframe}
          />
          <Grid
            container
            justify="center"
            alignItems="center"
            style={{ padding: "20px 0px" }}
          >
            {loading ? (
              <CircularProgress color="inherit" />
            ) : timeframe ? (
              this.renderPastLaunches()
            ) : (
              this.renderUpcomingLaunches()
            )}
          </Grid>
        </main>
      </ThemeProvider>
    );
  }
}

export default Home;
