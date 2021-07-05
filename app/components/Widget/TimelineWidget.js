import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Ionicon from 'react-ionicons';
import moment from 'moment';
import 'moment/locale/da';
import styles from './widget-jss';
import PapperBlock from '../PapperBlock/PapperBlock';


function TimelineWidget(props) {
  const { classes, timeline } = props;

  return (
    <PapperBlock whiteBg noMargin title="Aktivitet" icon="ion-ios-time-outline" desc="">

      <Timeline align="alternate">
        {timeline.toJS().map(item => (
          <TimelineItem>
            <TimelineOppositeContent>
              <Typography variant="body2" color="textSecondary">
                {moment(item.updated_at).fromNow()}
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot className={classes.timelineConnector}>
                <Ionicon
                  icon={item.icon}
                />
              </TimelineDot>
              <TimelineConnector className={classes.timelineConnector} />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} className={classes.paper}>
                <Typography variant="subtitle2" component="h1">
                  {item.label}
                </Typography>
                <Typography variant="caption">
                  {item.metaText}
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </PapperBlock>
  );
}

TimelineWidget.propTypes = {
  classes: PropTypes.object.isRequired,
  timeline: PropTypes.object.isRequired
};

export default withStyles(styles)(TimelineWidget);
