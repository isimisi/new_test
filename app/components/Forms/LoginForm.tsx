/* eslint-disable react/prop-types */
// @ts-nocheck

import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import makeStyles from '@mui/styles/makeStyles';
import classNames from "classnames";
import { Field, reduxForm } from "redux-form/immutable";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import ArrowForward from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import Icon from "@mui/material/Icon";
import Hidden from "@mui/material/Hidden";
import brand from "@api/dummy/brand";
import logo from "@images/logo.svg";
import { useAppSelector } from "@hooks/redux";
import { useTranslation } from "react-i18next";
import { TextFieldRedux, CheckboxRedux } from "./ReduxFormMUI";
import styles from "./user-jss";
import { useAuth0 } from "@auth0/auth0-react";

// validation functions
const required = value => (value === null ? "Required" : undefined);
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email"
    : undefined;

const useStyles = makeStyles(styles);

// @ts-ignore eslint-disable-next-line
// eslint-disable-next-line react/prop-types
const LinkBtn = React.forwardRef((props, ref) => (
  <NavLink to={props.to} {...props} innerRef={ref} />
));

const LoginForm = props => {
  const [showPassword, setShowPassword] = useState(false);
  const deco = useAppSelector(state => state.ui.get("decoration"));
  const classes = useStyles();
  const { t } = useTranslation();

  const handleClickShowPassword = () => {
    setShowPassword(show => !show);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  const { loginWithRedirect } = useAuth0();
  const { handleSubmit, pristine, submitting } = props;
  return (
    <Fragment>
      <Hidden mdUp>
        <NavLink to="/" className={classNames(classes.brand, classes.outer)}>
          <img src={logo} alt={brand.name} />
        </NavLink>
      </Hidden>
      <Paper className={classNames(classes.paperWrap, deco && classes.petal)}>
        <Hidden mdDown>
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
              {t("login-form.create_account")}
            </Button>
          </div>
        </Hidden>
        <Typography variant="h4" className={classes.title} gutterBottom>
          {t("login-form.log_in")}
        </Typography>

        <section className={classes.formWrap}>
          <form onSubmit={handleSubmit}>
            <div>
              <FormControl className={classes.formControl}>
                <Field
                  name="email"
                  component={TextFieldRedux}
                  placeholder={t("login-form.your_email")}
                  label={t("login-form.your_email")}
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
                  type={showPassword ? "text" : "password"}
                  label={t("login-form.your_password")}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          size="large">
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
                label={t("login-form.remember_me")}
              />
              <Button
                size="small"
                component={LinkBtn}
                to="/reset-password"
                className={classes.buttonLink}
              >
                {t("login-form.forgot_password")}
              </Button>
            </div>
            <div className={classes.btnArea}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => loginWithRedirect()}
              >
                {t("login-form.btn_continue")}
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
  form: "immutableExample",
  enableReinitialize: true
})(LoginForm);

export default LoginFormReduxed;
