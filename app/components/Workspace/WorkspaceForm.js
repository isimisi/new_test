import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import css from '@styles/Form.scss';
import '@styles/vendors/react-draft-wysiwyg/react-draft-wysiwyg.css';
import NoSsr from '@material-ui/core/NoSsr';
import Select from 'react-select';
import { mapSelectOptions, selectStyles } from '@api/ui/helper';
import styles from './workspace-jss';

const WorkspaceForm = (props) => {
  const theme = useTheme();

  const {
    classes,
    closeForm,
    label,
    description,
    group,
    labelChange,
    descriptionChange,
    addGroup,
    groupsDropDownOptions,
    onSave
  } = props;

  return (
    <div>
      <section className={css.bodyForm}>
        <div>
          <TextField
            name="label"
            placeholder="Label"
            label="Label"
            className={classes.field}
            value={label}
            onChange={labelChange}
          />
        </div>
        <div>
          <TextField
            name="description"
            className={classes.field}
            placeholder="Description"
            label="Description"
            multiline
            rows={2}
            value={description}
            onChange={descriptionChange}
          />
        </div>
        <div className={classes.field} style={{ marginTop: theme.spacing(3) }}>
          <NoSsr>
            <Select
              classes={classes}
              styles={selectStyles('relative')}
              inputId="react-select-single-workspace"
              TextFieldProps={{
                label: 'groups',
                InputLabelProps: {
                  htmlFor: 'react-select-single-workspace',
                  shrink: true,
                },
                placeholder: 'groups',
              }}
              placeholder="groups"
              options={mapSelectOptions(groupsDropDownOptions)}
              value={group && { label: group, value: group }}
              onChange={addGroup}
            />
          </NoSsr>
        </div>
      </section>
      <div className={css.buttonArea}>
        <Button type="button" onClick={() => closeForm()}>
            Discard
        </Button>
        <Button
          variant="contained"
          color="secondary"
          type="button"
          disabled={label.length === 0 || description.length === 0 || group.length === 0}
          onClick={onSave}
        >
            Save
        </Button>
      </div>
    </div>
  );
};

WorkspaceForm.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  group: PropTypes.string.isRequired,
  labelChange: PropTypes.func.isRequired,
  descriptionChange: PropTypes.func.isRequired,
  addGroup: PropTypes.func.isRequired,
  groupsDropDownOptions: PropTypes.array.isRequired,
  closeForm: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default withStyles(styles)(WorkspaceForm);
