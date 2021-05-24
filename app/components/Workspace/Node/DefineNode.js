import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import WorkspaceNodeForm from './WorkspaceNodeForm';
import FloatingPanel from '../../Panel/FloatingPanel';
import styles from '../workspace-jss';

function DefineNode(props) {
  const {
    open,
    close,
    nodes,
    nodeLabel,
    handleChangeLabel,
    attributes,
    handleChangeAttributes,
    nodeSize,
    handleChangeSize,
    nodeColor,
    handleChangeColor,
    nodeBorderColor,
    handleBorderColorChange,
    handleNodeSave,
    nodeDisplayName,
    handleDisplayNameChange
  } = props;

  return (
    <div>
      <FloatingPanel
        openForm={open}
        closeForm={close}
        title="Ændre dit element"
      >
        <WorkspaceNodeForm
          nodes={nodes}
          nodeLabel={nodeLabel}
          handleChangeLabel={handleChangeLabel}
          attributes={attributes}
          handleChangeAttributes={handleChangeAttributes}
          nodeSize={nodeSize}
          handleChangeSize={handleChangeSize}
          nodeColor={nodeColor}
          handleChangeColor={handleChangeColor}
          nodeBorderColor={nodeBorderColor}
          handleBorderColorChange={handleBorderColorChange}
          handleNodeSave={handleNodeSave}
          nodeDisplayName={nodeDisplayName}
          handleDisplayNameChange={handleDisplayNameChange}
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
  attributes: PropTypes.array.isRequired,
  handleChangeAttributes: PropTypes.func.isRequired,
  nodeSize: PropTypes.string.isRequired,
  handleChangeSize: PropTypes.func.isRequired,
  nodeColor: PropTypes.object.isRequired,
  handleChangeColor: PropTypes.func.isRequired,
  nodeBorderColor: PropTypes.object.isRequired,
  handleBorderColorChange: PropTypes.func.isRequired,
  handleNodeSave: PropTypes.func.isRequired,
  nodeDisplayName: PropTypes.string.isRequired,
  handleDisplayNameChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(DefineNode);
