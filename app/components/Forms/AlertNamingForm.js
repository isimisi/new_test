import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import NoSsr from '@material-ui/core/NoSsr';
import Select from 'react-select';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { mapSelectOptions, selectStyles } from '@api/ui/helper';
import {
  titleChange, descriptionChange, addGroup, addCondition
} from '../../containers/Pages/Alerts/reducers/alertActions';
import {
  postCondition
} from '../../containers/Pages/Conditions/reducers/conditionActions';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 30
  },
  field: {
    width: '100%',
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


const AlertNamingForm = (props) => {
  const dispatch = useDispatch();

  const {
    classes,
    title,
    description,
    group,
    groupsDropDownOptions,
    condition,
    conditionsDropDownOptions,
    history
  } = props;


  const handleTitleChange = (e) => {
    dispatch(titleChange(e.target.value));
  };

  const handleDescriptionChange = (e) => {
    dispatch(descriptionChange(e.target.value));
  };

  const handleChangeGroups = (value) => {
    dispatch(addGroup(value.value));
  };

  const handleChangeConditions = (value) => {
    dispatch(addCondition(value.value));
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <Grid container spacing={3} alignItems="flex-start" direction="row" justify="center">
        <Grid item xs={12} md={12}>
          <Paper className={classes.root}>
            <Typography variant="h5" component="h3">
              Name your Red Flag
            </Typography>
            <div>
              <TextField
                name="title"
                placeholder="Title"
                label="Title"
                className={classes.field}
                onChange={handleTitleChange}
                value={title}
              />
            </div>
            <div className={classes.field}>
              <TextField
                name="description"
                className={classes.field}
                placeholder="Description"
                label="Description"
                multiline
                rows={2}
                onChange={handleDescriptionChange}
                value={description}
              />
            </div>
            <div className={classes.field}>
              <NoSsr>
                <Select
                  classes={classes}
                  styles={selectStyles}
                  inputId="react-select-single-alert-group"
                  TextFieldProps={{
                    label: 'groups',
                    InputLabelProps: {
                      htmlFor: 'react-select-single-alert-group',
                      shrink: true,
                    },
                    placeholder: 'groups',
                  }}
                  placeholder="groups"
                  options={mapSelectOptions(groupsDropDownOptions)}
                  value={group && { label: group, value: group }}
                  onChange={handleChangeGroups}
                />
              </NoSsr>
            </div>

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
                  options={mapSelectOptions(conditionsDropDownOptions)}
                  value={condition && { label: condition, value: condition }}
                  onChange={handleChangeConditions}
                />
              </NoSsr>
            </div>
            <div className={classes.inlineWrap}>
              <Button
                variant="contained"
                color="secondary"
                style={{
                  borderRadius: 4,
                  height: 38,
                  width: '100%'
                }}
                onClick={() => dispatch(postCondition(history, true))}
              >
                Opret betingelse
              </Button>
              {condition && (
                <Button
                  variant="contained"
                  color="secondary"
                  style={{
                    borderRadius: 4,
                    height: 38,
                    marginLeft: 10,
                    width: '100%'
                  }}
                  onClick={() => history.push('/app/conditions/' + conditionsDropDownOptions.find(c => c.value === condition).id)}
                >
                Se betingelse
                </Button>
              )}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

AlertNamingForm.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  group: PropTypes.string.isRequired,
  groupsDropDownOptions: PropTypes.any.isRequired,
  condition: PropTypes.string.isRequired,
  conditionsDropDownOptions: PropTypes.any.isRequired,
  history: PropTypes.any.isRequired,
};


export default withStyles(styles)(AlertNamingForm);
