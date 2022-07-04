import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import ArrowForward from '@mui/icons-material/ArrowForward';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import brand from '@api/dummy/brand';
import logo from '@images/logo.svg';
import { TextFieldRedux } from './ReduxFormMUI';
import styles from './user-jss';
import {useTranslation} from 'react-i18next';

// validation functions
const required = value => (value === null ? 'Required' : undefined);
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);

function ResetForm(props) {
  const {
    classes,
    handleSubmit,
    pristine,
    submitting,
    deco,
  } = props;
  const {t} = useTranslation();

  return (
    <Paper className={classNames(classes.paperWrap, deco && classes.petal)}>
      <div className={classes.topBar}>
        <NavLink to="/" className={classes.brand}>
          <img src={logo} alt={brand.name} />
        </NavLink>
      </div>
      <Typography variant="h4" className={classes.title} gutterBottom>
        {t('reset-form.reset_password')}
      </Typography>
      <Typography variant="caption" className={classes.subtitle} gutterBottom align="center">
        {t('reset-form.send_a_link')}
      </Typography>
      <section className={classes.formWrap}>
        <form onSubmit={handleSubmit}>
          <div>
            <FormControl className={classes.formControl}>
              <Field
                name="email"
                component={TextFieldRedux}
                placeholder={t('reset-form.your_email')}
                label={t('reset-form.your_email')}
                required
                validate={[required, email]}
                className={classes.field}
              />
            </FormControl>
          </div>
          <div className={classes.btnArea}>
            <Button variant="contained" color="primary" type="submit">
            {t('reset-form.btn_send_link')}
              <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} disabled={submitting || pristine} />
            </Button>
          </div>
        </form>
      </section>
    </Paper>
  );
}

ResetForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
};

const ResetFormReduxed = reduxForm({
  form: 'immutableEResetFrm',
  enableReinitialize: true,
})(ResetForm);

const reducer = 'ui';
const RegisterFormMapped = connect(
  state => ({
    force: state,
    deco: state[reducer].get('decoration')
  }),
)(ResetFormReduxed);

export default withStyles(styles)(RegisterFormMapped);
