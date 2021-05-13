import React from 'react';
import { Fab as TinyFab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import { useTheme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import AssessmentIcon from '@material-ui/icons/Assessment';
import SaveIcon from '@material-ui/icons/Save';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import CropLandscapeIcon from '@material-ui/icons/CropLandscape';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';

const WorkspaceFab = () => {
  const theme = useTheme();

  return (
    <>
      <TinyFab
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
      </TinyFab>
      <Tooltip title="Save">
        <Fab
          color="primary"
          style={{
            position: 'fixed',
            bottom: 49,
            right: 120,
            zIndex: 100,
          }}
        >
          <CropLandscapeIcon />
        </Fab>
      </Tooltip>
    </>
  );
};

export default WorkspaceFab;
