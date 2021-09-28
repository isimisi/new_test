import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import css from '@styles/Form.scss';
import '@styles/vendors/react-draft-wysiwyg/react-draft-wysiwyg.css';
import NoSsr from '@material-ui/core/NoSsr';
import Select from 'react-select';
import { mapSelectOptions, selectStyles } from '@api/ui/helper';
import Tooltip from '@material-ui/core/Tooltip';
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
    onSave,
    shareOrg,
    handleShareOrg
  } = props;

  return (
    <div>
      <section className={css.bodyForm}>
        <div>
          <TextField
            name="label"
            placeholder="Navn"
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
            placeholder="Indtast beskrivelse"
            label="Beskrivelse"
            multiline
            rows={2}
            value={description}
            onChange={descriptionChange}
          />
        </div>
        <Tooltip title={group === 'Ekstern' ? 'Hvis din gruppe er sat til ekstern kan den af sikkerhedsmæssige årsager ikke ændres tilbage' : ''} placement="top">
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
                  placeholder: 'Vælg gruppe',
                }}
                placeholder="Vælg gruppe"
                options={mapSelectOptions(groupsDropDownOptions)}
                value={group && { label: group, value: group }}
                onChange={addGroup}
                isDisabled={group === 'Ekstern'}
              />
            </NoSsr>
          </div>
        </Tooltip>
        <div className={classes.row} style={{ marginTop: 10 }}>
          <Checkbox
            checked={shareOrg}
            onChange={handleShareOrg}
            name="show label"
            color="primary"
          />
          <Typography variant="subtitle2">
                Del dit arbejdsområde med det resterende af din organisation
          </Typography>
        </div>
      </section>
      <div className={css.buttonArea}>
        <Button type="button" onClick={() => closeForm()}>
            Annuller
        </Button>
        <Button
          variant="contained"
          color="secondary"
          type="button"
          disabled={label?.length === 0 || group?.length === 0}
          onClick={onSave}
        >
            Gem
        </Button>
      </div>
    </div>
  );
};

WorkspaceForm.defaultProps = {
  label: '',
  description: '',
  group: ''
};

WorkspaceForm.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string,
  description: PropTypes.string,
  group: PropTypes.string,
  labelChange: PropTypes.func.isRequired,
  descriptionChange: PropTypes.func.isRequired,
  addGroup: PropTypes.func.isRequired,
  groupsDropDownOptions: PropTypes.array.isRequired,
  closeForm: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  shareOrg: PropTypes.bool.isRequired,
  handleShareOrg: PropTypes.func.isRequired,
};


export default withStyles(styles)(WorkspaceForm);
