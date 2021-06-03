import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import EdgeForm from './EdgeForm';
import FloatingPanel from '../../Panel/FloatingPanel';
import styles from '../condition-jss';

function DefineEdge(props) {
  const {
    open,
    close,
    relationshipLabel,
    handleChangeLabel,
    type,
    handleTypeChange,
    handleSave,
    relationships,
    comparisonsOptions,
    comparisonType,
    handleComparisonTypeChange,
    comparisonValue,
    handleComparisonValueChange,
    isUpdatingElement,
    handleDeleteEdge
  } = props;

  return (
    <div>
      <FloatingPanel
        openForm={open}
        closeForm={close}
        extraSize
        title={isUpdatingElement ? 'Ændre i din relation' : 'Specificer en relation for dit scenarie'}
      >
        <EdgeForm
          relationships={relationships}
          relationshipLabel={relationshipLabel}
          handleChangeLabel={handleChangeLabel}
          type={type}
          handleTypeChange={handleTypeChange}
          comparisonsOptions={comparisonsOptions}
          comparisonType={comparisonType}
          handleComparisonTypeChange={handleComparisonTypeChange}
          comparisonValue={comparisonValue}
          handleComparisonValueChange={handleComparisonValueChange}
          close={close}
          handleSave={handleSave}
          handleDeleteEdge={handleDeleteEdge}
          isUpdatingElement={isUpdatingElement}
        />
      </FloatingPanel>
    </div>
  );
}

DefineEdge.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  relationshipLabel: PropTypes.string.isRequired,
  handleChangeLabel: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  handleTypeChange: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  relationships: PropTypes.array.isRequired,
  comparisonsOptions: PropTypes.array.isRequired,
  comparisonType: PropTypes.string.isRequired,
  handleComparisonTypeChange: PropTypes.func.isRequired,
  comparisonValue: PropTypes.any.isRequired,
  handleComparisonValueChange: PropTypes.func.isRequired,
  isUpdatingElement: PropTypes.bool.isRequired,
  handleDeleteEdge: PropTypes.func.isRequired
};

export default withStyles(styles)(DefineEdge);
