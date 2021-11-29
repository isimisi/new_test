import React from 'react';
import { Helmet } from 'react-helmet';
import brand from '@api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import styles from '@components/Forms/user-jss';
import {
  useHistory,
  useLocation
} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import LoginForm from '@components/Forms/LoginForm';
import Notification from '@components/Notification/Notification';
import { login, closeNotifAction } from './reducers/authActions';

interface Props {
  classes: any;
}

const Login = (props: Props) => {
  const reducer = 'auth';

  const messageNotif = useAppSelector(state => state[reducer].get('errorMessage'));
  const dispatch = useAppDispatch();
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
      <Notification close={() => dispatch(closeNotifAction)} message={messageNotif} />
      <div className={classes.container}>
        <div className={classes.userFormWrap}>
          <LoginForm onSubmit={(values) => submitForm(values)} />
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(Login);
