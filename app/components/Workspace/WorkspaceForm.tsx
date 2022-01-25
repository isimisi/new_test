/* eslint-disable no-case-declarations */
/* eslint-disable default-case */
/* eslint-disable camelcase */
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
import ButtonBase from '@material-ui/core/ButtonBase';
import CreatableSelect from 'react-select/creatable';
import { useTranslation } from 'react-i18next';
import { hanldeOnChange, tagMapping } from '@components/Tags/constants';
import styles from './workspace-jss';
import { useAuth0 } from "@auth0/auth0-react";
import { getPlanId } from '@helpers/userInfo';


const WorkspaceForm = (props) => {
  const theme = useTheme();
  const { user } = useAuth0();
  const plan_id = getPlanId(user);

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
    handleShareOrg,
    tagOptions,
    tags,
    changeTags
  } = props;
  const { t } = useTranslation();

  return (
    <div>
      <section className={css.bodyForm}>
        <div>
          <TextField
            name="label"
            placeholder={t('workspaces.workspace-form.name')}
            label={t('workspaces.workspace-form.name')}
            className={classes.field}
            value={label}
            onChange={labelChange}
          />
        </div>
        <div>
          <TextField
            name="description"
            className={classes.field}
            placeholder={t('workspaces.workspace-form.desc')}
            label={t('workspaces.workspace-form.desc')}
            multiline
            rows={2}
            value={description}
            onChange={descriptionChange}
          />
        </div>
        <Tooltip title={group === 'Ekstern' ? 'Hvis din gruppe er sat til ekstern kan den af sikkerhedsmæssige årsager ikke ændres tilbage' : ''} placement="top">
          <div className={classes.field} style={{ marginTop: theme.spacing(2) }}>
            <NoSsr>
              <Select
                classes={classes}
                styles={selectStyles('relative')}
                inputId="react-select-single-workspace"
                TextFieldProps={{
                  label: t('workspaces.workspace-form.select_group'),
                  InputLabelProps: {
                    htmlFor: 'react-select-single-workspace',
                    shrink: true,
                  },
                  placeholder: t('workspaces.workspace-form.select_group'),
                }}
                placeholder={t('workspaces.workspace-form.select_group')}
                options={mapSelectOptions(groupsDropDownOptions)}
                value={group && { label: group, value: group }}
                onChange={addGroup}
                isDisabled={group === 'Ekstern'}
              />
            </NoSsr>
          </div>
        </Tooltip>
        <div className={classes.field} style={{ marginTop: theme.spacing(2) }}>
          <CreatableSelect
            styles={selectStyles('relative')}
            isMulti
            isClearable
            value={tags.map(tagMapping)}
            onChange={(newValue, meta) => hanldeOnChange(newValue, meta, changeTags, tags)
            }
            inputId="react-select-tags"
            placeholder={t('workspaces.workspace-form.add_tags_to_your_workspace')}
            options={tagOptions.map(tagMapping)}
          />
        </div>
        {plan_id !== 1 && (
          <ButtonBase
            className={classes.row}
            style={{ marginTop: 10 }}
            onClick={handleShareOrg}
          >
            <Checkbox
              checked={shareOrg}
              name="show label"
              color="primary"
            />
            <Typography variant="subtitle2">
              {t('workspaces.workspace-form.checkbox')}
            </Typography>
          </ButtonBase>
        )}
      </section>
      <div className={css.buttonArea}>
        {closeForm && (
          <Button type="button" onClick={closeForm}>
            {t('workspaces.workspace-form.btn_cnx')}
          </Button>
        )}
        <Button
          variant="contained"
          color="secondary"
          type="button"
          disabled={label?.length === 0 || group?.length === 0}
          onClick={onSave}
        >
          {t('workspaces.workspace-form.btn_save')}
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
  tagOptions: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  changeTags: PropTypes.func.isRequired,
};


export default withStyles(styles)(WorkspaceForm);
