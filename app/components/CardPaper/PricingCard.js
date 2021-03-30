import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { useSpring, animated } from 'react-spring';
import styles from './cardStyle-jss';


const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1];
const trans = (x, y, s) => `perspective(600px) scale(${s})`;

function PricingCard(props) {
  const [useSpringProps, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }));
  const {
    classes,
    title,
    price,
    feature,
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

  return (
    <animated.div
      onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      style={{
        transform: useSpringProps.xys.interpolate(trans)
      }}
    >
      <Card className={classNames(classes.priceCard, getTier(tier))}>
        <div className={classes.priceHead}>
          <Typography variant="h5">{title}</Typography>
          <Typography component="h4" variant="h2">{price}</Typography>
        </div>
        <CardContent className={classes.featureList}>
          <ul>
            {feature.map((item, index) => (
              <li key={index.toString()}>{item}</li>
            ))}
          </ul>
        </CardContent>
        <CardActions className={classes.btnArea}>
          <Button variant="outlined" size="large" className={classes.lightButton} onClick={() => onClick()}>Get in now</Button>
        </CardActions>
      </Card>
    </animated.div>
  );
}

PricingCard.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  tier: PropTypes.string.isRequired,
  feature: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
};

export default withStyles(styles)(PricingCard);
