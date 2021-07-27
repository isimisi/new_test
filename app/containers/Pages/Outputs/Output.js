/* eslint-disable no-case-declarations */
/* eslint-disable default-case */
import React, { useEffect, useState } from 'react';
import {
  OutputNamingForm,
  OutputForm, Notification,
  ChooseConditions
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
import {
  convertToRaw,
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { reducer } from './constants';
import {
  showOutput,
  putOutput,
  getConditionsDropDown,
  getGroupDropDown,
  closeNotifAction,
  showNotifAction,
  titleChange,
  descriptionChange,
  addGroup,
  addOutput,
  fileTypeChange,
  editorStateChange,
  addOutputUrl,
  addCondition,
  deleteCondition,
  changeCondition
} from './reducers/outputActions';
import { postCondition } from '../Conditions/reducers/conditionActions';


const Output = () => {
  const [openAlert, setOpenAlert] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const id = history.location.pathname.split('/').pop();

  const conditions = useSelector(state => state.getIn([reducer, 'outputConditions'])).toJS();
  const messageNotif = useSelector(state => state.getIn([reducer, 'message']));
  const title = useSelector(state => state.getIn([reducer, 'title']));
  const description = useSelector(state => state.getIn([reducer, 'description']));
  const fileType = useSelector(state => state.getIn([reducer, 'fileType']));
  const group = useSelector(state => state.getIn([reducer, 'group']));
  const outputFileUrl = useSelector(state => state.getIn([reducer, 'outputFileUrl']));
  const outputFile = useSelector(state => state.getIn([reducer, 'outputFile']));
  const conditionsDropDownOptions = useSelector(state => state.getIn([reducer, 'conditionsDropDownOptions'])).toJS();
  const groupsDropDownOptions = useSelector(state => state.getIn([reducer, 'groupsDropDownOptions'])).toJS();
  const editorState = useSelector(state => state.getIn([reducer, 'editorState']));

  const [deletedConditions, setDeletedConditions] = useState([]);

  useEffect(() => {
    if (!history?.location?.state?.fromCondition) {
      dispatch(showOutput(id));
    }

    dispatch(getConditionsDropDown());
    dispatch(getGroupDropDown());
  }, []);

  const handleClose = () => {
    setOpenAlert(false);
  };

  const onSave = (from) => {
    switch (from) {
      case 'fab':
        if (outputFileUrl?.length > 0 && editorState.getCurrentContent().hasText()) {
          setOpenAlert(true);
        } else if (editorState.getCurrentContent().hasText()) {
          onSave('draft');
        } else if (outputFileUrl?.length > 0) {
          onSave('uploaded');
        } else {
          dispatch(showNotifAction('You must provide some content to your output'));
        }
        break;
      case 'draft':
        setOpenAlert(false);
        const rawContentState = convertToRaw(editorState.getCurrentContent());

        const markup = draftToHtml(rawContentState);

        dispatch(putOutput(id, title, description, markup, fileType, from, group, JSON.stringify(conditions), JSON.stringify(deletedConditions), history));
        break;
      case 'uploaded':
        setOpenAlert(false);
        if (outputFile instanceof Immutable.Map) {
          dispatch(putOutput(id, title, description, outputFile, fileType, from, group, conditions, deletedConditions, history));
        } else {
          dispatch(putOutput(id, title, description, outputFileUrl, fileType, from, group, conditions, deletedConditions, history));
        }
        break;
    }
  };

  const handleDelteCondition = (cond, index) => {
    dispatch(deleteCondition(index));
    if (cond.id) {
      setDeletedConditions([...deletedConditions, cond.id]);
    }
  };
  const handleAddCondition = () => {
    dispatch(addCondition({ label: null, condition_id: null }));
  };

  const handleChangeCondition = (cond, index) => {
    dispatch(changeCondition(cond, index));
  };

  const handleCreateOrSeeCondition = (condition, see) => {
    if (see) {
      window.open('/app/conditions/' + condition.condition_id, '_blank');
    } else {
      dispatch(postCondition(history, true));
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
      <ChooseConditions
        conditions={conditions}
        conditionsDropDownOptions={conditionsDropDownOptions}
        deleteCondition={handleDelteCondition}
        addCondition={handleAddCondition}
        handleChangeCondition={handleChangeCondition}
        createOrSeeCondition={handleCreateOrSeeCondition}
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
        editorState={editorState}
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
          <Button onClick={() => onSave('draft')} variant="contained" color="primary">
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
