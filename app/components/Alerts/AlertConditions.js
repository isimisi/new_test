import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import NoSsr from '@material-ui/core/NoSsr';
import { red } from '@api/palette/colorfull';
import Select from 'react-select';
import Typography from '@material-ui/core/Typography';
import { mapSelectOptions, selectStyles } from '@api/ui/helper';
import DeleteIcon from '@material-ui/icons/Delete';
import QueueIcon from '@material-ui/icons/Queue';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import VisibilityIcon from '@material-ui/icons/Visibility';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 30
  },
  field: {
    width: '100%',
    marginBottom: 10,
    marginTop: 20,
  },
  fieldBasic: {
    width: '100%',
    marginBottom: 20,
    marginTop: 10
  },
  inlineWrap: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'center'
  },
  buttonInit: {
    margin: theme.spacing(4),
    textAlign: 'center'
  },
});


const AlertNamingForm = (props) => {
  const {
    classes,
    conditions,
    conditionsDropDownOptions,
    createOrSeeCondition,
    deleteCondition,
    addCondition,
    handleChangeCondition
  } = props;

  return (
    <div style={{ marginBottom: 20 }}>
      <Grid container spacing={3} alignItems="flex-start" direction="row" justify="center">
        <Grid item xs={12} md={12}>
          <Paper className={classes.root}>
            <Typography variant="h5" component="h3">
              Betingelser som dit red flag skal reagere på
            </Typography>
            {conditions.map((condition, index) => (
              <div className={classes.inlineWrap}>
                <div className={classes.field}>
                  <NoSsr>
                    <Select
                      classes={classes}
                      styles={selectStyles}
                      inputId="react-select-single-alert-condition"
                      TextFieldProps={{
                        label: 'condition',
                        InputLabelProps: {
                          htmlFor: 'react-select-single-alert-condition',
                          shrink: true,
                        },
                        placeholder: 'condition',
                      }}
                      placeholder="condition"
                      value={condition.label && { label: condition.label, value: condition.label }}
                      isOptionDisabled={(option) => conditions.map(c => c.label).includes(option.value)}
                      options={mapSelectOptions(conditionsDropDownOptions)}
                      onChange={(val) => handleChangeCondition(conditionsDropDownOptions.find(cd => cd.value === val.value), index)}
                    />
                  </NoSsr>
                </div>
                <div className={classes.inlineWrap}>
                  <IconButton style={{ color: `${red}55`, marginLeft: 5 }} onClick={() => deleteCondition(condition, index)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton color="primary" style={{ marginLeft: 5 }} onClick={() => createOrSeeCondition(condition, Boolean(condition.label))}>
                    {condition.label ? <VisibilityIcon /> : <CreateIcon />}
                  </IconButton>
                </div>
              </div>
            ))}
            <div className={classes.inlineWrap}>
              <IconButton color="primary" onClick={addCondition}>
                <QueueIcon />
              </IconButton>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

AlertNamingForm.propTypes = {
  classes: PropTypes.object.isRequired,
  conditionsDropDownOptions: PropTypes.any.isRequired,
  conditions: PropTypes.array.isRequired,
  deleteCondition: PropTypes.func.isRequired,
  addCondition: PropTypes.func.isRequired,
  handleChangeCondition: PropTypes.func.isRequired,
  createOrSeeCondition: PropTypes.func.isRequired,
};


export default withStyles(styles)(AlertNamingForm);
