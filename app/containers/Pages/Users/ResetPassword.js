import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import brand from '@api/dummy/brand';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { ResetForm, SendResetPassword, Notification } from '@components';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../../../components/Forms/user-jss';
import { resetPassword, closeNotifAction } from './reducers/authActions';

function ResetPassword(props) {
  const [valueForm, setValueForm] = useState(null);
  const [sentPassword, setSendPassword] = useState(false);
  const dispatch = useDispatch();
  const messageNotif = useSelector(state => state.getIn(['auth', 'errorMessage']));
  const submitForm = useCallback((values) => {
    setValueForm(values);
    const email = values.get('email');
    dispatch(resetPassword(email, setSendPassword));
  }, [valueForm]);

  const title = brand.name + ' - Reset Password';
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
          {sentPassword
            ? <SendResetPassword goBack={() => setSendPassword(false)} />
            : <ResetForm onSubmit={(values) => submitForm(values)} />
          }
        </div>
      </div>
    </div>
  );
}

ResetPassword.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResetPassword);
