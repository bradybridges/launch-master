import React from 'react';
import SearchIcon from '@material-ui/icons/Search';

import { Switch } from '@material-ui/core';
import { fade, makeStyles, Typography, AppBar, Toolbar, InputBase, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  search: {
    display: 'inline-flex',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    // marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
    justifySelf: 'center',
    alignSelf: 'center',
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Header({ darkMode, toggleDarkMode }) {
  const classes = useStyles();
  return (
    <header style={{flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h1">Launch Master</Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
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
