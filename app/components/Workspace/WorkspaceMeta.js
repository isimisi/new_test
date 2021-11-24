import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import WorkspaceForm from './WorkspaceForm';
import FloatingPanel from '../Panel/FloatingPanel';
import styles from './workspace-jss';

function WorkspaceMeta(props) {
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
    shareOrg,
    handleShareOrg,
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
        title={t('workspace-meta.name_your_work_area')}
      >
        <WorkspaceForm
          label={label}
          description={description}
          group={group}
          tagOptions={tagOptions}
          labelChange={labelChange}
          descriptionChange={descriptionChange}
          addGroup={addGroup}
          groupsDropDownOptions={groupsDropDownOptions}
          closeForm={closeForm}
          onSave={onSave}
          shareOrg={shareOrg}
          handleShareOrg={handleShareOrg}
          tags={tags}
          changeTags={changeTags}
        />

      </FloatingPanel>
    </div>
  );
}

WorkspaceMeta.propTypes = {
  open: PropTypes.bool.isRequired,
  label: PropTypes.string,
  description: PropTypes.string,
  group: PropTypes.string.isRequired,
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

WorkspaceMeta.defaultProps = {
  label: '',
  description: ''
};

export default withStyles(styles)(WorkspaceMeta);
