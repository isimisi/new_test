import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Field, reduxForm } from 'redux-form/immutable';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import ArrowForward from '@material-ui/icons/ArrowForward';
import { useTranslation } from 'react-i18next';
import { TextFieldRedux } from './ReduxFormMUI';
import styles from './user-jss';

// validation functions
const required = value => (value === null ? 'Required' : undefined);

const passwordsMatch = (value, allValues) => {
  if (value !== allValues.get('password')) {
    return 'Passwords dont match';
  }
  return undefined;
};

function ResetForm(props) {
  const {
    classes,
    handleSubmit,
    pristine,
    submitting,
  } = props;
  const { t } = useTranslation();
  return (
    <>
      <section>
        <form onSubmit={handleSubmit}>
          <div>
            <FormControl className={classes.formControl}>
              <Field
                name="password"
                component={TextFieldRedux}
                type={t('new-password-form.your_password')}
                label={t('new-password-form.your_password')}
                required
                validate={[required, passwordsMatch]}
                className={classes.field}
              />
            </FormControl>
          </div>
          <div>
            <FormControl className={classes.formControl}>
              <Field
                name="passwordConfirm"
                component={TextFieldRedux}
                type={t('new-password-form.enter_your_password_again')}
                label={t('new-password-form.enter_your_password_again')}
                required
                validate={[required, passwordsMatch]}
                className={classes.field}
              />
            </FormControl>
          </div>
          <div className={classes.btnArea}>
            <Button variant="contained" color="primary" type="submit">
              {t('new-password-form.log_in')}
              <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} disabled={submitting || pristine} />
            </Button>
          </div>
        </form>
      </section>
    </>
  );
}

ResetForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

const ResetFormReduxed = reduxForm({
  form: 'immutableEResetFrm',
  enableReinitialize: true,
})(ResetForm);

export default withStyles(styles)(ResetFormReduxed);
