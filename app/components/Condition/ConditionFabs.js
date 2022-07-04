import React from 'react';
import { Fab } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import SaveIcon from '@mui/icons-material/Save';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import PropTypes from 'prop-types';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import colorfull from '@api/palette/colorfull';

const ConditionFabs = (props) => {
  const {
    nodeClick, saveClick, metaClick, fromContent
  } = props;

  return (
    <>
      <Fab
        onClick={metaClick}
        icon={<TextFieldsIcon />}
        event="click"
        mainButtonStyles={{ backgroundColor: colorfull[3], right: 160 }}
      />
      <Fab
        onClick={nodeClick}
        icon={<CheckBoxOutlineBlankIcon />}
        event="click"
        mainButtonStyles={{ backgroundColor: colorfull[1], right: 80 }}
      />
      <Fab
        onClick={saveClick}
        icon={fromContent ? <ArrowForwardIcon /> : <SaveIcon />}
        event="click"
        mainButtonStyles={{ backgroundColor: colorfull[0] }}
      />
    </>
  );
};

ConditionFabs.propTypes = {
  nodeClick: PropTypes.func.isRequired,
  saveClick: PropTypes.func.isRequired,
  metaClick: PropTypes.func.isRequired,
  fromContent: PropTypes.bool.isRequired,
};

export default ConditionFabs;
