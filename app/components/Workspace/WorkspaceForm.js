import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import css from '@styles/Form.scss';
import '@styles/vendors/react-draft-wysiwyg/react-draft-wysiwyg.css';
import NoSsr from '@material-ui/core/NoSsr';
import Select from 'react-select';
import Tooltip from '@material-ui/core/Tooltip';
import styles from './workspace-jss';

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

const groupsDropDownOptions = [
  { label: 'Test1' },
  { label: 'Test2' },
  { label: 'Test3' },
  { label: 'Test4' },
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label,
}));

const WorkspaceForm = (props) => {
  const theme = useTheme();
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit',
      },
    }),
  };


  const {
    classes,
    closeForm,
    to,
    subject,
    inputChange
  } = props;

  const handleRequestCloseSnackBar = () => {
    setOpenSnackBar(false);
  };

  return (
    <div>
      <form>
        <section className={css.bodyForm}>
          <div>
            <TextField
              name="title"
              placeholder="Title"
              label="Title"
              className={classes.field}
              onChange={inputChange}
              value={to}
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
              onChange={inputChange}
              value={subject}
            />
          </div>
          <div className={classes.field} style={{ marginTop: theme.spacing(3) }}>
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
                options={mapSelectOptions(groupsDropDownOptions)}
                value={to && { label: to, value: to }}
                onChange={inputChange}
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
            disabled={!to || !subject}
          >
            Save
          </Button>
        </div>
      </form>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={4000}
        onClose={handleRequestCloseSnackBar}
      />
    </div>
  );
};

WorkspaceForm.propTypes = {
  classes: PropTypes.object.isRequired,
  to: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  closeForm: PropTypes.func.isRequired,
  inputChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(WorkspaceForm);
