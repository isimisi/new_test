import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import NodeForm from './NodeForm';
import FloatingPanel from '../../Panel/FloatingPanel';
import styles from '../condition-jss';

function DefineNode(props) {
  const {
    open,
    close,
    nodes,
    nodeLabel,
    handleChangeLabel,
    handleNodeSave,
    handleNodeChange,
    conditionValues,
    nodeAttributes,
    comparisonsOptions,
    addConditionValue,
    deleteConditionValue,
    isUpdatingElement,
    handleDeleteNode
  } = props;

  return (
    <div>
      <FloatingPanel
        openForm={open}
        closeForm={close}
        extraSize
        title={isUpdatingElement ? 'Ændre dit element' : 'Definer dit element for et scenarie'}
      >
        <NodeForm
          nodes={nodes}
          nodeLabel={nodeLabel}
          handleChangeLabel={handleChangeLabel}
          handleNodeSave={handleNodeSave}
          handleNodeChange={handleNodeChange}
          conditionValues={conditionValues}
          nodeAttributes={nodeAttributes}
          comparisonsOptions={comparisonsOptions}
          addConditionValue={addConditionValue}
          deleteConditionValue={deleteConditionValue}
          isUpdatingElement={isUpdatingElement}
          handleDeleteNode={handleDeleteNode}
          close={close}
        />
      </FloatingPanel>
    </div>
  );
}

DefineNode.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  nodes: PropTypes.array.isRequired,
  nodeLabel: PropTypes.string.isRequired,
  handleChangeLabel: PropTypes.func.isRequired,
  handleNodeSave: PropTypes.func.isRequired,
  handleNodeChange: PropTypes.func.isRequired,
  conditionValues: PropTypes.array.isRequired,
  nodeAttributes: PropTypes.array.isRequired,
  comparisonsOptions: PropTypes.array.isRequired,
  addConditionValue: PropTypes.func.isRequired,
  deleteConditionValue: PropTypes.func.isRequired,
  isUpdatingElement: PropTypes.bool.isRequired,
  handleDeleteNode: PropTypes.func.isRequired,
};

export default withStyles(styles)(DefineNode);
