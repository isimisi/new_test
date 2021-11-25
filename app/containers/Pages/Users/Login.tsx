import React from 'react';
import { Helmet } from 'react-helmet';
import brand from '@api/dummy/brand';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from '@components/Forms/user-jss';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import LoginForm from '@components/Forms/LoginForm';
import Notification from '@components/Notification/Notification';
import { login, closeNotifAction } from './reducers/authActions';

const Login = props => {
  const reducer = 'auth';

  const messageNotif = useSelector(state => state[reducer].get('errorMessage'));
  const dispatch = useDispatch();
  const history = useHistory();
  const { state: locationState } = useLocation();

  const submitForm = values => {
    const email = values.get('email');
    const password = values.get('password');

    dispatch(login(email, password, history, locationState));
  };

  const title = brand.name + ' - Login';
  const description = brand.desc;
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <Notification
        close={() => dispatch(closeNotifAction)}
        message={messageNotif}
      />
      <div className={classes.container}>
        <div className={classes.userFormWrap}>
          <LoginForm onSubmit={values => submitForm(values)} />
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
