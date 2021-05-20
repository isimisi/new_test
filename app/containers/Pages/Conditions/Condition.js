import React, { useEffect } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import {
  Notification, ConditionNamingForm, ConditionNodeForm, ConditionEdgeForm, ConditionDemo
} from '@components';
import {
  useHistory
} from 'react-router-dom';
import { useSelector, useDispatch, } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import {
  closeNotifAction,
  showCondition,
  getGroupDropDown,
  putCondition,
  getBuildTypeValueOptions
} from './reducers/conditionActions';
import {
  reducer,
  andOrOption,
  comparisonsOptions
} from './constants';

const Condition = () => {
  const dispatch = useDispatch();
  const messageNotif = useSelector(state => state.getIn([reducer, 'message']));
  const history = useHistory();
  const id = history.location.pathname.split('/').pop();
  const title = useSelector(state => state.getIn([reducer, 'title']));
  const description = useSelector(state => state.getIn([reducer, 'description']));
  const group = useSelector(state => state.getIn([reducer, 'group']));
  const type = useSelector(state => state.getIn([reducer, 'type']));
  const groupsDropDownOptions = useSelector(state => state.getIn([reducer, 'groupsDropDownOptions'])).toJS();
  const conditionValues = useSelector(state => state.getIn([reducer, 'conditionValues'])).toJS();

  const nodeAttributes = useSelector(state => state.getIn([reducer, 'nodeAttributes'])).toJS();
  const relationshipLabels = useSelector(state => state.getIn([reducer, 'relationshipLabels'])).toJS();

  const onSave = () => {
    const values = [...conditionValues];
    values.pop();
    dispatch(putCondition(id, title, description, type, group, JSON.stringify(values), history));
  };

  useEffect(() => {
    dispatch(showCondition(id));
    dispatch(getGroupDropDown());
    dispatch(getBuildTypeValueOptions());
  }, []);
  return (
    <div>
      <Notification close={() => dispatch(closeNotifAction)} message={messageNotif} />
      <ConditionNamingForm
        title={title}
        description={description}
        group={group}
        groupsDropDownOptions={groupsDropDownOptions}
      />
      <Grid container spacing={1}>
        <Grid item md={4}>
          <ConditionNodeForm
            type="afsender"
            attrType={type}
            andOrOption={andOrOption}
            conditionValues={conditionValues}
            nodeAttributes={nodeAttributes}
            comparisonsOptions={comparisonsOptions}
          />
        </Grid>
        <Grid item md={4}>
          <ConditionEdgeForm
            relationshipLabels={relationshipLabels}
          />
        </Grid>
        <Grid item md={4}>
          <ConditionNodeForm
            type="modtager"
            attrType={type}
            andOrOption={andOrOption}
            conditionValues={conditionValues}
            nodeAttributes={nodeAttributes}
            comparisonsOptions={comparisonsOptions}
          />
        </Grid>
      </Grid>
      <ConditionDemo />
      <div>
        <Tooltip title="Save Condition">
          <Fab
            variant="extended"
            color="primary"
            style={{
              position: 'fixed',
              bottom: 30,
              right: 30,
              zIndex: 100
            }}
            onClick={onSave}
          >
            Save Condition
          </Fab>
        </Tooltip>
      </div>
    </div>
  );
};

export default Condition;
