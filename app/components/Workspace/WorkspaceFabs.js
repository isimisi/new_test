import React from 'react';
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import { useTheme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import AssessmentIcon from '@material-ui/icons/Assessment';
import SaveIcon from '@material-ui/icons/Save';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import PropTypes from 'prop-types';
import FlagIcon from '@material-ui/icons/Flag';
import BusinessIcon from '@material-ui/icons/Business';

const WorkspaceFab = (props) => {
  const {
    nodeClick, metaClick, saveClick, onAlertClick, onAnalysisClick, onCvrClick
  } = props;
  const theme = useTheme();

  return (
    <>
      <Fab
        onClick={nodeClick}
        icon={<CheckBoxOutlineBlankIcon />}
        event="click"
        mainButtonStyles={{ backgroundColor: theme.palette.primary.light, right: 80 }}
      />
      <Fab
        icon={<AddIcon />}
        mainButtonStyles={{ backgroundColor: theme.palette.secondary.main }}
      >
        <Action
          text="Gem"
          style={{ backgroundColor: 'white' }}
          onClick={saveClick}
        >
          <SaveIcon style={{ color: theme.palette.primary.main }} />
        </Action>
        <Action
          text="Metadata"
          style={{ backgroundColor: 'white' }}
          onClick={metaClick}
        >
          <TextFieldsIcon style={{ color: theme.palette.primary.main }} />
        </Action>
        <Action
          text="Analyser"
          style={{ backgroundColor: 'white' }}
          onClick={onAnalysisClick}
        >
          <AssessmentIcon style={{ color: theme.palette.primary.main }} />
        </Action>
        <Action
          text="Red flags"
          style={{ backgroundColor: 'white' }}
          onClick={onAlertClick}
        >
          <FlagIcon style={{ color: theme.palette.primary.main }} />
        </Action>
        <Action
          text="Hent fra CVR"
          style={{ backgroundColor: 'white' }}
          onClick={onCvrClick}
        >
          <BusinessIcon style={{ color: theme.palette.primary.main }} />
        </Action>
      </Fab>
    </>
  );
};

WorkspaceFab.propTypes = {
  nodeClick: PropTypes.func.isRequired,
  metaClick: PropTypes.func.isRequired,
  saveClick: PropTypes.func.isRequired,
  onAlertClick: PropTypes.func.isRequired,
  onAnalysisClick: PropTypes.func.isRequired,
  onCvrClick: PropTypes.func.isRequired,
};

export default WorkspaceFab;
