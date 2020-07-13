import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

export default function LaunchTimeframeToggle({ setTimeFrame, setNumResults, numResults }) {
  const [active, setActive] = React.useState('upcoming');

  const useStyles = makeStyles((theme) => ({
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: theme.spacing(4), 
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      justifySelf: 'flex-end',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const handleActive = (event, newActive) => {
    setActive(newActive);
  }

  const handleNumResults = (e) => {
    setNumResults(e.target.value);
  }

  const classes = useStyles();
  return (
    <div className={classes.buttonContainer} aria-label="select upcoming launches or past launches">
      <ToggleButtonGroup
        value={active}
        exclusive
        onChange={handleActive}
        aria-label="past or upcoming launch selection"
      >
        <ToggleButton value="upcoming" aria-label="upcoming launches" onClick={() => setTimeFrame(false)}>
          Upcoming
        </ToggleButton>
        <ToggleButton value="past" aria-label="past launches" onClick={() => setTimeFrame(true)}>
          Past
        </ToggleButton>
      </ToggleButtonGroup>
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="demo-simple-select-filled-label">Results</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={numResults}
          onChange={handleNumResults}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
