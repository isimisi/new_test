import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import classNames from 'classnames';
import Card from '@material-ui/core/Card';

import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import Button from '@material-ui/core/Button';
import styles from './cardStyle-jss';

function GroupCard(props) {
  const {
    classes,
    image,
    title,
    description,
    list,
    width,
    detailOpen
  } = props;
  return (
    <Card className={classNames(classes.cardProduct, isWidthUp('sm', width) && list ? classes.cardList : '')}>
      <CardMedia
        className={classes.mediaProduct}
        image={image}
        title={title}
      />
      <CardContent className={classes.floatingButtonWrap}>
        <Typography noWrap gutterBottom variant="h5" className={classes.title} component="h2">
          {title}
        </Typography>
        <Typography component="p" className={classes.desc}>
          {description}
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

GroupCard.propTypes = {
  classes: PropTypes.object.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  list: PropTypes.bool,
  detailOpen: PropTypes.func,
  width: PropTypes.string.isRequired
};

GroupCard.defaultProps = {
  list: false,
  detailOpen: () => (false),
};

const GroupCardResponsive = withWidth()(GroupCard);
export default withStyles(styles)(GroupCardResponsive);
