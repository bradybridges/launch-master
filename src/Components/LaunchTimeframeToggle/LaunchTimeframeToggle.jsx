import React from 'react';
import { Button, ButtonGroup } from '@material-ui/core';


export default function LaunchTimeframeToggle() {
  return (
    <div>
      <ButtonGroup variant="contained" aria-label="Time frame buttons" size="small">
        <Button>Upcoming</Button>
        <Button>Already Happened</Button>
      </ButtonGroup>
    </div>
  );
}
