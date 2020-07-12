import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import VideoCam from '@material-ui/icons/Videocam';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '10px 0px',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    borderRadius: 4,
    maxWidth: '300px',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.short,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  table: {
    marginBottom: theme.spacing(3),
  }
}));

export default function LaunchCard({ launch }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const { name, net, missions, rocket, probability, location, tbddate, tbdtime } = launch;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        title={name}
        subheader={(tbddate === 1 || tbdtime === 1) ? `Unconfirmed: ${net}`: net}
        action={launch.vidURLs.length > 0 ? (
          <a href={launch.vidURLs[0]} target="_blank" rel="noopener noreferrer">
            <IconButton aria-label="watch live">
              <VideoCam fontSize="large"/>
            </IconButton>
          </a>
        ): null}
      />
      {launch.failreason && (
        <CardContent>
          <Typography>
            {launch.failreason}
          </Typography>
        </CardContent>
      )}
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {probability > 0 && (
            <Typography paragraph>
              {probability}% Chance of Launch
            </Typography>
          )}
          {missions[0] && (
            <Typography paragraph>
              {missions[0].description}
            </Typography>
          )}
        </CardContent>
        {/* <CardContent>
          <Typography paragraph>Rocket: {rocket.familyname}</Typography>
          {rocket.configuration && <Typography paragraph>Configuration: {rocket.configuration}</Typography>}
          <Typography paragraph>Launching from</Typography>
          {location.pads.length <= 0 && <Typography paragraph>{location.name}</Typography>}
          <Typography paragraph>{location.pads[0].name}</Typography>
          <Typography paragraph>Status: {launch.status === 1 ? 'Green': launch.status ===2 ? 'Red': launch.status === 3 ? 'Succeeded' : 'Failed'}</Typography>
          {launch.failreason && <Typography paragraph>{launch.failreason}</Typography>}
        </CardContent> */}
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="Launch Information">
            <TableHead>
              <TableRow>
                <TableCell>Rocket Name</TableCell>
                <TableCell>Configuration</TableCell>
                <TableCell>Launch Location</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  {rocket.familyname}
                </TableCell>
                <TableCell>{rocket.configuration ? rocket.configuration: 'Uknown'}</TableCell>
                <TableCell>{location.pads.length > 0 ? location.pads[0].name: location.name}</TableCell>
                <TableCell>{launch.status === 1 ? 'Green': launch.status ===2 ? 'Red': launch.status === 3 ? 'Succeeded' : 'Failed'}</TableCell>
                <TableCell>{net}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Collapse>
    </Card>
  );
}