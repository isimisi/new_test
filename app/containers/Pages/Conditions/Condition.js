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
import Tree from 'react-d3-tree';
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

const orgChart = {
  name: 'CEO',
  keanTest: 'hejmeddig',
  children: [
    {
      name: 'Manager',
      attributes: {
        Department: 'Production'
      },
      children: [
        {
          name: 'Foreman',
          attributes: {
            Department: 'Fabrication'
          },
          children: [
            {
              name: 'Workers'
            }
          ]
        },
        {
          name: 'Foreman',
          attributes: {
            Department: 'Assembly'
          },
          children: [
            {
              name: 'Workers'
            }
          ]
        }
      ]
    },
    {
      name: 'Manager',
      attributes: {
        Department: 'Marketing'
      },
      children: [
        {
          name: 'Sales Officer',
          attributes: {
            Department: 'A'
          },
          children: [
            {
              name: 'Salespeople'
            }
          ]
        },
        {
          name: 'Sales Officer',
          attributes: {
            Department: 'B'
          },
          children: [
            {
              name: 'Salespeople'
            }
          ]
        }
      ]
    }
  ]
};

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

  const renderRectSvgNode = (props) => {
    console.log(props);
    return (
      <g>
        <rect width="20" height="20" x="-10" onClick={props.toggleNode} />
        <text fill="black" strokeWidth="1" x="20">
          {props.nodeDatum.name}
        </text>
        {props.nodeDatum.attributes?.department && (
          <text fill="black" x="20" dy="20" strokeWidth="1">
          Department:
            {' '}
            {props.nodeDatum.attributes?.department}
          </text>
        )}
      </g>
    );
  };

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
