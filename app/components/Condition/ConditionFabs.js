import React from 'react';
import { Fab } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import { useTheme } from '@material-ui/core/styles';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import SaveIcon from '@material-ui/icons/Save';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import PropTypes from 'prop-types';

const ConditionFabs = (props) => {
  const { nodeClick, saveClick, metaClick } = props;
  const theme = useTheme();

  return (
    <>
      <Fab
        onClick={metaClick}
        icon={<TextFieldsIcon />}
        event="click"
        mainButtonStyles={{ backgroundColor: theme.palette.secondary.light, right: 160 }}
      />
      <Fab
        onClick={nodeClick}
        icon={<CheckBoxOutlineBlankIcon />}
        event="click"
        mainButtonStyles={{ backgroundColor: theme.palette.secondary.main, right: 80 }}
      />
      <Fab
        onClick={saveClick}
        icon={<SaveIcon />}
        event="click"
        mainButtonStyles={{ backgroundColor: theme.palette.secondary.dark }}
      />
    </>
  );
};

ConditionFabs.propTypes = {
  nodeClick: PropTypes.func.isRequired,
  saveClick: PropTypes.func.isRequired,
  metaClick: PropTypes.func.isRequired,
};

export default ConditionFabs;
