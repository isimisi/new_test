import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Field, reduxForm } from 'redux-form/immutable';
import Grid from '@material-ui/core/Grid';
import Select from 'react-select';
import Typography from '@material-ui/core/Typography';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import {
  TextFieldRedux,
} from 'dan-components/Forms/ReduxFormMUI';
import { initAction, clearAction } from 'dan-redux/actions/reduxFormActions';

// validation functions
const required = value => (value == null ? 'Required' : undefined);

const suggestions = [
  { label: 'All' },
  { label: 'At Least One' },
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label,
}));

const suggestionsOnBuilds = [
  { label: 'Node Title' },
  { label: 'Node Attribut' },
  { label: 'Node Description' },
  { label: 'Relationship Label' },
  { label: 'All (AND)' },
  { label: 'At Least One (OR)' },
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label,
}));

const suggestionsOnBuildType = [
  { label: 'Test1' },
  { label: 'Test2' },
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label,
}));

const suggestionsComparisons = [
  { label: 'is equal to' },
  { label: 'is not equal to' },
  { label: 'is greater than' },
  { label: 'is less than' },
  { label: 'is between than' },
  { label: 'exists' },
  { label: 'does not exist' },
  { label: 'contains' },
  { label: 'does not contain' },
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label,
}));

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 30
  },
  select: {
    width: '20%',
    marginBottom: 20,
  },
  field: {
    width: '30%',
    marginLeft: 10,
    marginBottom: 20
  },
  fieldBasic: {
    width: '100%',
    marginBottom: 20,
    marginTop: 10
  },
  inlineWrap: {
    display: 'flex',
    flexDirection: 'row'
  },
  buttonInit: {
    margin: theme.spacing(4),
    textAlign: 'center'
  },
});


function ReduxFormDemo(props) {
  const theme = useTheme();

  const {
    classes,
    handleSubmit,
    pristine,
    reset,
    submitting,
  } = props;
  const [group, setGroup] = React.useState(suggestions[0]);
  const [builds, setBuilds] = React.useState(suggestionsOnBuilds[0]);
  const [buildTypes, setBuildTypes] = React.useState(null);
  const [comparison, setComparison] = React.useState(suggestionsComparisons[0]);

  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit',
      },
    }),
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <Grid container spacing={3} alignItems="flex-start" direction="row" justify="center">
        <Grid item xs={12} md={12}>
          <Paper className={classes.root}>
            <form onSubmit={handleSubmit}>
              <div className={classes.select}>
                <Select
                  classes={classes}
                  styles={selectStyles}
                  inputId="react-select-single"
                  options={suggestions}
                  value={group}
                  onChange={(value) => setGroup(value)}
                />
              </div>
              <div className={classes.inlineWrap}>
                <div className={classes.field}>
                  <Select
                    classes={classes}
                    styles={selectStyles}
                    inputId="react-select-single"
                    options={suggestionsOnBuilds}
                    value={builds}
                    onChange={(value) => setBuilds(value)}
                  />
                </div>
                <div className={classes.field}>
                  <Select
                    classes={classes}
                    styles={selectStyles}
                    inputId="react-select-single"
                    options={suggestionsOnBuildType}
                    value={buildTypes}
                    onChange={(value) => setBuilds(value)}
                  />
                </div>
                <div className={classes.field}>
                  <Select
                    classes={classes}
                    styles={selectStyles}
                    inputId="react-select-single"
                    options={suggestionsComparisons}
                    value={comparison}
                    onChange={(value) => setComparison(value)}
                  />
                </div>
                <div className={classes.field}>
                  <Field
                    name="comparisonValue"
                    component={TextFieldRedux}
                    placeholder="value"
                    label="Value"
                    validate={required}
                    required
                  />
                </div>
              </div>
              <div>
                <Button variant="contained" color="secondary" type="submit" disabled={submitting}>
                  Save
                </Button>
                <Button
                  type="button"
                  disabled={pristine || submitting}
                  onClick={reset}
                >
                  Reset
                </Button>
              </div>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

ReduxFormDemo.propTypes = {
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

const ReduxFormMapped = reduxForm({
  form: 'immutableExample',
  enableReinitialize: true,
})(ReduxFormDemo);

const reducer = 'initval';
const FormInit = connect(
  state => ({
    force: state,
    initialValues: state.getIn([reducer, 'formValues'])
  }),
  mapDispatchToProps,
)(ReduxFormMapped);

export default withStyles(styles)(FormInit);
