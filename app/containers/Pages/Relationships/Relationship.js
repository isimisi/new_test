import React, { useEffect } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import { useSelector, useDispatch } from 'react-redux';
import {
  useHistory
} from 'react-router-dom';
import { getId } from '@api/constants';
import { reducer, generateLabelStyle } from './constants';
import {
  RelationshipDemo, RelationshipStylling, RelationshipForm, Notification
} from '@components';
import {
  closeNotifAction, putRelationship, showRelationship, getGroupDropDown
} from './reducers/relationshipActions';


const Relationship = () => {
  const dispatch = useDispatch();
  const messageNotif = useSelector(state => state[reducer].get('message'));
  const history = useHistory();

  const id = getId(history);
  const label = useSelector(state => state[reducer].get('label'));
  const values = useSelector(state => state[reducer].get('values')).toJS();
  const description = useSelector(state => state[reducer].get('description'));
  const group = useSelector(state => state[reducer].get('group'));
  const colorSelector = useSelector(state => state[reducer].get('color'));
  const size = useSelector(state => state[reducer].get('size'));
  const groupsDropDownOptions = useSelector(state => state[reducer].get('groupsDropDownOptions')).toJS();

  const onSave = () => {
    const style = JSON.stringify({ color: colorSelector.toJS() });
    const labelStyle = JSON.stringify(generateLabelStyle(size));
    dispatch(putRelationship(id, label, JSON.stringify(values), description, style, labelStyle, group, history));
  };

  useEffect(() => {
    dispatch(showRelationship(id));
    dispatch(getGroupDropDown());
  }, []);


  return (
    <div>
      <Notification close={() => dispatch(closeNotifAction)} message={messageNotif} />
      <Grid container spacing={1}>
        <Grid item md={4}>
          <RelationshipForm
            label={label}
            description={description}
            group={group}
            values={values}
            groupsDropDownOptions={groupsDropDownOptions}
          />
        </Grid>
        <Grid item md={4}>
          <RelationshipDemo
            label={label}
            description={description}
            colorSelector={colorSelector}
            size={size}
          />
        </Grid>
        <Grid item md={4}>
          <RelationshipStylling
            color={colorSelector.toJS()}
            size={size}
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
            Save Relationship
        </Fab>
      </Tooltip>
    </div>
  );
};

export default Relationship;
