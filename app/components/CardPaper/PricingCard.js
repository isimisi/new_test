/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Loader from '@api/ui/Loader';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import styles from './cardStyle-jss';


function PricingCard(props) {
  const {
    classes,
    title,
    price,
    tier,
    onClick,
    active,
    included,
    loading
  } = props;


  const getTier = lv => {
    switch (lv) {
      case 'cheap':
        return classes.cheap;
      case 'expensive':
        return classes.expensive;
      case 'more-expensive':
        return classes.moreExpensive;
      default:
        return classes.free;
    }
  };

  const lite = ['Indlæs fra CVR', 'Hent regnskabsdata'];
  const base = ['Ændre data fra CVR', 'Tilføj indhold', 'Automatiske red flags'];
  const team = ['Sikkert virksomhedslogin', 'Design egne red flags', 'Design eget indhold', "Integrer andre API'er", 'Eget subdomæne', 'VPN lås'];
  const pro = ['Automatisk læringsindhold', 'Automatisk report builder'];

  const features = [
    ...lite,
    ...base,
    ...team,
    ...pro];

  const getTierForWorkspaces = lv => {
    switch (lv) {
      case 'cheap':
        return 50;
      case 'free':
        return 10;
      default:
        return 'Ubegr.';
    }
  };

  const getTierForChecks = lv => {
    switch (lv) {
      case 'cheap':
        return [...lite, ...base];
      case 'expensive':
        return [...lite, ...base, ...team];
      case 'more-expensive':
        return features;
      default:
        return lite;
    }
  };

  return (
    <div>
      <Card className={classNames(classes.priceCard, getTier(tier))}>
        <div className={classes.priceHead}>
          <Typography variant="h5">{title}</Typography>
          <Typography component="h4" variant="h3">{price}</Typography>
          {title !== 'Pro' && <Typography>ekskl. moms</Typography>}
        </div>
        <CardContent className={classes.featureList}>
          <List dense>
            <ListItem>
              <ListItemText primary="Arbejdsområder" />
              <ListItemSecondaryAction>
                <Typography style={{ marginRight: 10 }}>{getTierForWorkspaces(tier)}</Typography>
              </ListItemSecondaryAction>
            </ListItem>
            {features.map((item, index) => (
              <ListItem key={index.toString()}>
                <ListItemText primary={item} />
                <ListItemSecondaryAction>
                  <Checkbox style={{ color: 'white' }} checked={getTierForChecks(tier).includes(item)} />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </CardContent>
        <CardActions className={classes.btnArea}>
          {loading ? <Loader /> : (
            <Button
              variant={active ? 'contained' : 'outlined'}
              disabled={active || included}
              size="large"
              className={classes.lightButton}
              onClick={() => onClick()}
            >
              {included ? 'Inkluderet' : active ? 'Nuværende' : title === 'Pro' || title === 'Draw' ? 'Bestil en demo' : 'Få det nu'}
            </Button>
          )}
        </CardActions>
      </Card>
    </div>
  );
}

PricingCard.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  tier: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool,
  included: PropTypes.bool,
  loading: PropTypes.bool
};

export default withStyles(styles)(PricingCard);
