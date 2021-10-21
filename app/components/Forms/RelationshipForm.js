/* eslint-disable default-case */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Select from 'react-select';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from 'react-redux';
import { mapSelectOptions, selectStyles } from '@api/ui/helper';
import CreatableSelect from 'react-select/creatable';
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
  const [inputValue, setInputValue] = useState('');

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
    dispatch(valuesChange(_values || []));
  };

  const createOption = (_label) => ({
    label: _label,
    value: _label,
  });

  const handleKeyDown = event => {
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        setInputValue('');
        dispatch(valuesChange([...values, createOption(inputValue)]));
        event.preventDefault();
    }
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <Grid container spacing={3} alignItems="flex-start" direction="row" justify="center">
        <Grid item xs={12} md={12}>
          <Paper className={classes.root}>
            <Typography variant="h5" component="h3">
              Navngiv din
              {' '}
              forbindelse
            </Typography>
            <div>
              <TextField
                name="label"
                placeholder="Navn"
                label="Label"
                className={classes.field}
                onChange={handleLabelChange}
                value={label}
              />
            </div>
            <div>
              <CreatableSelect
                style={selectStyles}
                inputValue={inputValue}
                isClearable
                isMulti
                menuIsOpen={false}
                onChange={onValueChanged}
                onInputChange={(v) => setInputValue(v)}
                onKeyDown={handleKeyDown}
                placeholder="Indtast valgmuligheder, fx en talværdi"
                value={values}
              />
            </div>
            <div className={classes.field}>
              <TextField
                name="description"
                className={classes.field}
                placeholder="Indtast beskrivelse"
                label="Beskrivelse"

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
                inputId="react-select-single-relationship"
                TextFieldProps={{
                  label: 'groups',
                  InputLabelProps: {
                    htmlFor: 'react-select-single-relationship',
                    shrink: true,
                  },
                  placeholder: 'Vælg gruppe',
                }}
                placeholder="Vælg gruppe"
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
