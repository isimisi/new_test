import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import EdgeForm from './EdgeForm';
import FloatingPanel from '../../Panel/FloatingPanel';
import styles from '../workspace-jss';

function DefineEdge(props) {
  const {
    open,
    close,
    relationshipLabel,
    handleChangeLabel,
    relationshipValue,
    handleChangeValue,
    description,
    handleDescriptionChange,
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
    handleSave
  } = props;

  return (
    <div>
      <FloatingPanel
        openForm={open}
        closeForm={close}
        title="Ændre din Relation"
      >
        <EdgeForm
          relationshipLabel={relationshipLabel}
          handleChangeLabel={handleChangeLabel}
          relationshipValue={relationshipValue}
          handleChangeValue={handleChangeValue}
          description={description}
          handleDescriptionChange={handleDescriptionChange}
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
  relationshipValue: PropTypes.string.isRequired,
  handleChangeValue: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  handleDescriptionChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  handleTypeChange: PropTypes.func.isRequired,
  color: PropTypes.object.isRequired,
  handleColorChange: PropTypes.func.isRequired,
  showArrow: PropTypes.bool.isRequired,
  handleShowArrowChange: PropTypes.func.isRequired,
  animatedLine: PropTypes.bool.isRequired,
  handleAnimatedLineChange: PropTypes.func.isRequired,
  showLabel: PropTypes.bool.isRequired,
  handleShowLabelChange: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired
};

export default withStyles(styles)(DefineEdge);
