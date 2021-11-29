import React from 'react';
import { Helmet } from 'react-helmet';
import { withStyles } from '@material-ui/core/styles';
import brand from '@api/dummy/brand';
import Notification from '@components/Notification/Notification';
import RegisterForm from '@components/Forms/RegisterForm';
import styles from '@components/Forms/user-jss';
import { useSelector, useDispatch } from 'react-redux';
import {
  useHistory
} from 'react-router-dom';
import { register, closeNotifAction } from './reducers/authActions';

interface Props {
  classes: any;
}

function Register(props: Props) {
  const reducer = 'auth';
  const messageNotif = useSelector(state => state[reducer].get('errorMessage'));
  const dispatch = useDispatch();
  const history = useHistory();

  const submitForm = values => {
    const name = values.get('name');
    const phone = null;
    const employer = values.get('employer');
    const email = values.get('email');
    const password = values.get('password');
    const marketing = values.get('marketing');

    dispatch(register(name, phone, employer, email, password, marketing, history));
  };

  const title = brand.name + ' - Register';
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
          <RegisterForm onSubmit={(values) => submitForm(values)} />
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(Register);
