import React, { useEffect, useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import { Notification, AlertNamingForm, ChooseConditions } from '@components';
import { useSelector, useDispatch, } from 'react-redux';
import {
  useHistory
} from 'react-router-dom';
import {
  closeNotifAction, showAlert, putAlert, getConditionsDropDown, getGroupDropDown,
  addCondition,
  changeCondition,
  deleteCondition
} from './reducers/alertActions';
import { postCondition } from '../Conditions/reducers/conditionActions';
import { reducer } from './constants';

const Alert = () => {
  const dispatch = useDispatch();
  const messageNotif = useSelector(state => state.getIn([reducer, 'message']));
  const history = useHistory();
  const id = history.location.pathname.split('/').pop();
  const title = useSelector(state => state.getIn([reducer, 'title']));
  const description = useSelector(state => state.getIn([reducer, 'description']));
  const group = useSelector(state => state.getIn([reducer, 'group']));
  const groupsDropDownOptions = useSelector(state => state.getIn([reducer, 'groupsDropDownOptions'])).toJS();
  const conditions = useSelector(state => state.getIn([reducer, 'alertConditions'])).toJS();
  const conditionsDropDownOptions = useSelector(state => state.getIn([reducer, 'conditionsDropDownOptions'])).toJS();

  const [deletedConditions, setDeletedConditions] = useState([]);


  const onSave = () => {
    dispatch(putAlert(history, id, title, description, group, JSON.stringify(conditions), JSON.stringify(deletedConditions)));
  };

  useEffect(() => {
    if (!history?.location?.state?.fromCondition) {
      dispatch(showAlert(id));
    }

    dispatch(getConditionsDropDown());
    dispatch(getGroupDropDown());
  }, []);

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
      history.push('/app/conditions/' + condition.condition_id);
    } else {
      dispatch(postCondition(history, true));
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
            history={history}
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
          onClick={onSave}
        >
            Save Red Flag
        </Fab>
      </Tooltip>
    </div>
  );
};

export default Alert;
