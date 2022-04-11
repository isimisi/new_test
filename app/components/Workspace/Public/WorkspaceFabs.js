/* eslint-disable react/require-default-props */
/* eslint-disable camelcase */
import React from 'react';
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import AddIcon from '@material-ui/icons/Add';
import AssessmentIcon from '@material-ui/icons/Assessment';
import SaveIcon from '@material-ui/icons/Save';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import PropTypes from 'prop-types';
import FlagIcon from '@material-ui/icons/Flag';
import ShareIcon from '@material-ui/icons/Share';
import BusinessIcon from '@material-ui/icons/Business';
import NotesIcon from '@material-ui/icons/Notes';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import colorfull from '@api/palette/colorfull';

const WorkspaceFab = (props) => {
  const {
    nodeClick, metaClick, saveClick, onAlertClick, onAnalysisClick,
    onCvrClick, stickyClick, plan_id, onShareClick, signWorkspaceClick, noAdd
  } = props;


  return (
    <>
      <Fab
        onClick={stickyClick}
        icon={<NotesIcon />}
        event="click"
        style={{ bottom: 0, right: 24 }}
        mainButtonStyles={{ backgroundColor: colorfull[3], right: noAdd ? 80 : 160 }}
      />
      <Fab
        onClick={nodeClick}
        icon={<CheckBoxOutlineBlankIcon />}
        event="click"
        style={{ bottom: 0, right: 24 }}
        mainButtonStyles={{ backgroundColor: colorfull[1], right: noAdd ? 0 : 80 }}
      />
      {!noAdd && (
        <Fab
          icon={<AddIcon />}
          style={{ bottom: 0, right: 24 }}
          mainButtonStyles={{ backgroundColor: colorfull[0] }}
        >
          <Action
            text="Gem"
            style={{ backgroundColor: 'white' }}
            onClick={saveClick}
            className="testeren"
          >
            <SaveIcon />
          </Action>
          {metaClick && (
            <Action
              text="Metadata"
              style={{ backgroundColor: 'white' }}
              onClick={metaClick}
            >
              <TextFieldsIcon />
            </Action>
          )}
          {onAnalysisClick && (
            <Action
              text="Analyser"
              style={{ backgroundColor: 'white' }}
              onClick={onAnalysisClick}
              disabled={plan_id !== 4}
            >
              <AssessmentIcon />
            </Action>
          )}
          {onAlertClick && (
            <Action
              text="Red flags"
              style={{ backgroundColor: 'white' }}
              onClick={onAlertClick}
              disabled={plan_id === 1}
            >
              <FlagIcon />
            </Action>
          )}
          {onShareClick && (
            <Action
              text="Del dit workspace"
              style={{ backgroundColor: 'white' }}
              onClick={onShareClick}
              disabled={plan_id === 1}
            >
              <ShareIcon />
            </Action>
          )}
          <Action
            text="Hent fra CVR"
            style={{ backgroundColor: 'white' }}
            onClick={onCvrClick}
          >
            <BusinessIcon />
          </Action>
          {signWorkspaceClick && (
            <Action
              text="Underskriv dette arbejdsområde"
              style={{ backgroundColor: 'white' }}
              onClick={signWorkspaceClick}
            >
              <BorderColorIcon />
            </Action>
          )}

        </Fab>
      )}
    </>
  );
};

WorkspaceFab.propTypes = {
  nodeClick: PropTypes.func.isRequired,
  metaClick: PropTypes.func,
  saveClick: PropTypes.func.isRequired,
  onAlertClick: PropTypes.func,
  onAnalysisClick: PropTypes.func,
  onCvrClick: PropTypes.func.isRequired,
  stickyClick: PropTypes.func.isRequired,
  onShareClick: PropTypes.func,
  plan_id: PropTypes.number,
  signWorkspaceClick: PropTypes.func,
  noAdd: PropTypes.bool
};

export default WorkspaceFab;
