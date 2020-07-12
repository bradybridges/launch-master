import React from 'react';
import { Button, ButtonGroup, Typography } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

export default function LaunchTimeframeToggle({ setTimeFrame }) {
  const [active, setActive] = React.useState('upcoming');

  const handleActive = (event, newActive) => {
    setActive(newActive);
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }} aria-label="select upcoming launches or past launches">
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
    </div>
  );
}
