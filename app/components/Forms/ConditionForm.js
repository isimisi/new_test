import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Select from 'react-select';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import { useDispatch, } from 'react-redux';
import {
  addType, addConditionValue
} from '../../containers/Pages/Conditions/reducers/conditionActions';

const mapSelectOptions = (options) => options.map(suggestion => ({
  value: suggestion.value,
  label: (
    <>
      <Tooltip title={suggestion.label}>
        <div style={{ width: '100%', height: '100%' }}>
          <span style={{ paddingRight: '5px' }}>{suggestion.value}</span>
        </div>
      </Tooltip>
    </>
  ),
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
  }
});


function ConditionForm(props) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const {
    classes,
    conditionValues,
    type,
    andOrOption,
    buildTypeOptions,
    nodeLabels,
    nodeDescriptions,
    nodeAttributes,
    relationshipLabels,
    comparisonsOptions
  } = props;

  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit',
      },
    }),
  };

  const handleChange = (value, index, _type) => {
    const newArray = [...conditionValues];
    console.log(newArray[index]);
    newArray[index] = { ...newArray[index], [_type]: value };
    console.log(newArray[index]);
    dispatch(addConditionValue(newArray));
  };

  const handleNewRow = (row, buildType) => {
    const newRow = { ...row };
    newRow.build_type = buildType;
    const i = conditionValues.length - 1;
    const mutableArray = [...conditionValues];
    mutableArray.splice(i, 0, newRow);

    dispatch(addConditionValue(mutableArray));
  };

  const getListFromType = (_type) => {
    switch (_type) {
      case buildTypeOptions[0].label:
        return nodeLabels;
      case buildTypeOptions[1].label:
        return nodeAttributes;
      case buildTypeOptions[2].label:
        return nodeDescriptions;
      case buildTypeOptions[3].label:
        return relationshipLabels;
      default:
        return nodeLabels;
    }
  };


  return (
    <div style={{ marginBottom: 20 }}>
      <Grid container spacing={3} alignItems="flex-start" direction="row" justify="center">
        <Grid item xs={12} md={12}>
          <Paper className={classes.root}>
            <div className={classes.select}>
              <Select
                classes={classes}
                styles={selectStyles}
                options={andOrOption}
                value={type && { label: type, value: type }}
                onChange={(value) => dispatch(addType(value.value))}
              />
            </div>
            {conditionValues.map((row, index) => (
              <div className={classes.inlineWrap}>
                {index > 0
                  && (
                    <div>
                      <div className={classes.andOrDiv}>
                        <Typography variant="P">
                          {type === 'All' ? 'AND' : 'OR'}
                        </Typography>
                      </div>
                    </div>
                  )
                }
                <div className={classes.field}>
                  <Select
                    classes={classes}
                    styles={selectStyles}
                    options={buildTypeOptions}
                    value={row.build_type && { label: row.build_type, value: row.build_type }}
                    placeholder="Build Type"
                    onChange={(value) => {
                      if (row.build_type) {
                        handleChange(value.value, index, 'build_type');
                      } else {
                        handleNewRow(row, value.value);
                      }
                    }}
                  />
                </div>
                {row.build_type
                  && (
                    <>
                      <div className={classes.field}>
                        <Select
                          classes={classes}
                          styles={selectStyles}
                          options={mapSelectOptions(getListFromType(row.build_type))}
                          value={row.build_value && { label: row.build_value, value: row.build_value }}
                          onChange={(value) => handleChange(value.value, index, 'build_value')}
                        />
                      </div>
                      <div className={classes.field}>
                        <Select
                          classes={classes}
                          styles={selectStyles}
                          options={comparisonsOptions}
                          value={row.comparison_type && { label: row.comparison_type, value: row.comparison_type }}
                          onChange={(value) => handleChange(value.value, index, 'comparison_type')}
                        />
                      </div>
                      {!['exists', 'does not exist'].includes(row.comparison_type.value) ? (
                        <div className={classes.field}>
                          <TextField
                            value={row.comparison_value}
                            placeholder="Value"
                            onChange={(e) => handleChange(e.target.value, index, 'comparison_value')}
                          />
                        </div>
                      ) : null}
                    </>
                  )
                }
              </div>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

ConditionForm.propTypes = {
  classes: PropTypes.object.isRequired,
  conditionValues: PropTypes.any.isRequired,
  type: PropTypes.string.isRequired,
  andOrOption: PropTypes.any.isRequired,
  buildTypeOptions: PropTypes.any.isRequired,
  nodeLabels: PropTypes.any.isRequired,
  nodeDescriptions: PropTypes.any.isRequired,
  nodeAttributes: PropTypes.any.isRequired,
  relationshipLabels: PropTypes.any.isRequired,
  comparisonsOptions: PropTypes.any.isRequired
};

export default withStyles(styles)(ConditionForm);
