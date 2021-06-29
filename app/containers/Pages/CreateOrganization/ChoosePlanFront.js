import React from 'react';
import { Helmet } from 'react-helmet';
import Grid from '@material-ui/core/Grid';
import brand from '@api/dummy/brand';
import { PricingCard } from '@components';
import {
  useHistory
} from 'react-router-dom';


function Pricing() {
  const title = brand.name + ' - Pricing';
  const description = brand.desc;
  const history = useHistory();

  const route = () => {
    history.push('/register');
  };


  return (
    <div style={{ marginTop: 40, width: '98%' }}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <Grid container spacing={1}>
        <Grid item md={3} sm={6} xs={12}>
          <PricingCard
            title="Lite"
            price="Gratis"
            tier="free"
            onClick={route}
          />
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <PricingCard
            title="Base"
            price="99 DKK"
            tier="cheap"
            onClick={route}
          />
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <PricingCard
            title="Structure"
            price="499 DKK"
            tier="expensive"
            onClick={route}
          />
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <PricingCard
            title="Pro"
            price="Kontakt os"
            tier="more-expensive"
            onClick={route}
          />
        </Grid>
      </Grid>

    </div>
  );
}
export default (Pricing);
