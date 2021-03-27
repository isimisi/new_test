import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import classNames from 'classnames';
import Card from '@material-ui/core/Card';

import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Button from '@material-ui/core/Button';
import styles from './cardStyle-jss';

function ProductCard(props) {
  const {
    classes,
    thumbnail,
    name,
    desc,
    list,
    width,
    detailOpen,
  } = props;
  return (
    <Card className={classNames(classes.cardProduct, isWidthUp('sm', width) && list ? classes.cardList : '')}>
      <CardMedia
        className={classes.mediaProduct}
        image={thumbnail}
        title={name}
      />
      <CardContent className={classes.floatingButtonWrap}>
        <Typography noWrap gutterBottom variant="h5" className={classes.title} component="h2">
          {name}
        </Typography>
        <Typography component="p" className={classes.desc}>
          {desc}
        </Typography>
      </CardContent>
      <CardActions className={classes.price}>
        <div className={classes.rightAction}>
          <Button size="small" variant="outlined" color="secondary" onClick={detailOpen}>
            See Detail
          </Button>
        </div>
      </CardActions>
    </Card>
  );
}

ProductCard.propTypes = {
  classes: PropTypes.object.isRequired,
  thumbnail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  list: PropTypes.bool,
  detailOpen: PropTypes.func,
  width: PropTypes.string.isRequired
};

ProductCard.defaultProps = {
  list: false,
  detailOpen: () => (false),
  addToCart: () => (false),
};

const ProductCardResponsive = withWidth()(ProductCard);
export default withStyles(styles)(ProductCardResponsive);
