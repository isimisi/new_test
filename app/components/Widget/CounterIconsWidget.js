import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import colorfull from '@api/palette/colorfull';
import Ionicon from 'react-ionicons';
import CounterWidget from '../Counter/CounterWidget';
import styles from './widget-jss';


const CounterIconWidget = (props) => {
  const { classes, elementCounts, history } = props;

  const handleClick = (where) => {
    history.push(`/app/${where}`);
  };

  return (
    <div className={classes.rootCounterFull}>
      <Grid container spacing={2}>
        <Grid item xs={3} md={3}>
          <CounterWidget
            color="white"
            start={elementCounts.get('nodes') < 20 ? 50 : 0}
            end={elementCounts.get('nodes') || 0}
            duration={5}
            title="elementer"
            onClick={() => handleClick('nodes')}
          >
            <Ionicon
              className={classes.counterIcon}
              icon="ios-photos-outline"
            />
          </CounterWidget>
        </Grid>
        <Grid item xs={3} md={3}>
          <CounterWidget
            color="white"
            start={elementCounts.get('nodes') < 20 ? 50 : 0}
            end={elementCounts.get('relationships') || 0}
            duration={5}
            title="forbindelser"
            onClick={() => handleClick('relationships')}
          >
            <Ionicon
              className={classes.counterIcon}
              icon="ios-build-outline"
            />
          </CounterWidget>
        </Grid>
        <Grid item xs={3} md={3}>
          <CounterWidget
            color="white"
            start={elementCounts.get('attributes') < 20 ? 50 : 0}
            end={elementCounts.get('attributes') || 0}
            duration={5}
            title="kendetegn"
            onClick={() => handleClick('attributes')}
          >
            <Ionicon
              className={classes.counterIcon}
              icon="ios-list-box-outline"
            />
          </CounterWidget>
        </Grid>
        <Grid item xs={3} md={3}>
          <CounterWidget
            color="white"
            start={elementCounts.get('conditions') < 20 ? 50 : 0}
            end={elementCounts.get('conditions') || 0}
            duration={5}
            title="betingelser"
            onClick={() => handleClick('conditions')}
          >
            <Ionicon
              className={classes.counterIcon}
              icon="ios-color-wand-outline"
            />
          </CounterWidget>
        </Grid>
        <Grid item xs={3} md={3}>
          <CounterWidget
            color="white"
            start={elementCounts.get('workspaces') < 20 ? 50 : 0}
            end={elementCounts.get('workspaces') || 0}
            duration={5}
            title="områder"
            onClick={() => handleClick('workspaces')}
          >
            <Ionicon
              className={classes.counterIcon}
              icon="ios-git-network"
            />
          </CounterWidget>
        </Grid>
        <Grid item xs={3} md={3}>
          <CounterWidget
            color="white"
            start={elementCounts.get('groups') < 20 ? 50 : 0}
            end={elementCounts.get('groups') || 0}
            duration={5}
            onClick={() => handleClick('groups')}
            title="grupper"
          >
            <Ionicon
              className={classes.counterIcon}
              icon="ios-folder-outline"
            />
          </CounterWidget>
        </Grid>
        <Grid item xs={3} md={3}>
          <CounterWidget
            color="white"
            start={elementCounts.get('outputs') < 20 ? 50 : 0}
            end={elementCounts.get('outputs') || 0}
            duration={5}
            title="rapporter"
            onClick={() => handleClick('outputs')}
          >
            <Ionicon
              className={classes.counterIcon}
              icon="ios-document-outline"
            />
          </CounterWidget>
        </Grid>
        <Grid item xs={3} md={3}>
          <CounterWidget
            color="white"
            start={elementCounts.get('alerts') < 20 ? 50 : 0}
            end={/* elementCounts.get('alerts') || */0}
            duration={5}
            title="egne red flags"
            onClick={() => handleClick('red flags')}
          >
            <Ionicon
              className={classes.counterIcon}
              icon="ios-flag-outline"
            />
          </CounterWidget>
        </Grid>
      </Grid>
    </div>
  );
};

CounterIconWidget.propTypes = {
  classes: PropTypes.object.isRequired,
  elementCounts: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withStyles(styles)(CounterIconWidget);
