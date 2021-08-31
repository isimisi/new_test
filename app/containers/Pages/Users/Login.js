import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import brand from '@api/dummy/brand';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { LoginForm, Notification } from '@components';
import styles from '@components/Forms/user-jss';
import { useSelector, useDispatch } from 'react-redux';
import {
  useHistory,
  useLocation
} from 'react-router-dom';
import connection from '@api/socket/SocketConnection';
import { login, closeNotifAction } from './reducers/authActions';


const Login = (props) => {
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

  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    connection.connect();

    // storing the subscription in the global variable
    // passing the incoming data handler fn as a second argument
    const sub = connection.subscribe('cvr:358');
    setSubscription(sub);

    // Specify how to clean up after this effect:
    return function cleanup() {
      if (subscription) {
        subscription.close();
      }
    };
  }, []);


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
      <Notification close={() => dispatch(closeNotifAction)} message={messageNotif} />
      <div className={classes.container}>
        <div className={classes.userFormWrap}>
          <LoginForm onSubmit={(values) => submitForm(values)} />
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
