/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Loader from '@api/ui/Loader';
import EdgeForm from './EdgeForm';
import FloatingPanel from '../../Panel/FloatingPanel';
import styles from '../workspace-jss';

const DefineEdge = (props) => {
  const {
    open,
    close,
    relationshipLabel,
    handleChangeLabel,
    relationshipValue,
    handleChangeValue,
    type,
    handleTypeChange,
    color,
    handleColorChange,
    showArrow,
    handleShowArrowChange,
    animatedLine,
    handleAnimatedLineChange,
    showLabel,
    handleShowLabelChange,
    handleSave,
    relationships,
    isUpdatingElement,
    handleDeleteEdge,
    loading
  } = props;

  return (
    <div>
      <FloatingPanel
        openForm={open}
        closeForm={close}
        title={isUpdatingElement ? 'Ændre din Relation' : 'Lav din relation'}
      >
        {loading ? <Loader /> : (
          <EdgeForm
            relationships={relationships}
            relationshipLabel={relationshipLabel}
            handleChangeLabel={handleChangeLabel}
            relationshipValue={relationshipValue}
            handleChangeValue={handleChangeValue}
            type={type}
            handleTypeChange={handleTypeChange}
            color={color}
            handleColorChange={handleColorChange}
            showArrow={showArrow}
            handleShowArrowChange={handleShowArrowChange}
            animatedLine={animatedLine}
            handleAnimatedLineChange={handleAnimatedLineChange}
            showLabel={showLabel}
            handleShowLabelChange={handleShowLabelChange}
            close={close}
            handleSave={handleSave}
            isUpdatingElement={isUpdatingElement}
            handleDeleteEdge={handleDeleteEdge}
          />
        )}
      </FloatingPanel>
    </div>
  );
};

DefineEdge.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  relationshipLabel: PropTypes.string.isRequired,
  handleChangeLabel: PropTypes.func.isRequired,
  relationshipValue: PropTypes.string.isRequired,
  handleChangeValue: PropTypes.func.isRequired,
  type: PropTypes.string,
  handleTypeChange: PropTypes.func.isRequired,
  color: PropTypes.object.isRequired,
  handleColorChange: PropTypes.func.isRequired,
  showArrow: PropTypes.bool.isRequired,
  handleShowArrowChange: PropTypes.func.isRequired,
  animatedLine: PropTypes.bool.isRequired,
  handleAnimatedLineChange: PropTypes.func.isRequired,
  showLabel: PropTypes.bool.isRequired,
  handleShowLabelChange: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  relationships: PropTypes.array.isRequired,
  isUpdatingElement: PropTypes.bool.isRequired,
  handleDeleteEdge: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default withStyles(styles)(DefineEdge);
