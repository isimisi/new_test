import React from 'react';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';
import { withStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const styles = theme => ({
  title: {

    fontSize: 14,
    [theme.breakpoints.up('sm')]: {
      fontSize: 16,
    },
    fontWeight: 400
  },
  counter: {
    fontSize: 28,
    fontWeight: 500,
    textAlign: 'left'
  },
  customContent: {
    textAlign: 'right'
  }
});

function CounterWidget(props) {
  const {
    classes,
    color,
    start,
    end,
    duration,
    title,
    children,
    unitBefore,
    unitAfter,
    onClick
  } = props;
  const theme = useTheme();

  const rootStyle = {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 10,
    width: '100%',
    height: 100,
    marginBottom: 6,
    display: 'flex',
    borderRadius: 10,
    [theme.breakpoints.up('sm')]: {
      height: 65 * 2,
      marginBottom: -1,
      alignItems: 'flex-end',
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
    '& > *': {
      padding: '0 5px'
    },
    backgroundColor: color
  };

  return (
    <ButtonBase style={rootStyle} onClick={onClick}>
      <div>
        <Typography className={classes.counter}>
          {unitBefore}
          <CountUp start={start} end={end} duration={duration} useEasing />
          {unitAfter}
        </Typography>
        <Typography className={classes.title} variant="subtitle1">{title}</Typography>
      </div>
      <div className={classes.customContent}>
        {children}
      </div>
    </ButtonBase>
  );
}

CounterWidget.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  unitBefore: PropTypes.string,
  unitAfter: PropTypes.string,
  onClick: PropTypes.func
};

CounterWidget.defaultProps = {
  unitBefore: '',
  unitAfter: '',
  onClick: () => {}
};

export default withStyles(styles)(CounterWidget);
