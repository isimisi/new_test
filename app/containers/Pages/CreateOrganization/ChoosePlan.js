/* eslint-disable camelcase */
/* eslint-disable react/no-unused-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import brand from '@api/dummy/brand';
import {
  PricingCard, Notification
} from '@components';
import { useSelector, useDispatch } from 'react-redux';
import { loadFromLocalStorage } from '@api/localStorage/localStorage';
import { plans } from '@api/constants';
import styles from '../HelpSupport/helpSupport-jss';
import { closeNotifAction, askForADemo, purchase } from './reducers/createOrganizationActions';

function Pricing() {
  // const { classes } = props;
  const reducer = 'createOrganization';
  const messageNotif = useSelector(state => state[reducer].get('message'));
  const dispatch = useDispatch();
  const { user_id, plan_id } = loadFromLocalStorage();
  const [loading, setLoading] = useState(false);

  const handleGetItem = (item) => {
    setLoading(true);
    if (item === 1) {
      dispatch(purchase(setLoading));
    } else {
      dispatch(askForADemo(user_id));
    }
  };

  const title = brand.name + ' - Pricing';
  const description = brand.desc;
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
      <Grid container spacing={2}>
        <Grid item md={3} sm={6} xs={12}>
          <PricingCard
            title="Lite"
            price="Gratis"
            active={plans[plan_id - 1] === 'Lite'}
            included={plan_id > 1}
            tier="free"
          />
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <PricingCard
            title="Base"
            price="99 DKK"
            tier="cheap"
            active={plans[plan_id - 1] === 'Base'}
            included={plans[plan_id - 1] === 'Draw'}
            loading={loading}
            onClick={() => handleGetItem(1)}
          />
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <PricingCard
            title="Draw"
            price="499 DKK"
            tier="expensive"
            active={plans[plan_id - 1] === 'Draw'}
            onClick={() => handleGetItem(2)}
          />
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <PricingCard
            title="Pro"
            price="Kontakt os"
            tier="more-expensive"
            active={plans[plan_id - 1] === 'Pro'}
            onClick={() => handleGetItem(3)}
          />
        </Grid>
      </Grid>
    </div>
  );
}

Pricing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Pricing);
