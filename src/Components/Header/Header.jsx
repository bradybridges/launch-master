import React, { useState, useEffect } from "react";
import { ReactComponent as SunImg } from "../../Images/sun.svg";
import { Switch } from "@material-ui/core";
import {
  fade,
  makeStyles,
  Typography,
  AppBar,
  Toolbar,
} from "@material-ui/core";
import { dark } from "@material-ui/core/styles/createPalette";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  darkModeIcon: {
    width: "30px",
    height: "30px",
    transition: "all 0.3s ease-out",
    cursor: "pointer",
  },
  rotate: {
    transform: "rotate(90deg)",
  },
}));

export default function Header({ darkMode, toggleDarkMode }) {
  const classes = useStyles();
  const [fill, setFill] = useState();

  useEffect(() => {
    const fillColor = darkMode ? "red" : "white";
    setFill(fillColor);
  }, [darkMode]);

  return (
    <header style={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h1">Launch Master</Typography>
          <div>
            <SunImg
              style={{ fill: fill }}
              className={
                darkMode
                  ? `${classes.darkModeIcon} ${classes.rotate}`
                  : classes.darkModeIcon
              }
              onClick={toggleDarkMode}
            />
          </div>
        </Toolbar>
      </AppBar>
    </header>
  );
}
