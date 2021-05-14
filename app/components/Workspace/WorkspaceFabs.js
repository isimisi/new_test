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

const WorkspaceFab = (props) => {
  const { nodeClick } = props;
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
          style={{ backgroundColor: theme.palette.primary.light }}
        >
          <SaveIcon />
        </Action>
        <Action
          text="Metadata"
          style={{ backgroundColor: theme.palette.secondary.light }}
        >
          <TextFieldsIcon />
        </Action>
        <Action
          text="Analyser"
          style={{ backgroundColor: theme.palette.secondary.main }}
        >
          <AssessmentIcon />
        </Action>
      </Fab>
    </>
  );
};

WorkspaceFab.propTypes = {
  nodeClick: PropTypes.func.isRequired,
};

export default WorkspaceFab;
