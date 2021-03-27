import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { reduxForm } from 'redux-form/immutable';
import Grid from '@material-ui/core/Grid';
import Select from 'react-select';
import Typography from '@material-ui/core/Typography';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { initAction, clearAction } from '@redux/actions/reduxFormActions';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';


const andOrOption = [
  { label: 'All' },
  { label: 'At Least One' },
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label,
}));

const buildTypeOptions = [
  { label: 'Node Title' },
  { label: 'Node Attribut' },
  { label: 'Node Description' },
  { label: 'Relationship Label' },
  // { label: 'All (AND)' },
  // { label: 'At Least One (OR)' },
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label,
}));

const buildValuesOptions = [
  { label: 'Test1' },
  { label: 'Test2' },
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label,
}));

const comparisonsOptions = [
  { label: 'is equal to' },
  { label: 'is not equal to' },
  { label: 'is greater than' },
  { label: 'is less than' },
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
    width: '25%',
    marginLeft: 10,
    marginBottom: 20,
  },
  fieldBasic: {
    width: '100%',
    marginBottom: 20,
    marginTop: 10
  },
  inlineWrap: {
    display: 'flex',
    flexDirection: 'row',
  },
  buttonInit: {
    margin: theme.spacing(4),
    textAlign: 'center'
  },
  andOrDiv: {
    backgroundColor: theme.palette.type === 'dark' ? '#303030' : '#F7F8FA',
    border: theme.palette.type === 'dark' ? '1px solid #606060' : '1px solid #F1F1F1',
    borderRadius: theme.rounded.small,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    whiteSpace: 'nowrap'
  },
  addBtn: {
    position: 'fixed',
    bottom: 30,
    right: 50,
    width: 200,
    height: 60,
    zIndex: 100,
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
  const [andOrOptionValues, setAndOrOptionValues] = React.useState(andOrOption[0]);
  const [rows, setRows] = React.useState([
    {
      buildType: null,
      buildValue: null,
      comparisonType: comparisonsOptions[0],
      comparisonValue: ''
    }
  ]);


  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit',
      },
    }),
  };

  const handleChange = (value, index, type) => {
    const newArray = [...rows];
    console.log(newArray);
    newArray[index] = { ...newArray[index], [type]: value };
    setRows(newArray);
  };

  console.log(rows);
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
                  options={andOrOption}
                  value={andOrOptionValues}
                  onChange={(value) => setAndOrOptionValues(value)}
                />
              </div>
              {rows.map((row, index) => (
                <div className={classes.inlineWrap}>
                  {index > 0
                  && (
                    <div>
                      <div className={classes.andOrDiv}>
                        <Typography variant="P">
                          {andOrOptionValues.value === 'All' ? 'AND' : 'OR'}
                        </Typography>
                      </div>
                    </div>
                  )
                  }
                  <div className={classes.field}>
                    <Select
                      classes={classes}
                      styles={selectStyles}
                      inputId="react-select-single"
                      options={buildTypeOptions}
                      value={row.buildType}
                      placeholder="Build Type"
                      onChange={(value) => {
                        if (row.buildType) {
                          handleChange(value, index, 'buildType');
                        } else {
                          const newRow = { ...row };
                          newRow.buildType = value;
                          setRows([newRow, ...rows]);
                        }
                      }}
                    />
                  </div>
                  {row.buildType
                  && (
                    <>
                      <div className={classes.field}>
                        <Select
                          classes={classes}
                          styles={selectStyles}
                          inputId="react-select-single"
                          options={buildValuesOptions}
                          value={row.buildValue}
                          onChange={(value) => handleChange(value, index, 'buildValue')}
                        />
                      </div>
                      <div className={classes.field}>
                        <Select
                          classes={classes}
                          styles={selectStyles}
                          inputId="react-select-single"
                          options={comparisonsOptions}
                          value={row.comparisonType}
                          onChange={(value) => handleChange(value, index, 'comparisonType')}
                        />
                      </div>
                      {!['exists', 'does not exist'].includes(row.comparisonType.value) ? (
                        <div className={classes.field}>
                          <TextField
                            value={row.comparisonValue}
                            placeholder="Value"
                            onChange={(e) => handleChange(e.target.value, index, 'comparisonValue')}
                          />
                        </div>
                      ) : null}
                    </>
                  )
                  }
                </div>
              ))}

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
      <div>
        <Tooltip title="Analyser">
          <Fab variant="extended" color="primary" className={classes.addBtn}>
            Save Condition
          </Fab>
        </Tooltip>
      </div>
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
