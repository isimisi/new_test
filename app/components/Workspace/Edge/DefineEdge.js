import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import EdgeForm from './EdgeForm';
import FloatingPanel from '../../Panel/FloatingPanel';
import styles from '../workspace-jss';

function EdgePopUp(props) {
  const {
    open,
    close,
    relationshipLabel,
    handleChangeLabel,
    description,
    handleDescriptionChange,
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
          description={description}
          handleDescriptionChange={handleDescriptionChange}
          color={color || {
            r: 0, g: 0, b: 0, a: 0
          }}
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

EdgePopUp.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  relationshipLabel: PropTypes.string.isRequired,
  handleChangeLabel: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  handleDescriptionChange: PropTypes.func.isRequired,
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

export default withStyles(styles)(EdgePopUp);
