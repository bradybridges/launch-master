import React from 'react';
import { Switch } from '@material-ui/core';
import { makeStyles, Typography, AppBar, Toolbar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
  },
}));

export default function Header({ darkMode, toggleDarkMode }) {
  const classes = useStyles();
  return (
    <header>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h1">Launch Master</Typography>
          <div>
            <Typography style={{ display: 'inline'}}>Light</Typography>
            <Switch
              checked={darkMode}
              onChange={() => toggleDarkMode()}
              color="secondary"
              name="darkmode-toggle"
              inputProps={{ 'aria-label': 'dark mode checkbox' }}
            />
            <Typography style={{ display: 'inline' }} color="secondary">Dark</Typography>
          </div>
        </Toolbar>
      </AppBar>
    </header>
  );
}
