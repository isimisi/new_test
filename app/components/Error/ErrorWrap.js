import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Route, Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import notFound from './notFound.json';

const styles = theme => ({
  errorWrap: {
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    borderRadius: '50%',
    width: 700,
    height: 700,
    [theme.breakpoints.down('sm')]: {
      width: 400,
      height: 400,
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    position: 'relative',
    margin: `${theme.spacing(3)}px auto`,
    '& h5': {
      [theme.breakpoints.down('sm')]: {
        fontSize: '1.2rem',
      },
    },
  },
  title: {
    color: theme.palette.primary.main,
    textShadow: `10px 6px 50px ${theme.palette.primary.main}`,
    [theme.breakpoints.down('sm')]: {
      fontSize: '4rem',
      marginBottom: theme.spacing(2)
    },
  },
  deco: {
    boxShadow: theme.shadows[2],
    position: 'absolute',
    borderRadius: 2,
  },
  button: {
    marginTop: 24
  },
  lottie: {
    borderRadius: '50%',
    width: 700 / 1.5,
    height: 700 / 1.5,
    [theme.breakpoints.down('sm')]: {
      width: 400 / 1.5,
      height: 400 / 1.5,
    },
  }
});

const ErrorWrap = (props) => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) {
        staticContext.status = 404; // eslint-disable-line
      }
      const { classes, desc } = props;
      return (
        <div className={classes.errorWrap}>
          <Lottie animationData={notFound} className={classes.lottie} />
          <Typography variant="h6">{desc}</Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            component={Link}
            to="/app/"
          >
            Gå til forside
          </Button>
        </div>
      );
    }}
  />
);

ErrorWrap.propTypes = {
  classes: PropTypes.object.isRequired,
  desc: PropTypes.string.isRequired,
};

export default withStyles(styles)(ErrorWrap);
