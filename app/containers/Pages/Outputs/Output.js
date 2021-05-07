/* eslint-disable default-case */
import React, { useEffect, useState } from 'react';
import {
  OutputNamingForm, OutputForm, Notification
} from '@components';
import { useSelector, useDispatch, } from 'react-redux';
import {
  useHistory
} from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Immutable from 'immutable';
import { reducer, fromDraftToDocx } from './constants';
import {
  showOutput,
  putOutput,
  getConditionsDropDown,
  getGroupDropDown,
  closeNotifAction,
  showNotifAction,
  addCondition,
  titleChange,
  descriptionChange,
  addGroup,
  addOutput,
  fileTypeChange,
  editorStateChange,
  addOutputUrl
} from './reducers/outputActions';


const Output = () => {
  const [openAlert, setOpenAlert] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const id = history.location.pathname.split('/').pop();

  const messageNotif = useSelector(state => state.getIn([reducer, 'message']));
  const title = useSelector(state => state.getIn([reducer, 'title']));
  const description = useSelector(state => state.getIn([reducer, 'description']));
  const fileType = useSelector(state => state.getIn([reducer, 'fileType']));
  const group = useSelector(state => state.getIn([reducer, 'group']));
  const condition = useSelector(state => state.getIn([reducer, 'condition']));
  const outputFileUrl = useSelector(state => state.getIn([reducer, 'outputFileUrl']));
  const outputFile = useSelector(state => state.getIn([reducer, 'outputFile']));
  const conditionsDropDownOptions = useSelector(state => state.getIn([reducer, 'conditionsDropDownOptions'])).toJS();
  const groupsDropDownOptions = useSelector(state => state.getIn([reducer, 'groupsDropDownOptions'])).toJS();
  const editorState = useSelector(state => state.getIn([reducer, 'editorState']));

  useEffect(() => {
    dispatch(showOutput(id));
    dispatch(getConditionsDropDown());
    dispatch(getGroupDropDown());
  }, []);

  const handleClose = () => {
    setOpenAlert(false);
  };

  const onSave = (from) => {
    switch (from) {
      case 'fab':
        if (outputFileUrl.length > 0 && editorState.getCurrentContent().hasText()) {
          setOpenAlert(true);
        } else if (editorState.getCurrentContent().hasText()) {
          onSave('editor');
        } else if (outputFileUrl.length > 0) {
          onSave('uploaded');
        } else {
          dispatch(showNotifAction('You must provide some content to your output'));
        }
        break;
      case 'editor':
        setOpenAlert(false);
        dispatch(putOutput(id, title, description, fromDraftToDocx(editorState), fileType, from, condition, group));
        break;
      case 'uploaded':
        setOpenAlert(false);
        if (outputFile instanceof Immutable.Map) {
          dispatch(putOutput(id, title, description, outputFile, fileType, from, condition, group));
        } else {
          dispatch(putOutput(id, title, description, outputFileUrl, fileType, from, condition, group));
        }
        break;
    }
  };

  return (
    <div>
      <Notification close={() => dispatch(closeNotifAction)} message={messageNotif} />
      <OutputNamingForm
        title={title}
        onTitleChange={(t) => dispatch(titleChange(t))}
        description={description}
        onDescriptionChange={(d) => dispatch(descriptionChange(d))}
        group={group}
        onGroupChange={(g) => dispatch(addGroup(g))}
        groupsDropDownOptions={groupsDropDownOptions}
      />
      <OutputForm
        title={title}
        outputFile={outputFileUrl}
        fileType={fileType}
        onFileTypeChange={(f) => dispatch(fileTypeChange(f))}
        onOutputChange={(f, u) => {
          dispatch(addOutput(f));
          dispatch(addOutputUrl(u));
        }}
        condition={condition}
        editorState={editorState}
        onConditionChange={(value) => dispatch(addCondition(value))}
        conditionsDropDownOptions={conditionsDropDownOptions}
        onEditorStateChange={(v) => dispatch(editorStateChange(v))}
      />
      <div>
        <Tooltip title="Save">
          <Fab
            variant="extended"
            color="primary"
            style={{
              position: 'fixed',
              bottom: 30,
              right: 50,
              zIndex: 100,
            }}
            onClick={() => onSave('fab')}
          >
            Save Output
          </Fab>
        </Tooltip>
      </div>
      <Dialog
        open={openAlert}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        Ooops you need to either upload or write
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            It seems like you have both uploaded a document and created some content in the editor. Which one would you like to save?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onSave('editor')} variant="contained" color="primary">
            Editor Content
          </Button>
          <Button onClick={() => onSave('uploaded')} variant="contained" color="secondary" autoFocus>
            Uploaded Content
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Output;
