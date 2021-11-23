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
import styles from './condition-jss';
import { useTranslation } from 'react-i18next';

const ConditionForm = (props) => {
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
  const {t} = useTranslation();
  return (
    <div>
      <section className={css.bodyForm}>
        <div>
          <TextField
            name="label"
            placeholder={t('conditions.condition-form.form_name')}
            label={t('conditions.condition-form.form_name')}
            className={classes.field}
            value={label}
            onChange={labelChange}
          />
        </div>
        <div>
          <TextField
            name="description"
            className={classes.field}
            placeholder={t('conditions.condition-form.form_desc')}
            label={t('conditions.condition-form.form_desc')}
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
              inputId="react-select-single-condition"
              TextFieldProps={{
                label: t('conditions.condition-form.select_group'),
                InputLabelProps: {
                  htmlFor: 'react-select-single-condition',
                  shrink: true,
                },
                placeholder: t('conditions.condition-form.select_group'),
              }}
              placeholder={t('conditions.condition-form.select_group')}
              options={mapSelectOptions(groupsDropDownOptions)}
              value={group && { label: group, value: group }}
              onChange={addGroup}
            />
          </NoSsr>
        </div>
      </section>
      <div className={css.buttonArea}>
        <Button type="button" onClick={() => closeForm()}>
        {t('conditions.condition-form.btn_cnx')}
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={onSave}
        >
            {t('conditions.condition-form.btn_save')}
        </Button>
      </div>
    </div>
  );
};

ConditionForm.propTypes = {
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

export default withStyles(styles)(ConditionForm);
