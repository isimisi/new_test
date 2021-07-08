import React, { Fragment, useMemo } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form/immutable';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Icon from '@material-ui/core/Icon';
import Hidden from '@material-ui/core/Hidden';
import brand from '@api/dummy/brand';
import logo from '@images/logo.svg';
import countryList from 'react-select-country-list';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { TextFieldRedux, SelectRedux } from './ReduxFormMUI';

import styles from './user-jss';


// validation functions
const required = value => (value === null ? 'Required' : undefined);
const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
  return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});

function RegisterForm(props) {
  const {
    classes,
    handleSubmit,
    pristine,
    submitting,
    deco
  } = props;

  const options = useMemo(() => countryList().getData(), []);

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
            <div />
            <Button size="small" className={classes.buttonLink} component={LinkBtn} to="/app">
              <Icon className={classes.icon}>arrow_forward</Icon>
              Already have an organization ?
            </Button>
          </div>
        </Hidden>
        <Typography variant="h4" className={classes.title} gutterBottom>
          Forbind dit team
        </Typography>
        <Typography variant="caption" className={classes.subtitle} gutterBottom align="center">

        </Typography>
        <section className={classes.formWrap}>
          <form onSubmit={handleSubmit}>
            <div>
              <FormControl className={classes.formControl}>
                <Field
                  name="name"
                  component={TextFieldRedux}
                  placeholder="Team / Virksomhed"
                  label="Navnet på dit team eller din virksomhed"
                  required
                  className={classes.field}
                />
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <Field
                  name="vat"
                  component={TextFieldRedux}
                  placeholder="CVR-nummer eller momsnummer"
                  label="CVR-nummer eller momsnummer"
                  required
                  validate={[required]}
                  className={classes.field}
                />
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="selection">Country</InputLabel>
                <Field
                  name="country"
                  component={SelectRedux}
                  required
                  placeholder="Land"
                  validate={[required]}
                  autoWidth
                >
                  {options.map(v => <MenuItem value={v.value}>{v.label}</MenuItem>)}
                </Field>
              </FormControl>
            </div>
            {/* <div>
              <FormControlLabel
                control={(
                  <Field name="checkbox" component={CheckboxRedux} required className={classes.agree} />
                )}
                label="Agree with"
              />
            </div> */}
            <div className={classes.btnArea}>
              <Button variant="contained" color="primary" type="submit">
                  Fortsæt
                <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} disabled={submitting || pristine} />
              </Button>
            </div>
          </form>
        </section>

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
  form: 'immutableExample',
  enableReinitialize: true,
})(RegisterForm);

const reducer = 'ui';
const RegisterFormMapped = connect(
  state => ({
    force: state,
    deco: state.getIn([reducer, 'decoration'])
  }),
)(RegisterFormReduxed);

export default withStyles(styles)(RegisterFormMapped);
