import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Ionicon from 'react-ionicons';
import moment from 'moment';
import 'moment/locale/da';
import ButtonBase from '@mui/material/ButtonBase';
import { useTranslation } from 'react-i18next';
import styles from './widget-jss';
import PapperBlock from '../PapperBlock/PapperBlock';


function TimelineWidget(props) {
  const { classes, timeline, history } = props;
  const { t } = useTranslation();

  return (
    <PapperBlock whiteBg noMargin title={t('timeline-widget.activity')} icon="ion-ios-time-outline" desc="">

      {timeline.toJS().length === 0 ? (
        <div>
          <Typography variant="h5">{t('timeline-widget.jump_into_a_work_area')}</Typography>
          <div className={classes.activityButton}>
            <img src="https://app-juristic-media.s3.eu-north-1.amazonaws.com/racoon/Screenshot+2021-07-08+at+15.51.40.png" alt="nerdy" style={{ height: 200 }} />
            <Button
              variant="outlined"
              size="large"
              onClick={() => history.push('/app/workspaces')}
            >
              {t('timeline-widget.go_to_workspace')}
            </Button>
          </div>
        </div>
      ) : (
        <Timeline align="alternate">
          {timeline.toJS().map(item => (
            <TimelineItem key={item.id.toString()}>
              <TimelineOppositeContent>
                <Typography variant="body2" color="textSecondary">
                  {moment(item.updated_at).fromNow()}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot className={classes.timelineConnector}>
                  <Ionicon
                    icon={item.icon}
                    style={{ color: 'black' }}
                  />
                </TimelineDot>
                <TimelineConnector className={classes.timelineConnector} />
              </TimelineSeparator>
              <TimelineContent>
                <ButtonBase style={{ borderRadius: 8, whiteSpace: 'normal' }} onClick={() => history.push(item.link)}>
                  <Paper elevation={3} className={classes.paper}>
                    <Typography variant="body2" component="h1">
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
