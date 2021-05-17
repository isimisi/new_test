import React, { useEffect } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import {
  Notification, ConditionNamingForm, ConditionForm
} from '@components';
import {
  useHistory
} from 'react-router-dom';
import { useSelector, useDispatch, } from 'react-redux';
import Paper from '@material-ui/core/Paper';
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
  buildTypeOptions,
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
  // build type values
  const nodeLabels = useSelector(state => state.getIn([reducer, 'nodeLabels'])).toJS();
  const nodeDescriptions = useSelector(state => state.getIn([reducer, 'nodeDescriptions'])).toJS();
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
      <ConditionForm
        conditionValues={conditionValues}
        type={type}
        andOrOption={andOrOption}
        buildTypeOptions={buildTypeOptions}
        nodeLabels={nodeLabels}
        nodeDescriptions={nodeDescriptions}
        nodeAttributes={nodeAttributes}
        relationshipLabels={relationshipLabels}
        comparisonsOptions={comparisonsOptions}
      />
      <Grid container spacing={1}>
        <Grid item md={4}>
          <Paper style={{
            flexGrow: 1,
            padding: 30,
            display: 'flex',
            flexDirection: 'column',
            height: 400
          }}
          />
        </Grid>
        <Grid item md={4}>
          <Paper style={{
            flexGrow: 1,
            padding: 30,
            display: 'flex',
            flexDirection: 'column',
            height: 400
          }}
          />
        </Grid>
        <Grid item md={4}>
          <Paper style={{
            flexGrow: 1,
            padding: 30,
            display: 'flex',
            flexDirection: 'column',
            height: 400
          }}
          />
        </Grid>
      </Grid>
      <Grid style={{ maringTop: 30 }}>
        <Paper style={{
          flexGrow: 1,
          padding: 30,
          display: 'flex',
          flexDirection: 'column',
          height: 400
        }}
        />
      </Grid>
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
