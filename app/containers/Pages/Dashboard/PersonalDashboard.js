import React from 'react';
// import PropTypes from 'prop-types';
import brand from '@api/dummy/brand';
import { Helmet } from 'react-helmet';
import { withStyles } from '@material-ui/core/styles';
// import Hidden from '@material-ui/core/Hidden';
// import Grid from '@material-ui/core/Grid';
// import Divider from '@material-ui/core/Divider';
// import {
//   SliderWidget,
//   CounterIconsWidget,
//   PerformanceChartWidget,
//   DateWidget,
//   WeatherWidget,
//   TimelineWidget,
//   FilesWidget,
//   TaskWidget
// } from '@components';
import styles from './dashboard-jss';


function PersonalDashboard(props) {
  const title = brand.name + ' - Personal Dashboard';
  const description = brand.desc;
  // const { classes } = props;
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
    </div>
  );
}

// PersonalDashboard.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(PersonalDashboard);
