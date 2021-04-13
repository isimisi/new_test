import React, { useEffect } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import { useSelector, useDispatch } from 'react-redux';
import {
  useHistory
} from 'react-router-dom';
import { reducer, generateLabelStyle } from './constants';
import {
  RelationshipDemo, RelationshipStylling, RelationshipForm, Notification
} from '@components';
import {
  closeNotifAction, putRelationship, showRelationship, getGroupDropDown
} from './reducers/relationshipActions';


const Relationship = () => {
  const dispatch = useDispatch();
  const messageNotif = useSelector(state => state.getIn([reducer, 'message']));
  const history = useHistory();

  const id = history.location.pathname.split('/').pop();
  const label = useSelector(state => state.getIn([reducer, 'label']));
  const description = useSelector(state => state.getIn([reducer, 'description']));
  // const type = useSelector(state => state.getIn([reducer, 'type']));
  const group = useSelector(state => state.getIn([reducer, 'group']));
  const colorSelector = useSelector(state => state.getIn([reducer, 'color']));
  const size = useSelector(state => state.getIn([reducer, 'size']));
  const groupsDropDownOptions = useSelector(state => state.getIn([reducer, 'groupsDropDownOptions'])).toJS();

  const onSave = () => {
    const style = JSON.stringify({ color: colorSelector.toJS() });
    const labelStyle = JSON.stringify(generateLabelStyle(size));
    dispatch(putRelationship(id, label, description, style, labelStyle, group, history));
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
