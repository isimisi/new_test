import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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
    onClick
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

  const lite = ['Indlæs fra CVR'];
  const base = ['Ændre data fra CVR', 'Automatiske red flags'];
  const structure = ['Sikkert virksomhedslogin', 'Design egne red flags', 'Design eget indhold', "Integrer andre API'er", 'Eget subdomæne', 'VPN lås'];
  const pro = ['Automatisk læringsindhold', 'Atuomatisk report builder'];

  const features = [
    ...lite,
    ...base,
    ...structure,
    ...pro];

  const getTierForWorkspaces = lv => {
    switch (lv) {
      case 'cheap':
        return 50;
      case 'free':
        return 1;
      default:
        return 'Ubegr.';
    }
  };

  const getTierForChecks = lv => {
    switch (lv) {
      case 'cheap':
        return [...lite, ...base];
      case 'expensive':
        return [...lite, ...base, ...structure];
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
          {!['Kontakt os', 'Gratis'].includes(price) && <Typography variant="h7">pr. bruger om måneden</Typography>}
        </div>
        <CardContent className={classes.featureList}>
          <List dense>
            <ListItem>
              <ListItemText primary="Antal arbejdsområder" />
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
          <Button variant="outlined" size="large" className={classes.lightButton} onClick={() => onClick()}>Få det nu</Button>
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
  onClick: PropTypes.func.isRequired
};

export default withStyles(styles)(PricingCard);
