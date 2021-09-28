import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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
    handleShareOrg
  } = props;
  const branch = '';
  return (
    <div>
      <FloatingPanel
        openForm={open}
        branch={branch}
        closeForm={closeForm}
        title="Navngiv dit arbejdsområde"
      >
        <WorkspaceForm
          label={label}
          description={description}
          group={group}
          labelChange={labelChange}
          descriptionChange={descriptionChange}
          addGroup={addGroup}
          groupsDropDownOptions={groupsDropDownOptions}
          closeForm={closeForm}
          onSave={onSave}
          shareOrg={shareOrg}
          handleShareOrg={handleShareOrg}
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
};

WorkspaceMeta.defaultProps = {
  label: '',
  description: ''
};

export default withStyles(styles)(WorkspaceMeta);
