/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ReactFlow, {
  removeElements,
  Background,
  isNode
} from 'react-flow-renderer';
import {
  CustomNode, ConditionDefineEdge,
  CustomEdge, ConditionDefineNode,
  ConditionMeta, Notification, ConditionFabs
} from '@components';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  useHistory
} from 'react-router-dom';
import styles from './conditions-jss';
import { reducer, comparisonsOptions } from './constants';
import {
  closeNotifAction, titleChange, descriptionChange,
  addGroup, getGroupDropDown, getNodes,
  getBuildTypeValueOptions,
  getRelationships, postNode, postEdge,
  showCondition
} from './reducers/conditionActions';


const Condition = (props) => {
  const { classes } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const id = history.location.pathname.split('/').pop();
  const [metaOpen, setMetaOpen] = useState(false);
  const [rfInstance, setRfInstance] = useState(null);


  // relationship
  const [defineEdgeOpen, setDefineEdgeOpen] = useState(false);
  const [currentConnectionData, setCurrentConnectionData] = useState({});
  const [relationshipLabel, setRelationshipLabel] = useState('');
  const [relationshipType, setRelationshipType] = useState('');
  const [comparisonType, setComparisonType] = useState('default');
  const [comparisonValue, setComparisonValue] = useState('');

  // REDUX
  const relationships = useSelector(state => state.getIn([reducer, 'relationships'])).toJS();
  const nodes = useSelector(state => state.getIn([reducer, 'nodes'])).toJS();
  const elements = useSelector(state => state.getIn([reducer, 'elements'])).toJS();
  const label = useSelector(state => state.getIn([reducer, 'label']));
  const description = useSelector(state => state.getIn([reducer, 'description']));
  const group = useSelector(state => state.getIn([reducer, 'group']));
  const groupsDropDownOptions = useSelector(state => state.getIn([reducer, 'groupsDropDownOptions'])).toJS();
  const nodeAttributes = useSelector(state => state.getIn([reducer, 'nodeAttributes'])).toJS();
  const messageNotif = useSelector(state => state.getIn([reducer, 'message']));

  const [defineNodeOpen, setDefineNodeOpen] = useState(false);
  const [nodeLabel, setNodeLabel] = useState('');
  const [conditionValues, setConditionValues] = useState([]);

  useEffect(() => {
    dispatch(getGroupDropDown());
    dispatch(getNodes());
    dispatch(getRelationships());
    dispatch(getBuildTypeValueOptions());
    dispatch(showCondition(id));

    if (label.length === 0 || description.length === 0 || group) {
      // setMetaOpen(true);
    }
  }, []);


  const choosenNode = nodes.find(r => r.label === nodeLabel);

  const onConnect = (data) => {
    if (data.source !== data.target) {
      setCurrentConnectionData(data);
      setDefineEdgeOpen(true);
    }
  };

  const handleRelationshipSave = () => {
    const choosenRelationship = relationships.find(r => r.label === relationshipLabel);
    const edge = {
      relationship_id: choosenRelationship.id,
      relationshipType,
      comparisonType,
      comparisonValue,
      ...currentConnectionData
    };

    dispatch(postEdge(id, edge, setDefineEdgeOpen));
  };

  const handleNodeSave = () => {
    dispatch(postNode(id, choosenNode.id, JSON.stringify(conditionValues), setDefineNodeOpen));
  };


  const onElementsRemove = (elementsToRemove) => {
    //
  };

  const onLoad = (_reactFlowInstance) => {
    setRfInstance(_reactFlowInstance);
    _reactFlowInstance.fitView();
  };

  const onElementClick = (event, element) => {
    console.log(event, element);
  };

  const onConditionSave = () => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      const _nodes = flow.elements.filter(n => isNode(n));
      const mappedNodes = _nodes.map(n => ({ id: n.id, x: n.position.x, y: n.position.y }));
      console.log(mappedNodes);
    }
  };

  const handleNodeChange = (value, index, _type) => {
    const newArray = [...conditionValues];
    newArray[index] = { ...newArray[index], [_type]: value };
    setConditionValues(newArray);
  };

  return (
    <div>
      <Notification close={() => dispatch(closeNotifAction)} message={messageNotif} />
      <div className={classes.root}>
        <div
          className={classes.content}
        >
          <ReactFlow
            elements={elements}
            onElementsRemove={onElementsRemove}
            onConnect={onConnect}
            nodeTypes={{ custom: CustomNode }}
            edgeTypes={{ custom: CustomEdge }}
            onLoad={onLoad}
            connectionMode="loose"
            onElementClick={onElementClick}
          >
            <Background color="#aaa" gap={16} />
          </ReactFlow>
        </div>
      </div>
      <ConditionMeta
        open={metaOpen}
        label={label}
        description={description}
        group={group}
        labelChange={(e) => dispatch(titleChange(e.target.value))}
        descriptionChange={(e) => dispatch(descriptionChange(e.target.value))}
        addGroup={(_group) => dispatch(addGroup(_group.value))}
        groupsDropDownOptions={groupsDropDownOptions}
        onSave={() => console.log('hej')}
        closeForm={() => setMetaOpen(false)}
      />
      <ConditionDefineEdge
        open={defineEdgeOpen}
        close={() => setDefineEdgeOpen(false)}
        relationships={relationships}
        relationshipLabel={relationshipLabel}
        handleChangeLabel={(_label) => setRelationshipLabel(_label.value)}
        type={relationshipType}
        handleTypeChange={(_type) => setRelationshipType(_type.value)}
        handleSave={() => handleRelationshipSave()}
        comparisonsOptions={comparisonsOptions}
        comparisonType={comparisonType}
        handleComparisonTypeChange={(v) => setComparisonType(v)}
        comparisonValue={comparisonValue}
        handleComparisonValueChange={(v) => setComparisonValue(v)}
      />
      <ConditionDefineNode
        open={defineNodeOpen}
        close={() => setDefineNodeOpen(false)}
        nodes={nodes}
        nodeLabel={nodeLabel}
        handleChangeLabel={(_label) => setNodeLabel(_label.value)}
        handleNodeSave={handleNodeSave}
        handleNodeChange={handleNodeChange}
        conditionValues={conditionValues}
        nodeAttributes={nodeAttributes}
        comparisonsOptions={comparisonsOptions}
        addConditionValue={() => setConditionValues([...conditionValues, { attribut: null, comparison_type: 'is equal to', comparison_value: '' }])}
        deleteConditionValue={(index) => setConditionValues(values => values.filter((v, i) => i !== index))}
      />
      {!metaOpen && !defineEdgeOpen && !defineNodeOpen && (
        <ConditionFabs
          nodeClick={() => setDefineNodeOpen(true)}
          metaClick={() => setMetaOpen(true)}
          saveClick={() => console.log('hej')}
        />
      )}
    </div>
  );
};

Condition.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Condition);
