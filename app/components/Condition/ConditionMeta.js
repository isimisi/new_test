import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import ConditionForm from './ConditionForm';
import FloatingPanel from '../Panel/FloatingPanel';
import styles from './condition-jss';

function ConditionMeta(props) {
  const {
    open,
    closeForm,
    label,
    description,
    group,
    labelChange,
    descriptionChange,
    addGroup,
    groupsDropDownOptions,
    onSave,
    tagOptions,
    tags,
    changeTags
  } = props;
  const branch = '';
  const { t } = useTranslation();

  return (
    <div>
      <FloatingPanel
        openForm={open}
        branch={branch}
        closeForm={closeForm}
        title={t('conditions.conditions-meta.form_title')}
      >
        <ConditionForm
          label={label}
          description={description}
          group={group}
          labelChange={labelChange}
          descriptionChange={descriptionChange}
          addGroup={addGroup}
          groupsDropDownOptions={groupsDropDownOptions}
          closeForm={closeForm}
          onSave={onSave}
          tagOptions={tagOptions}
          tags={tags}
          changeTags={changeTags}
        />
      </FloatingPanel>
    </div>
  );
}

ConditionMeta.propTypes = {
  open: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  group: PropTypes.string.isRequired,
  labelChange: PropTypes.func.isRequired,
  descriptionChange: PropTypes.func.isRequired,
  addGroup: PropTypes.func.isRequired,
  groupsDropDownOptions: PropTypes.array.isRequired,
  closeForm: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  tagOptions: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  changeTags: PropTypes.func.isRequired,
};

export default withStyles(styles)(ConditionMeta);
