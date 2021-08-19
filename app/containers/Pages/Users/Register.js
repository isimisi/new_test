import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import brand from '@api/dummy/brand';
import { RegisterForm, Notification } from '@components';
import styles from '@components/Forms/user-jss';
import { useSelector, useDispatch } from 'react-redux';
import {
  useHistory
} from 'react-router-dom';
import { register, closeNotifAction } from './reducers/authActions';

function Register(props) {
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

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);
