/* eslint-disable react/no-unescaped-entities */
/* eslint-disable default-case */
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import NoSsr from '@material-ui/core/NoSsr';
import Select from 'react-select';
import { withStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CreatableSelect from 'react-select/creatable';
import Tooltip from '@material-ui/core/Tooltip';
import { useDispatch } from 'react-redux';
import styles from './attribute-jss';
import {
  addType, addGroup, descriptionChange, labelChange, changeSelectionValues
} from './reducers/attributeActions';

const typeSuggestions = [
  { label: 'Valgmuligheder', value: 'Selction' },
  { label: 'Værdi', value: 'Value' },
];

const createOption = (label) => ({
  label,
  value: label,
});

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

const Attribute = (props) => {
  const {
    classes,
    open,
    handleClose,
    handleSave,
    groupsDropDownOptions,
    group,
    label,
    description,
    type,
    selectionOptions
  } = props;

  const theme = useTheme();
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  const handleKeyDown = event => {
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        setInputValue('');
        dispatch(changeSelectionValues([...selectionOptions.toJS(), createOption(inputValue)]));
        event.preventDefault();
    }
  };

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
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Skab nyt kendetegn</DialogTitle>
      <DialogContent>
        <DialogContentText>
            Her kan du skabe en nyt kendetegn. Du skal først vælge, om der skal kunne indtastes en specifik værdi ("Værdi"), eller om brugeren skal kunne vælge mellem nogle specifikke ting ("Valgmugligheder").
        </DialogContentText>
        <div className={classes.inlineWrap}>
          <div className={classes.field} style={{ width: '30%' }}>
            <NoSsr>
              <Select
                classes={classes}
                styles={selectStyles}
                inputId="react-select-single-attribute"
                TextFieldProps={{
                  label: 'type',
                  InputLabelProps: {
                    htmlFor: 'react-select-single-attribute',
                    shrink: true,
                  },
                  placeholder: 'type',
                }}
                placeholder="type"
                options={typeSuggestions}
                value={{ label: type, value: type }}
                onChange={(v) => dispatch(addType(v.value))}
              />
            </NoSsr>
          </div>
          <div className={classes.field} style={{ width: '30%', marginLeft: 10 }}>
            <NoSsr>
              <Select
                classes={classes}
                styles={selectStyles}
                inputId="react-select-single-attr-group"
                TextFieldProps={{
                  label: 'group',
                  InputLabelProps: {
                    htmlFor: 'react-select-single-attr-group',
                    shrink: true,
                  },
                  placeholder: 'Vælg gruppe',
                }}
                placeholder="Vælg gruppe"
                options={mapSelectOptions(groupsDropDownOptions)}
                value={group && { label: group, value: group }}
                onChange={(v) => dispatch(addGroup(v.value))}
              />
            </NoSsr>
          </div>
        </div>
        <TextField
          autoFocus
          margin="dense"
          id="attribute"
          label="Navn (fx 'Antal medarbejdere' eller 'Land')"
          value={label}
          onChange={(e) => dispatch(labelChange(e.target.value))}
          fullWidth
        />
        {type === 'Selection' && (
          <CreatableSelect
            style={selectStyles}
            inputValue={inputValue}
            isClearable
            isMulti
            menuIsOpen={false}
            onChange={(v) => dispatch(changeSelectionValues(v || []))}
            onInputChange={(v) => setInputValue(v)}
            onKeyDown={handleKeyDown}
            placeholder="Indtast faste Valgmuligheder"
            value={selectionOptions.toJS()}
          />
        )}
        <div className={classes.field}>
          <TextField
            name="description"
            className={classes.field}
            placeholder="Beskrivelse"
            label="Beskrivelse"
            multiline
            onChange={(e) => dispatch(descriptionChange(e.target.value))}
            value={description}
            rows={2}
            fullWidth
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave} color="primary">
                Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

Attribute.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  groupsDropDownOptions: PropTypes.any.isRequired,
  group: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  selectionOptions: PropTypes.any.isRequired
};


export default withStyles(styles)(Attribute);
