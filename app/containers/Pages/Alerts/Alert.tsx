import React, { useEffect, useState } from 'react';

import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import {
  useHistory
} from 'react-router-dom';
import { encryptId, getId } from '@api/constants';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import Notification from '@components/Notification/Notification';
import AlertNamingForm from '@components/Forms/AlertNamingForm';
import ChooseConditions from '@components/Condition/ChooseConditions';
import {
  closeNotifAction, showAlert, putAlert, getConditionsDropDown, getGroupDropDown,
  addCondition,
  changeCondition,
  deleteCondition,
  changeTags
} from './reducers/alertActions';
import { postCondition } from '../Conditions/reducers/conditionActions';
import { reducer } from './constants';
import { useAuth0, User } from "@auth0/auth0-react";

const Alert = () => {
  const dispatch = useAppDispatch();
  const messageNotif = useAppSelector(state => state[reducer].get('message'));
  const history = useHistory();
  const id = getId(history) as string;
  const user = useAuth0().user as User;
  const title = useAppSelector(state => state[reducer].get('title'));
  const description = useAppSelector(state => state[reducer].get('description'));
  const group = useAppSelector(state => state[reducer].get('group'));
  const groupsDropDownOptions = useAppSelector(state => state[reducer].get('groupsDropDownOptions')).toJS();
  const conditions = useAppSelector(state => state[reducer].get('alertConditions')).toJS();
  const conditionsDropDownOptions = useAppSelector(state => state[reducer].get('conditionsDropDownOptions')).toJS();
  const tagOptions = useAppSelector(state => state.tags.get('tags')).toJS();
  const tags = useAppSelector(state => state[reducer].get('alertTags')).toJS();
  const { t } = useTranslation();

  const [deletedConditions, setDeletedConditions] = useState<number[]>([]);


  const onSave = () => {
    dispatch(putAlert(user, history, id, title, description, group, JSON.stringify(conditions), JSON.stringify(deletedConditions), JSON.stringify(tags)));
  };

  useEffect(() => {
    // @ts-ignore
    if (!history?.location?.state?.fromCondition) {
      dispatch(showAlert(user, id));
    }

    dispatch(getConditionsDropDown(user));
    dispatch(getGroupDropDown(user));
  }, [user]);

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
      <Grid container spacing={1}>
        <Grid item md={12}>
          <AlertNamingForm
            title={title}
            description={description}
            group={group}
            groupsDropDownOptions={groupsDropDownOptions}
            tags={tags}
            changeTags={_tags => dispatch(changeTags(_tags))}
            tagOptions={tagOptions}
          />
        </Grid>
        <Grid item md={12}>
          <ChooseConditions
            conditions={conditions}
            conditionsDropDownOptions={conditionsDropDownOptions}
            deleteCondition={handleDelteCondition}
            addCondition={handleAddCondition}
            handleChangeCondition={handleChangeCondition}
            createOrSeeCondition={handleCreateOrSeeCondition}
          />
        </Grid>
      </Grid>
      <Fab
        variant="extended"
        color="primary"
        style={{
          position: 'fixed',
          bottom: 30,
          right: 50,
          zIndex: 100,
        }}
        onClick={onSave}
      >
        {`${t('alert-naming-form.btn_save_red_flag')}`}
      </Fab>

    </div>
  );
};

export default Alert;
