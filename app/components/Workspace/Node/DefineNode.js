import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import WorkspaceNodeForm from './WorkspaceNodeForm';
import FloatingPanel from '../../Panel/FloatingPanel';
import styles from '../workspace-jss';

function DefineEdge(props) {
  const {
    open,
    close,
    nodes,
    nodeLabel,
    handleChangeLabel,
    attribues,
    handleChangeAttributes,
    nodeSize,
    handleChangeSize,
    nodeColor,
    handleChangeColor,
    nodeBorderColor,
    handleBorderColorChange
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
          attribues={attribues}
          handleChangeAttributes={handleChangeAttributes}
          nodeSize={nodeSize}
          handleChangeSize={handleChangeSize}
          nodeColor={nodeColor}
          handleChangeColor={handleChangeColor}
          nodeBorderColor={nodeBorderColor}
          handleBorderColorChange={handleBorderColorChange}
        />
      </FloatingPanel>
    </div>
  );
}

DefineEdge.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  nodes: PropTypes.array.isRequired,
  nodeLabel: PropTypes.string.isRequired,
  handleChangeLabel: PropTypes.func.isRequired,
  attribues: PropTypes.array.isRequired,
  handleChangeAttributes: PropTypes.func.isRequired,
  nodeSize: PropTypes.string.isRequired,
  handleChangeSize: PropTypes.func.isRequired,
  nodeColor: PropTypes.object.isRequired,
  handleChangeColor: PropTypes.func.isRequired,
  nodeBorderColor: PropTypes.object.isRequired,
  handleBorderColorChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(DefineEdge);
