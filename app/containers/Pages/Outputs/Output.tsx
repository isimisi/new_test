/* eslint-disable no-case-declarations */
/* eslint-disable default-case */
import React, { useEffect, useState } from 'react';
import {
  useHistory
} from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Notification from '@components/Notification/Notification';
import {
  convertToRaw,
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import OutputNamingForm from '@components/Forms/OutputNamingForm';
import OutputForm from '@components/Forms/OutputForm';
import ChooseConditions from '@components/Condition/ChooseConditions';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
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
  changeCondition,
  changeTags
} from './reducers/outputActions';
import { postCondition } from '../Conditions/reducers/conditionActions';
import { useTranslation } from 'react-i18next';
import { useAuth0, User } from "@auth0/auth0-react";
import { encryptId } from '@api/constants';

const Output = () => {
  const [openAlert, setOpenAlert] = useState(false);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const id = history.location.pathname.split('/').pop() as string;
  const locationState = history.location.state as { fromCondition: boolean };
  const { t } = useTranslation();
  const user = useAuth0().user as User;

  const conditions = useAppSelector(state => state[reducer].get('outputConditions')).toJS();
  const messageNotif = useAppSelector(state => state[reducer].get('message'));
  const title = useAppSelector(state => state[reducer].get('title'));
  const description = useAppSelector(state => state[reducer].get('description'));
  const fileType = useAppSelector(state => state[reducer].get('fileType'));
  const group = useAppSelector(state => state[reducer].get('group'));
  const outputFileUrl = useAppSelector(state => state[reducer].get('outputFileUrl'));
  const outputFile = useAppSelector(state => state[reducer].get('outputFile'));
  const conditionsDropDownOptions = useAppSelector(state => state[reducer].get('conditionsDropDownOptions')).toJS();
  const groupsDropDownOptions = useAppSelector(state => state[reducer].get('groupsDropDownOptions')).toJS();
  const editorState = useAppSelector(state => state[reducer].get('editorState'));
  const tagOptions = useAppSelector(state => state.tags.get('tags')).toJS();
  const tags = useAppSelector(state => state[reducer].get('outputTags')).toJS();


  const [deletedConditions, setDeletedConditions] = useState<any[]>([]);

  useEffect(() => {
    if (!locationState?.fromCondition) {
      dispatch(showOutput(user, id));
    }

    dispatch(getConditionsDropDown(user));
    dispatch(getGroupDropDown(user));
  }, []);

  const handleClose = () => {
    setOpenAlert(false);
  };

  const onSave = (from: string) => {
    switch (from) {
      case 'fab':
        if (outputFileUrl?.length > 0 && editorState.getCurrentContent().hasText()) {
          setOpenAlert(true);
        } else if (editorState.getCurrentContent().hasText()) {
          onSave('draft');
        } else if (outputFileUrl?.length > 0) {
          onSave('upload');
        } else {
          dispatch(showNotifAction('You must provide some content to your output'));
        }
        break;
      case 'draft':
        setOpenAlert(false);
        const rawContentState = convertToRaw(editorState.getCurrentContent());

        const markup = draftToHtml(rawContentState);

        dispatch(putOutput(user, id, title, description, markup, fileType, from, group, JSON.stringify(conditions), JSON.stringify(deletedConditions), JSON.stringify(tags), history));
        break;
      case 'upload':
        setOpenAlert(false);

        if (typeof outputFile === 'object') {
          dispatch(putOutput(user, id, title, description, outputFile, fileType, from, group, JSON.stringify(conditions), JSON.stringify(deletedConditions), JSON.stringify(tags), history));
        } else {
          dispatch(putOutput(user, id, title, description, outputFileUrl, fileType, from, group, JSON.stringify(conditions), JSON.stringify(deletedConditions), JSON.stringify(tags), history));
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
      window.open('/app/conditions/' + encryptId(condition.condition_id), '_blank');
    } else {
      dispatch(postCondition(user, history, true));
    }
  };

  return (
    <div>
      <Notification close={() => dispatch(closeNotifAction)} message={messageNotif} />
      <OutputNamingForm
        title={title}
        onTitleChange={(_title) => dispatch(titleChange(_title))}
        description={description}
        onDescriptionChange={(d) => dispatch(descriptionChange(d))}
        group={group}
        onGroupChange={(g) => dispatch(addGroup(g))}
        groupsDropDownOptions={groupsDropDownOptions}
        tags={tags}
        changeTags={_tags => dispatch(changeTags(_tags))}
        tagOptions={tagOptions}
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
          {`${t('output.btn_save_output')}`}
        </Fab>
      </div>
      <Dialog
        open={openAlert}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t('output.upload_or_write_header')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t('output.both_upload_and_editor')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onSave('draft')} variant="contained" color="primary">
            {t('output.editor_content')}
          </Button>
          <Button onClick={() => onSave('upload')} variant="contained" color="secondary" autoFocus>
            {t('output.uploaded_content')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Output;
