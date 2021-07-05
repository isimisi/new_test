import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import colorfull from '@api/palette/colorfull';
import Ionicon from 'react-ionicons';
import CounterWidget from '../Counter/CounterWidget';
import styles from './widget-jss';


const CounterIconWidget = (props) => {
  const { classes, elementCounts } = props;
  return (
    <div className={classes.rootCounterFull}>
      <Grid container spacing={2}>
        <Grid item xs={3} md={3}>
          <CounterWidget
            color={colorfull[0]}
            start={elementCounts.get('nodes') < 20 ? 50 : 0}
            end={elementCounts.get('nodes')}
            duration={5}
            title="elementer"
          >
            <Ionicon
              className={classes.counterIcon}
              icon="ios-photos-outline"
            />
          </CounterWidget>
        </Grid>
        <Grid item xs={3} md={3}>
          <CounterWidget
            color={colorfull[0]}
            start={elementCounts.get('nodes') < 20 ? 50 : 0}
            end={elementCounts.get('relationships')}
            duration={5}
            title="forbindelser"
          >
            <Ionicon
              className={classes.counterIcon}
              icon="ios-build-outline"
            />
          </CounterWidget>
        </Grid>
        <Grid item xs={3} md={3}>
          <CounterWidget
            color={colorfull[0]}
            start={elementCounts.get('attributes') < 20 ? 50 : 0}
            end={elementCounts.get('attributes')}
            duration={5}
            title="kendetegn"
          >
            <Ionicon
              className={classes.counterIcon}
              icon="ios-list-box-outline"
            />
          </CounterWidget>
        </Grid>
        <Grid item xs={3} md={3}>
          <CounterWidget
            color={colorfull[0]}
            start={elementCounts.get('conditions') < 20 ? 50 : 0}
            end={elementCounts.get('conditions')}
            duration={5}
            title="betingelser"
          >
            <Ionicon
              className={classes.counterIcon}
              icon="ios-color-wand-outline"
            />
          </CounterWidget>
        </Grid>
        <Grid item xs={3} md={3}>
          <CounterWidget
            color={colorfull[0]}
            start={elementCounts.get('nodes') < 20 ? 50 : 0}
            end={elementCounts.get('workspaces')}
            duration={5}
            title="områder"
          >
            <Ionicon
              className={classes.counterIcon}
              icon="ios-git-network"
            />
          </CounterWidget>
        </Grid>
        <Grid item xs={3} md={3}>
          <CounterWidget
            color={colorfull[0]}
            start={elementCounts.get('groups') < 20 ? 50 : 0}
            end={elementCounts.get('groups')}
            duration={5}
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
            color={colorfull[0]}
            start={elementCounts.get('outputs') < 20 ? 50 : 0}
            end={elementCounts.get('outputs')}
            duration={5}
            title="rapporter"
          >
            <Ionicon
              className={classes.counterIcon}
              icon="ios-document-outline"
            />
          </CounterWidget>
        </Grid>
        <Grid item xs={3} md={3}>
          <CounterWidget
            color={colorfull[0]}
            start={elementCounts.get('alerts') < 20 ? 50 : 0}
            end={elementCounts.get('alerts')}
            duration={5}
            title="red flags"
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
  elementCounts: PropTypes.object.isRequired
};

export default withStyles(styles)(CounterIconWidget);
