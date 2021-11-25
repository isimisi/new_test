/* eslint-disable react/prop-types */
// @ts-nocheck

import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Field, reduxForm } from 'redux-form/immutable';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import Hidden from '@material-ui/core/Hidden';
import brand from '@api/dummy/brand';
import logo from '@images/logo.svg';
import { useAppSelector } from '@hooks/redux';
import { useTranslation } from 'react-i18next';
import { TextFieldRedux, CheckboxRedux } from './ReduxFormMUI';
import styles from './user-jss';

// validation functions
const required = value => (value === null ? 'Required' : undefined);
const email = value => (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ? 'Invalid email'
  : undefined);

const useStyles = makeStyles(styles);

// @ts-ignore eslint-disable-next-line
// eslint-disable-next-line react/prop-types
const LinkBtn = React.forwardRef((props, ref) => (
  <NavLink to={props.to} {...props} innerRef={ref} />
));

const LoginForm = props => {
  const [showPassword, setShowPassword] = useState(false);
  const deco = useAppSelector(state => state.ui.get('decoration'));
  const classes = useStyles();
  const { t } = useTranslation();

  const handleClickShowPassword = () => {
    setShowPassword(show => !show);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const { handleSubmit, pristine, submitting } = props;
  return (
    <Fragment>
      <Hidden mdUp>
        <NavLink to="/" className={classNames(classes.brand, classes.outer)}>
          <img src={logo} alt={brand.name} />
        </NavLink>
      </Hidden>
      <Paper className={classNames(classes.paperWrap, deco && classes.petal)}>
        <Hidden smDown>
          <div className={classes.topBar}>
            <NavLink to="/" className={classes.brand}>
              <img src={logo} alt={brand.name} />
            </NavLink>
            <Button
              size="small"
              className={classes.buttonLink}
              component={LinkBtn}
              to="/register"
            >
              <Icon className={classes.icon}>arrow_forward</Icon>
              {t('login-form.create_account')}
            </Button>
          </div>
        </Hidden>
        <Typography variant="h4" className={classes.title} gutterBottom>
          {t('login-form.log_in')}
        </Typography>

        <section className={classes.formWrap}>
          <form onSubmit={handleSubmit}>
            <div>
              <FormControl className={classes.formControl}>
                <Field
                  name="email"
                  component={TextFieldRedux}
                  placeholder={t('login-form.your_email')}
                  label={t('login-form.your_email')}
                  required
                  validate={[required, email]}
                  className={classes.field}
                />
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <Field
                  name="password"
                  component={TextFieldRedux}
                  type={showPassword ? 'text' : 'password'}
                  label={t('login-form.your_password')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  required
                  validate={required}
                  className={classes.field}
                />
              </FormControl>
            </div>
            <div className={classes.optArea}>
              <FormControlLabel
                className={classes.label}
                control={<Field name="checkbox" component={CheckboxRedux} />}
                label={t('login-form.remember_me')}
              />
              <Button
                size="small"
                component={LinkBtn}
                to="/reset-password"
                className={classes.buttonLink}
              >
                {t('login-form.forgot_password')}
              </Button>
            </div>
            <div className={classes.btnArea}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
              >
                {t('login-form.btn_continue')}
                <ArrowForward
                  className={classNames(classes.rightIcon, classes.iconSmall)}
                  disabled={submitting || pristine}
                />
              </Button>
            </div>
          </form>
        </section>
      </Paper>
    </Fragment>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired
};

const LoginFormReduxed = reduxForm({
  form: 'immutableExample',
  enableReinitialize: true
})(LoginForm);

export default LoginFormReduxed;
