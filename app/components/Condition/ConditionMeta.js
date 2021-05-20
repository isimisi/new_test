import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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
    onSave
  } = props;
  const branch = '';
  return (
    <div>
      <FloatingPanel
        openForm={open}
        branch={branch}
        closeForm={closeForm}
        title="Dit Scenarie"
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
};

export default withStyles(styles)(ConditionMeta);
