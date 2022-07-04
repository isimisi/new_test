import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '@mui/styles/withStyles';

import petalLight from '@images/petal_bg.svg';
import styles from './appStyles-jss';

function Decoration(props) {
  const {
    classes,
  } = props;


  return (
    <div className={classes.bgWrap}>
      <img src={petalLight} alt="decoration" className={classes.decorationPetal} />
      {/* <div
        className={classNames(
          classes.bgbar,
          horizontalMenu && classes.highTop,
          gradient ? classes.gradientBg : classes.solidBg,
          getBgPosition(bgPosition),
        )}
      >
        <img src={petalLight} alt="decoration" className={classes.decorationPetal} />
      </div> */}
    </div>
  );
}

Decoration.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (withStyles(styles)(Decoration));
