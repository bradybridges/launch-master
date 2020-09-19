import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

export default function LaunchOptionsBar({
  setTimeFrame,
  setNumResults,
  numResults,
  timeframe,
}) {
  const [active, setActive] = React.useState("upcoming");

  const useStyles = makeStyles((theme) => ({
    buttonContainer: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      padding: `${theme.spacing(10)}px 0 0 0`,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const handleNumResults = (e) => {
    setNumResults(e.target.value);
  };

  const handleTimeFrame = (newTimeFrame) => {
    if (newTimeFrame === timeframe) return;

    if (newTimeFrame === "upcoming") {
      setActive("upcoming");
      setTimeFrame(false);
    } else {
      setActive("past");
      setTimeFrame(true);
    }
  };

  const classes = useStyles();
  return (
    <div
      className={classes.buttonContainer}
      aria-label="select upcoming launches or past launches"
    >
      <ToggleButtonGroup
        value={active}
        exclusive
        aria-label="past or upcoming launch selection"
      >
        <ToggleButton
          value="upcoming"
          aria-label="upcoming launches"
          onClick={() => handleTimeFrame("upcoming")}
          selected={!timeframe}
        >
          Upcoming
        </ToggleButton>
        <ToggleButton
          value="past"
          aria-label="past launches"
          onClick={() => handleTimeFrame("past")}
          selected={timeframe}
        >
          Past
        </ToggleButton>
      </ToggleButtonGroup>
      {active === "upcoming" ? (
        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel>Results</InputLabel>
          <Select
            labelId="filled-label"
            id="select-filled"
            value={numResults}
            onChange={handleNumResults}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
      ) : null}
    </div>
  );
}
