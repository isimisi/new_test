import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Select from 'react-select';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from 'react-redux';
import { mapSelectOptions, selectStyles } from '@api/ui/helper';
import ReactTagInput from '@pathofdev/react-tag-input';
import '@pathofdev/react-tag-input/build/index.css';
import {
  labelChange, descriptionChange, addGroup, valuesChange
} from '../../containers/Pages/Relationships/reducers/relationshipActions';


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


function RelationshipForm(props) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const {
    classes,
    label,
    description,
    group,
    groupsDropDownOptions,
    values
  } = props;

  const handleLabelChange = (e) => {
    dispatch(labelChange(e.target.value));
  };

  const handleDescriptionChange = (e) => {
    dispatch(descriptionChange(e.target.value));
  };

  const handleChangeGroups = (value) => {
    dispatch(addGroup(value.value));
  };

  const onValueChanged = (_values) => {
    dispatch(valuesChange(_values));
  };
  console.log(values.map((v, i) => ({ id: i + 1, displayValue: v })));

  return (
    <div style={{ marginBottom: 20 }}>
      <Grid container spacing={3} alignItems="flex-start" direction="row" justify="center">
        <Grid item xs={12} md={12}>
          <Paper className={classes.root}>
            <Typography variant="h5" component="h3">
              Name your
              {' '}
              Relationship
            </Typography>
            <div>
              <TextField
                name="label"
                placeholder="Label"
                label="Label"
                className={classes.field}
                onChange={handleLabelChange}
                value={label}
              />
            </div>
            <div>
              <ReactTagInput
                tags={values}
                onChange={onValueChanged}
                removeOnBackspace
                placeholder={`Mulige værdier ${label.length > 0 ? 'for ' + label : ''}`}
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
              <Select
                classes={classes}
                styles={selectStyles()}
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
                options={mapSelectOptions(groupsDropDownOptions)}
                value={group && { label: group, value: group }}
                onChange={handleChangeGroups}
              />
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

RelationshipForm.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
  description: PropTypes.string.isRequired,
  group: PropTypes.string.isRequired,
  groupsDropDownOptions: PropTypes.any.isRequired,
};

export default withStyles(styles)(RelationshipForm);
