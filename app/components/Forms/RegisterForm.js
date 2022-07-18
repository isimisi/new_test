/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Field, reduxForm } from "redux-form/immutable";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ArrowForward from "@material-ui/icons/ArrowForward";
import AllInclusive from "@material-ui/icons/AllInclusive";
import Brightness5 from "@material-ui/icons/Brightness5";
import People from "@material-ui/icons/People";
import Icon from "@material-ui/core/Icon";
import Hidden from "@material-ui/core/Hidden";
import brand from "@api/ui/brand";
import logo from "@images/logo.svg";
import { useTranslation } from "react-i18next";
import { TextFieldRedux, CheckboxRedux } from "./ReduxFormMUI";
import styles from "./user-jss";

const LinkBtn = React.forwardRef(
  (props, ref) => (
    // eslint-disable-line
    // eslint-disable-next-line react/prop-types
    <NavLink to={props.to} {...props} innerRef={ref} />
  ) // eslint-disable-line
);

function RegisterForm(props) {
  const [tab, setTab] = useState(0);
  const { t } = useTranslation();

  const handleChangeTab = (event, value) => {
    setTab(value);
  };

  const { classes, handleSubmit, pristine, submitting, deco } = props;
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
              to="/login"
            >
              <Icon className={classes.icon}>arrow_forward</Icon>
              {t("register-form.already_have_account")}
            </Button>
          </div>
        </Hidden>
        <Typography variant="h4" className={classes.title} gutterBottom>
          {t("register-form.register")}
        </Typography>
        <Tabs
          value={tab}
          onChange={handleChangeTab}
          indicatorColor="secondary"
          textColor="secondary"
          centered
          className={classes.tab}
        >
          <Tab label={t("register-form.single_sign_on")} />
          <Tab label={t("register-form.company_login")} disabled />
        </Tabs>
        {tab === 0 && (
          <section className={classes.formWrap}>
            <form onSubmit={handleSubmit}>
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="name"
                    component={TextFieldRedux}
                    placeholder={t("register-form.your_name")}
                    label={t("register-form.your_name")}
                    required
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="employer"
                    component={TextFieldRedux}
                    placeholder={t("register-form.employer")}
                    label={t("register-form.employer")}
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="email"
                    component={TextFieldRedux}
                    placeholder={t("register-form.your_email")}
                    label={t("register-form.your_email")}
                    required
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="password"
                    component={TextFieldRedux}
                    type="password"
                    label={t("register-form.your_password")}
                    required
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="passwordConfirm"
                    component={TextFieldRedux}
                    type="password"
                    required
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 7,
                }}
              >
                <FormControlLabel
                  classes={{ label: classes.formLabel }}
                  control={
                    <Field
                      name="checkbox"
                      component={CheckboxRedux}
                      required
                      className={classes.agree}
                    />
                  }
                  required
                />
                <Typography className={classes.formLabel}>
                  {t("register-form.i_accept")}
                  <Fragment>&nbsp;</Fragment>
                </Typography>
                <a
                  onClick={() =>
                    window.open("https://juristic.io/terms", "_blank").focus()
                  }
                  className={classes.link}
                >
                  {t("register-form.terms_and_conditions")}
                </a>
                <Fragment>&nbsp;</Fragment>
                <Typography className={classes.formLabel}>
                  {t("register-form.and")}
                </Typography>
                <Fragment>&nbsp;</Fragment>
                <a
                  onClick={() =>
                    window.open("https://juristic.io/privacy", "_blank").focus()
                  }
                  className={classes.link}
                >
                  {t("register-form.privacy")}
                </a>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 7,
                }}
              >
                <FormControlLabel
                  classes={{ label: classes.formLabel }}
                  control={
                    <Field
                      name="marketing"
                      component={CheckboxRedux}
                      className={classes.agree}
                    />
                  }
                />
                <Typography className={classes.formLabel}>
                  {t("register-form.keep_me_updated")}
                </Typography>
              </div>
              <div className={classes.btnArea}>
                <Button variant="contained" color="primary" type="submit">
                  {t("register-form.btn_continue")}
                  <ArrowForward
                    className={classNames(classes.rightIcon, classes.iconSmall)}
                    disabled={submitting || pristine}
                  />
                </Button>
              </div>
            </form>
          </section>
        )}
        {tab === 1 && (
          <section className={classes.socmedFull}>
            <Button
              fullWidth
              variant="outlined"
              size="large"
              className={classes.redBtn}
              type="button"
            >
              <AllInclusive className={classNames(classes.leftIcon, classes.iconSmall)} />
              Socmed 1
            </Button>
            <Button
              fullWidth
              variant="outlined"
              size="large"
              className={classes.blueBtn}
              type="button"
            >
              <Brightness5 className={classNames(classes.leftIcon, classes.iconSmall)} />
              Socmed 2
            </Button>
            <Button
              fullWidth
              variant="outlined"
              size="large"
              className={classes.cyanBtn}
              type="button"
            >
              <People className={classNames(classes.leftIcon, classes.iconSmall)} />
              Socmed 3
            </Button>
          </section>
        )}
      </Paper>
    </Fragment>
  );
}

RegisterForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
};

const RegisterFormReduxed = reduxForm({
  form: "immutableExample",
  enableReinitialize: true,
})(RegisterForm);

const reducer = "ui";
const RegisterFormMapped = connect((state) => ({
  force: state,
  deco: state[reducer].get("decoration"),
}))(RegisterFormReduxed);

export default withStyles(styles)(RegisterFormMapped);
