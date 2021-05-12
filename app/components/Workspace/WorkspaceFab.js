import React from 'react';
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import { useTheme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import AssessmentIcon from '@material-ui/icons/Assessment';
import SaveIcon from '@material-ui/icons/Save';
import TextFieldsIcon from '@material-ui/icons/TextFields';

const WorkspaceFab = () => {
  const theme = useTheme();

  return (
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
  );
};

export default WorkspaceFab;
