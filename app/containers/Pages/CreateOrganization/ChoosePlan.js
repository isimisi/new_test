/* eslint-disable react/no-unused-prop-types */
/* eslint-disable camelcase */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import brand from '@api/dummy/brand';
import {
  PricingCard, Notification
} from '@components';
import { useSelector, useDispatch } from 'react-redux';
import {
  useHistory
} from 'react-router-dom';
import { loadFromLocalStorage } from '@api/localStorage/localStorage';
import Lottie from 'lottie-react';
import { plans } from '@api/constants';
import styles from '../HelpSupport/helpSupport-jss';
import { closeNotifAction, askForADemo } from './reducers/createOrganizationActions';
import afterPayment from './afterPayment.json';

function Pricing() {
  // const { classes } = props;
  const reducer = 'createOrganization';
  const messageNotif = useSelector(state => state.getIn([reducer, 'message']));
  const dispatch = useDispatch();
  const { user_id, plan_id } = loadFromLocalStorage();
  const history = useHistory();
  const [purchased, setPurchase] = useState(false);


  const handleGetItem = (item) => {
    if (item === 1) {
      setPurchase(true);
      window.open('https://buy.stripe.com/fZedTY9rC2iseOI7ss', '_blank').focus();
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
        {purchased
          ? (
            <div style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh', flexDirection: 'column'
            }}
            >
              <Lottie
                animationData={afterPayment}
                style={{
                  height: '80%',
                }}
              />
              <Button variant="outlined" color="primary" onClick={() => { history.push('/app'); }}>
                Gå tilbage til dit dashboard
              </Button>
            </div>
          )
          : (
            <>
              {plan_id <= 2 && (
                <Grid item md={4} sm={6} xs={12}>
                  <PricingCard
                    title="Base"
                    price="99 DKK"
                    tier="cheap"
                    active={plans[plan_id - 1] === 'Base'}
                    onClick={() => handleGetItem(1)}
                  />
                </Grid>
              )}
              <Grid item md={plan_id <= 2 ? 4 : 6} sm={6} xs={12}>
                <PricingCard
                  title="Draw"
                  price="499 DKK"
                  tier="expensive"
                  active={plans[plan_id - 1] === 'Team'}
                  onClick={() => handleGetItem(2)}
                />
              </Grid>
              <Grid item md={plan_id <= 2 ? 4 : 6} sm={6} xs={12}>
                <PricingCard
                  title="Pro"
                  price="Kontakt os"
                  tier="more-expensive"
                  active={plans[plan_id - 1] === 'Pro'}
                  onClick={() => handleGetItem(3)}
                />
              </Grid>
            </>
          )}
      </Grid>
    </div>
  );
}

Pricing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Pricing);
