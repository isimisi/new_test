/* eslint-disable camelcase */
/* eslint-disable react/no-unused-prop-types */
import React from 'react';
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
import { closeNotifAction, } from './reducers/createOrganizationActions';

function Pricing() {
  // const { classes } = props;
  const reducer = 'createOrganization';
  const messageNotif = useSelector(state => state[reducer].get('message'));
  const dispatch = useDispatch();
  const { plan_id } = loadFromLocalStorage();


  const handleGetItem = () => {
    window.open('https://calendly.com/juristic_aps/demo', '_blank');
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
        <Grid item md={4} sm={6} xs={12}>
          <PricingCard
            title="Base"
            price="Gratis"
            active={plans[plan_id - 1] === 'Base'}
            included={plan_id > 1}
            tier="free"
          />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <PricingCard
            title="Draw"
            price="499 DKK"
            tier="expensive"
            active={plans[plan_id - 1] === 'Draw'}
            onClick={() => handleGetItem()}
          />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <PricingCard
            title="Pro"
            price="Kontakt"
            tier="more-expensive"
            active={plans[plan_id - 1] === 'Pro'}
            onClick={() => handleGetItem()}
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
