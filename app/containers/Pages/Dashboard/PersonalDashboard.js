import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import brand from '@api/dummy/brand';
import { Helmet } from 'react-helmet';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import {
  SliderWidget,
  CounterIconsWidget,
  TimelineWidget,
  NewsListWidget,
  PapperBlock,
  Notification
} from '@components';
import FormControl from '@material-ui/core/FormControl';
import Send from '@material-ui/icons/Send';

import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import { useSelector, useDispatch } from 'react-redux';
import {
  useHistory
} from 'react-router-dom';
import styles from './dashboard-jss';
import {
  closeNotifAction,
  getElementCounts,
  getTimeline,
  postFeatureRequest,
  getUserInfo
} from './reducers/dashboardActions';
import UpgradeModal from './UpgradeModal';


const PersonalDashboard = (props) => {
  const title = brand.name + ' - Personal Dashboard';
  const description = brand.desc;
  const { classes } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const reducer = 'dashboard';
  const elementCounts = useSelector(state => state.getIn([reducer, 'elementCounts']));
  const timeline = useSelector(state => state.getIn([reducer, 'timeline']));
  const messageNotif = useSelector(state => state.getIn([reducer, 'message']));
  const [featureValue, setFeatureValue] = useState('');
  const [showUpgrade, setShowUpgrade] = useState(false);


  useEffect(() => {
    dispatch(getElementCounts());
    dispatch(getTimeline());
    dispatch(getUserInfo());

    if (history.location.search.includes('upgraded')) {
      setShowUpgrade(true);
    }
  }, []);

  const handleFeatureChange = (e) => {
    setFeatureValue(e.target.value);
  };

  const handleSubmitFeature = () => {
    dispatch(postFeatureRequest(featureValue, setFeatureValue));
  };

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <Notification close={() => dispatch(closeNotifAction)} message={messageNotif} />
      <Grid container spacing={3} className={classes.root}>
        <Grid item md={6} xs={12}>
          <CounterIconsWidget elementCounts={elementCounts} />
          <Divider className={classes.divider} />
          <div className={classes.sliderWrap}>
            <SliderWidget />
          </div>
          <Divider className={classes.divider} />
          <NewsListWidget />
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <TimelineWidget timeline={timeline} />
          <Divider className={classes.divider} />
          <PapperBlock title="Send os et ønske" icon="ion-ios-redo-outline" colorMode whiteBg noMargin desc="Vi er glade for idéer og ser på det straks">
            <div className={classes.subscribeForm}>
              <FormControl>
                <TextField
                  label="Skriv dit ønske her"
                  className={classes.textField}
                  margin="normal"
                  onChange={handleFeatureChange}
                  value={featureValue}
                  multiline
                  classes={{
                    root: classes.whiteInputRoot,
                    input: classes.whiteInputInput,
                  }}
                />
              </FormControl>
              <Fab size="medium" color="secondary" type="submit" onClick={handleSubmitFeature}>
                <Send />
              </Fab>
            </div>
          </PapperBlock>
          <Divider className={classes.divider} />
        </Grid>
      </Grid>
      <UpgradeModal
        open={showUpgrade}
        close={() => {
          dispatch(getUserInfo());
          setShowUpgrade(false);
        }}
      />
    </div>
  );
};

PersonalDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PersonalDashboard);
