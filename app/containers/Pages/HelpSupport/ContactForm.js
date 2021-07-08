import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Field, reduxForm } from 'redux-form/immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { PapperBlock } from '@components';
import { TextFieldRedux } from '@components/Forms/ReduxFormMUI';
import { initAction, clearAction } from '@redux/actions/reduxFormActions';
import styles from './helpSupport-jss';

// validation functions
const required = value => (value == null ? 'Required' : undefined);
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);

function ContactForm(props) {
  const trueBool = true;
  const {
    classes,
    handleSubmit,
    pristine,
    reset,
    submitting,
  } = props;
  return (
    <PapperBlock title="Kontakt os" whiteBg>
      <form onSubmit={handleSubmit}>
        <div>
          <Field
            name="name"
            component={TextFieldRedux}
            placeholder="Navn"
            label="Navn"
            validate={required}
            required
            className={classes.field}
          />
        </div>
        <div>
          <Field
            name="email"
            component={TextFieldRedux}
            placeholder="E-mail"
            label="E-mail"
            required
            validate={[required, email]}
            className={classes.field}
          />
        </div>
        <div className={classes.field}>
          <Field
            name="message"
            className={classes.field}
            component={TextFieldRedux}
            validate={required}
            placeholder="Besked"
            label="Besked"
            multiline={trueBool}
            rows={4}
          />
        </div>
        <div>
          <Button variant="contained" color="secondary" type="submit" disabled={submitting}>
            Send
          </Button>
          <Button
            type="button"
            disabled={pristine || submitting}
            onClick={reset}
          >
            Nulstil
          </Button>
        </div>
      </form>
    </PapperBlock>
  );
}

ContactForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

const mapDispatchToProps = dispatch => ({
  init: bindActionCreators(initAction, dispatch),
  clear: () => dispatch(clearAction),
});

const ContactFormMapped = reduxForm({
  form: 'immutableExample',
})(ContactForm);

const reducer = 'initval';
const FormInit = connect(
  state => ({
    force: state,
    initialValues: state.getIn([reducer, 'formValues'])
  }),
  mapDispatchToProps,
)(ContactFormMapped);

export default withStyles(styles)(FormInit);
