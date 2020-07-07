import React from 'react';
import { Button, ButtonGroup } from '@material-ui/core';


export default function LaunchTimeframeToggle({ setTimeFrame }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <ButtonGroup variant="contained" aria-label="Time frame buttons" size="small">
        <Button onClick={() => setTimeFrame(false)}>Upcoming</Button>
        <Button onClick={() => setTimeFrame(true)}>Already Happened</Button>
      </ButtonGroup>
    </div>
  );
}
