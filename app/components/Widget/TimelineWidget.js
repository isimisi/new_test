import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
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
import ButtonBase from '@material-ui/core/ButtonBase';
import styles from './widget-jss';
import PapperBlock from '../PapperBlock/PapperBlock';


function TimelineWidget(props) {
  const { classes, timeline, history } = props;

  return (
    <PapperBlock whiteBg noMargin title="Aktivitet" icon="ion-ios-time-outline" desc="">

      {timeline.toJS().length === 0 ? (
        <div>
          <Typography variant="h5">Du har endnu ikke brugt juristic endnu. Hop ind i et arbejdsområde og kom godt i gang.</Typography>
          <div className={classes.activityButton}>
            <img src="https://app-juristic-media.s3.eu-north-1.amazonaws.com/racoon/Screenshot+2021-07-08+at+15.51.40.png" alt="nerdy" style={{ height: 200 }} />
            <Button
              variant="outlined"
              size="large"
              onClick={() => history.push('/app/workspaces')}
            >
              Gå til arbejdsområde
            </Button>
          </div>
        </div>
      ) : (
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
                <ButtonBase style={{ borderRadius: 8, whiteSpace: 'normal' }} onClick={() => history.push(item.link)}>
                  <Paper elevation={3} className={classes.paper}>
                    <Typography variant="subtitle2" component="h1">
                      {item.label}
                    </Typography>
                    <Typography variant="caption">
                      {item.metaText}
                    </Typography>
                  </Paper>
                </ButtonBase>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      )}
    </PapperBlock>
  );
}

TimelineWidget.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  timeline: PropTypes.object.isRequired
};

export default withStyles(styles)(TimelineWidget);
