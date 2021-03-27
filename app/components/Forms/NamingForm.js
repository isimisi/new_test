import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Field, reduxForm } from 'redux-form/immutable';
import Grid from '@material-ui/core/Grid';
import NoSsr from '@material-ui/core/NoSsr';
import Select from 'react-select';
import Typography from '@material-ui/core/Typography';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import {
  TextFieldRedux,
} from '@components/Forms/ReduxFormMUI';
import { initAction, clearAction } from '@redux/actions/reduxFormActions';
import TextField from '@material-ui/core/TextField';
// validation functions
const required = value => (value == null ? 'Required' : undefined);

const suggestions = [
  { label: 'Test1' },
  { label: 'Test2' },
  { label: 'Test3' },
  { label: 'Test4' },
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label,
}));

const attributeOptions = [
  { label: 'Test Attribute 1' },
  { label: 'Test Attribute 2' },
  { label: 'Test Attribute 3' },
  { label: 'Test Attribute 4' },
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label,
}));


const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 30
  },
  field: {
    width: '70%',
    marginBottom: 10
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
  const trueBool = true;
  const theme = useTheme();

  const {
    classes,
    handleSubmit,
    pristine,
    reset,
    submitting,
    type
  } = props;
  const [single, setSingle] = React.useState(null);
  const [attributes, setAttributes] = React.useState([{
    attribute: null,
    attributeValue: ''
  }]);
  function handleChangeSingle(value) {
    setSingle(value);
  }

  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit',
      },
    }),
  };

  const handleChange = (value, index, changeType) => {
    const newArray = [...attributes];
    newArray[index] = { ...newArray[index], [changeType]: value };
    setAttributes(newArray);
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <Grid container spacing={3} alignItems="flex-start" direction="row" justify="center">
        <Grid item xs={12} md={12}>
          <Paper className={classes.root}>
            <Typography variant="h5" component="h3">
              Name your
              {' '}
              {type}
            </Typography>
            <form onSubmit={handleSubmit}>
              <div>
                <Field
                  name="title"
                  component={TextFieldRedux}
                  placeholder="Title"
                  label="Title"
                  validate={required}
                  required
                  className={classes.field}
                />
              </div>
              <div className={classes.field}>
                <Field
                  name="description"
                  className={classes.field}
                  component={TextFieldRedux}
                  placeholder="Description"
                  label="Description"
                  multiline={trueBool}
                  rows={2}
                />
              </div>
              {type === 'Node' && attributes.map((attribute, index) => (
                <div className={classes.inlineWrap}>
                  <div className={classes.field}>
                    <Select
                      classes={classes}
                      styles={selectStyles}
                      inputId="react-select-single"
                      options={attributeOptions}
                      placeholder="attribute"
                      value={attribute.attribute}
                      onChange={(value) => {
                        if (attribute.attribute) {
                          handleChange(value, index, 'attribute');
                        } else {
                          const newRow = { ...attribute };
                          newRow.attribute = value;
                          setAttributes([newRow, ...attributes]);
                        }
                      }}
                    />
                  </div>
                  {attribute.attribute && (
                    <div className={classes.field} style={{ marginLeft: 20 }}>
                      <TextField
                        value={attribute.attributeValue}
                        placeholder="Value"
                        onChange={(e) => handleChange(e.target.value, index, 'attributeValue')}
                      />
                    </div>
                  )}
                </div>
              ))}
              <div className={classes.field}>
                <NoSsr>
                  <Select
                    classes={classes}
                    styles={selectStyles}
                    inputId="react-select-single"
                    TextFieldProps={{
                      label: 'groups',
                      InputLabelProps: {
                        htmlFor: 'react-select-single',
                        shrink: true,
                      },
                      placeholder: 'groups',
                    }}
                    placeholder="groups"
                    options={suggestions}
                    value={single}
                    onChange={handleChangeSingle}
                  />
                </NoSsr>
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
  type: PropTypes.string.isRequired,
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
