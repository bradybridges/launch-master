import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
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
}));

export default function LaunchCard({ launch }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const { name, net, missions, rocket, probability, location, tbddate, tbdtime, lsp } = launch;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        title={name}
        subheader={net}
      />
      {/* <CardContent>
        <Typography variant="body1" component="p">
          {missions[0].name}
        </Typography>
      </CardContent> */}
      {/* <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {missions[0].description}
        </Typography>
      </CardContent> */}
      <CardActions disableSpacing>
        { launch.vidURLs.length > 0 && (
          <a href={launch.vidURLs[0]} target="_blank" rel="noopener noreferrer">
            <IconButton aria-label="watch live">
              <VideoCam fontSize="large"/>
            </IconButton>
          </a>
        )}
        {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
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
          <Typography paragraph>
            {missions[0].description}
          </Typography>
        </CardContent>
        <CardContent>
          {/* <CardMedia
            className={classes.media}
            image={rocket.imageURL}
            title="Paella dish"
          /> */}
          <Typography paragraph>Rocket: {rocket.familyname}</Typography>
          {rocket.configuration && <Typography paragraph>Configuration: {rocket.configuration}</Typography>}
          <Typography paragraph>Launching from  {location.pads[0].name}</Typography>
          <Typography paragraph>Status: {launch.status === 1 ? 'Green': launch.status ===2 ? 'Red': launch.status === 3 ? 'Succeeded' : 'Failed'}</Typography>
          {(tbddate === 1 || tbdtime === 1) ? (
            <React.Fragment>
              <Typography paragraph>Confirmed:</Typography>
              <CancelIcon />
            </React.Fragment>
          ): (
            <React.Fragment>
              <Typography paragraph>Confirmed:</Typography>
              <CheckCircleIcon />
            </React.Fragment>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
}