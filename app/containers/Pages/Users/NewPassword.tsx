import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Notification from '@components/Notification/Notification';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router-dom';
import brand from '@api/dummy/brand';
import logo from '@images/logo.svg';
import styles from '@components/Forms/user-jss';
import { useTranslation } from 'react-i18next';
import NewPasswordForm from '@components/Forms/NewPasswordForm';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { closeNotifAction, newPassword } from './reducers/authActions';

function NewPassword(props) {
  const { classes } = props;
  const [valueForm, setValueForm] = useState(null);
  const history = useHistory();
  const id = history.location.pathname.split('/').pop();
  const dispatch = useAppDispatch();
  const messageNotif = useAppSelector(state => state.auth.get('errorMessage'));
  const { t } = useTranslation();

  const submitForm = useCallback(
    values => {
      setValueForm(values);
      const password = values.get('password');
      dispatch(newPassword(id, password, history));
    },
    [valueForm]
  );

  const title = brand.name + ' - Coming Soon';
  const description = brand.desc;
  return (
    <div className={classes.rootFull}>
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
        <div className={classes.fullFormWrap}>
          <Paper
            className={classNames(
              classes.fullWrap,
              classes.petal,
              classes.centerV
            )}
          >
            <div className={classes.brandCenter}>
              <div className={classes.brand}>
                <img src={logo} alt={brand.name} />
              </div>
            </div>
            <Typography
              variant="h2"
              className={classes.titleGradient}
              gutterBottom
            >
              {t('new-password-form.enter_your_new_password')}
            </Typography>
            <section className={classes.pageFormWrap}>
              <NewPasswordForm onSubmit={values => submitForm(values)} />
            </section>
          </Paper>
        </div>
      </div>
    </div>
  );
}

NewPassword.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(NewPassword);
