/* eslint-disable react/prop-types */
import React from 'react';
import Lottie from 'lottie-react';
import Typography from '@mui/material/Typography';
import withStyles from '@mui/styles/withStyles';
import Paper from '@mui/material/Paper';
import classNames from 'classnames';
import Button from '@mui/material/Button';
import ArrowForward from '@mui/icons-material/ArrowForward';
import brand from '@api/dummy/brand';
import logo from '@images/logo.svg';
import { NavLink } from 'react-router-dom';
import styles from '../Forms/user-jss';
import lock from './lock.json';

const SendResetPassword = ({ classes, goBack }) => (
  <Paper className={classNames(classes.paperWrap, classes.petal)}>
    <div className={classes.topBar}>
      <NavLink to="/" className={classes.brand}>
        <img src={logo} alt={brand.name} />
      </NavLink>
    </div>
    <Typography variant="h4" className={classes.title} gutterBottom>
        Vi har sendt dig en email
    </Typography>
    <Lottie
      animationData={lock}
      style={{
        width: '50%',
        marginLeft: '25%'
      }}
    />
    <div className={classes.btnArea}>
      <Button variant="outlined" color="primary" type="submit" onClick={goBack}>
              Prøv igen med en anden mail
      </Button>
      <NavLink to="/" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary" type="submit">
              Gå til login
          <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} />
        </Button>
      </NavLink>
    </div>
  </Paper>
);

export default withStyles(styles)(SendResetPassword);
