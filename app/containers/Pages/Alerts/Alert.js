import React, { useEffect } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import { Notification, AlertNamingForm, AlertDemo } from '@components';
import { useSelector, useDispatch, } from 'react-redux';
import {
  useHistory
} from 'react-router-dom';
import {
  closeNotifAction, showAlert, putAlert, getConditionsDropDown, getGroupDropDown
} from './reducers/alertActions';
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
  const condition = useSelector(state => state.getIn([reducer, 'condition']));
  const conditionsDropDownOptions = useSelector(state => state.getIn([reducer, 'conditionsDropDownOptions'])).toJS();

  const onSave = () => {
    dispatch(putAlert(history, id, title, description, group, condition));
  };

  useEffect(() => {
    dispatch(showAlert(id));
    dispatch(getConditionsDropDown());
    dispatch(getGroupDropDown());
  }, []);

  return (
    <div>
      <Notification close={() => dispatch(closeNotifAction)} message={messageNotif} />
      <Grid container spacing={1}>
        <Grid item md={6}>
          <AlertNamingForm
            title={title}
            description={description}
            group={group}
            groupsDropDownOptions={groupsDropDownOptions}
            condition={condition}
            conditionsDropDownOptions={conditionsDropDownOptions}
          />
        </Grid>
        <Grid item md={6}>
          <AlertDemo
            title={title}
            description={description}
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
