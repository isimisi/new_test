import React, { useEffect } from 'react';
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
import { loadFromLocalStorage } from '@api/localStorage/localStorage';
import {
  useHistory
} from 'react-router-dom';
import styles from './dashboard-jss';
import NoOrganization from './NoOrganization';

function PersonalDashboard() {
  const title = brand.name + ' - Personal Dashboard';
  const description = brand.desc;
  const organization = loadFromLocalStorage().organization_id;
  const plan = loadFromLocalStorage().plan_id;
  const history = useHistory();

  useEffect(() => {
    if (organization && !plan) {
      history.push('/app/create/organiazation/choose/plan');
    }
  }, []);

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
      {!organization && <NoOrganization />}
    </div>
  );
}

// PersonalDashboard.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(PersonalDashboard);
