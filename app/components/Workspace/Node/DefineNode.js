import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Loader from '@api/ui/Loader';
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
    nodeColor,
    handleChangeColor,
    nodeBorderColor,
    handleBorderColorChange,
    handleNodeSave,
    nodeDisplayName,
    handleDisplayNameChange,
    isUpdatingElement,
    handleDeleteNode,
    loading,
    attributesDropDownOptions,
    handleRemoveAttributes,
    nodeFigur,
    handleNodeFigurChange
  } = props;

  return (
    <div>
      <FloatingPanel
        openForm={open}
        closeForm={close}
        title={isUpdatingElement ? 'Ændre dit element' : 'Definer dit element'}
      >
        {loading ? <Loader />
          : (
            <WorkspaceNodeForm
              nodes={nodes}
              close={close}
              nodeLabel={nodeLabel}
              handleChangeLabel={handleChangeLabel}
              attributes={attributes}
              handleChangeAttributes={handleChangeAttributes}
              nodeColor={nodeColor}
              handleChangeColor={handleChangeColor}
              nodeBorderColor={nodeBorderColor}
              handleBorderColorChange={handleBorderColorChange}
              handleNodeSave={handleNodeSave}
              nodeDisplayName={nodeDisplayName}
              isUpdatingElement={isUpdatingElement}
              handleDisplayNameChange={handleDisplayNameChange}
              handleDeleteNode={handleDeleteNode}
              attributesDropDownOptions={attributesDropDownOptions}
              handleRemoveAttributes={handleRemoveAttributes}
              nodeFigur={nodeFigur}
              handleNodeFigurChange={handleNodeFigurChange}
            />
          )}

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
  nodeColor: PropTypes.object.isRequired,
  handleChangeColor: PropTypes.func.isRequired,
  nodeBorderColor: PropTypes.object.isRequired,
  handleBorderColorChange: PropTypes.func.isRequired,
  handleNodeSave: PropTypes.func.isRequired,
  nodeDisplayName: PropTypes.string.isRequired,
  handleDisplayNameChange: PropTypes.func.isRequired,
  isUpdatingElement: PropTypes.bool.isRequired,
  handleDeleteNode: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  attributesDropDownOptions: PropTypes.array.isRequired,
  handleRemoveAttributes: PropTypes.func.isRequired,
  nodeFigur: PropTypes.string.isRequired,
  handleNodeFigurChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(DefineNode);
