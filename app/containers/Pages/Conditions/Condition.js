/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ReactFlow, {
  removeElements,
  Background,
  isNode,
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
  showCondition, putConditionMeta, saveCondition,
  putNode, putEdge, deleteConditionElement,
  addRelationshipToList, addNodeToList, addAttributToList
} from './reducers/conditionActions';


const Condition = (props) => {
  const { classes } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const id = history.location.pathname.split('/').pop();
  const [metaOpen, setMetaOpen] = useState(false);
  const [rfInstance, setRfInstance] = useState(null);
  const fromContent = history?.location?.state?.fromContent;
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

  const [isUpdatingElement, setIsUpdatingElement] = useState(false);
  const [elementToUpdate, setElementToUpdate] = useState(null);

  useEffect(() => {
    dispatch(getGroupDropDown());
    dispatch(getNodes());
    dispatch(getRelationships());
    dispatch(getBuildTypeValueOptions());
    dispatch(showCondition(id));
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

    if (isUpdatingElement) {
      dispatch(putEdge(elementToUpdate.id, choosenRelationship.id, choosenRelationship.label, comparisonType, comparisonValue, relationshipType, setDefineEdgeOpen));
    } else {
      const edge = {
        relationship_id: choosenRelationship.id,
        relationshipLabel: choosenRelationship.label,
        relationshipType,
        comparisonType,
        comparisonValue,
        ...currentConnectionData
      };
      dispatch(postEdge(id, edge, setDefineEdgeOpen));
    }
  };

  const handleNodeSave = () => {
    if (isUpdatingElement) {
      const originalElementIds = elementToUpdate.data.conditionValues.map(cv => cv.id);
      const newConditionValueIds = conditionValues.map(cv => cv.conditionNodeValueId);
      const deletedConditionValues = originalElementIds.filter(x => !newConditionValueIds.includes(x));
      dispatch(putNode(elementToUpdate.id, choosenNode.id, choosenNode.label, JSON.stringify(conditionValues), JSON.stringify(deletedConditionValues), setDefineNodeOpen));
    } else {
      dispatch(postNode(id, choosenNode.id, choosenNode.label, JSON.stringify(conditionValues), setDefineNodeOpen));
    }
    setIsUpdatingElement(false);
  };


  const onElementsRemove = (elementsToRemove) => {
    const remainingElements = removeElements(elementsToRemove, elements);
    setIsUpdatingElement(false);
    setElementToUpdate(null);

    if (elementsToRemove.length === 1) {
      if (isNode(elementsToRemove[0])) {
        setDefineNodeOpen(false);
      } else {
        setDefineEdgeOpen(false);
      }
    }

    dispatch(deleteConditionElement(elementsToRemove, remainingElements));
  };

  const onLoad = (_reactFlowInstance) => {
    setRfInstance(_reactFlowInstance);
    _reactFlowInstance.fitView();
  };

  const onElementClick = (event, element) => {
    setIsUpdatingElement(true);
    setElementToUpdate(element);

    if (isNode(element)) {
      setNodeLabel(element.data.label);
      setConditionValues(element.data.conditionValues.map(e => ({
        conditionNodeValueId: e.id,
        attribut: e.attribut.label,
        comparison_type: e.comparison_type,
        comparison_value: e.comparison_value
      })));
      setDefineNodeOpen(true);
    } else {
      setRelationshipLabel(element.data.label);
      setRelationshipType(element.type);
      setComparisonType(element.data.comparison_type);
      setComparisonValue(element.data.comparison_value);
      setDefineEdgeOpen(true);
    }
  };

  const onConditionSave = () => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      const _nodes = flow.elements.filter(n => isNode(n));
      const mappedNodes = _nodes.map(n => ({ id: n.id, x: n.position.x, y: n.position.y }));
      dispatch(saveCondition(id, flow.zoom, flow.position[0], flow.position[1], JSON.stringify(mappedNodes), history, label));
    }
  };

  const handleNodeChange = (value, index, _type, isNew = false) => {
    const newArray = [...conditionValues];
    newArray[index] = { ...newArray[index], [_type]: value };

    if (_type === 'attribut' && isNew) {
      dispatch(addAttributToList({ label: value, value }));
    }

    setConditionValues(newArray);
  };

  const flowStyle = {
    backgroundColor: 'white'
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
            style={flowStyle}
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
        onSave={() => dispatch(putConditionMeta(id, label, description, group, setMetaOpen))}
        closeForm={() => setMetaOpen(false)}
      />
      <ConditionDefineEdge
        open={defineEdgeOpen}
        close={() => {
          setDefineEdgeOpen(false);
          setIsUpdatingElement(false);
        }}
        relationships={relationships}
        relationshipLabel={relationshipLabel}
        handleChangeLabel={(_label) => {
          if (_label.__isNew__) {
            dispatch(addRelationshipToList({
              id: null,
              label: _label.value,
              description: null,
              values: [],
              style: '{"color": {"a": 1, "b": 0, "g": 0, "r": 0}'
            }));
          }
          setRelationshipLabel(_label.value);
        }}
        type={relationshipType}
        handleTypeChange={(_type) => setRelationshipType(_type.value)}
        handleSave={() => handleRelationshipSave()}
        comparisonsOptions={comparisonsOptions}
        comparisonType={comparisonType}
        handleComparisonTypeChange={(v) => setComparisonType(v)}
        comparisonValue={comparisonValue}
        handleComparisonValueChange={(v) => setComparisonValue(v)}
        isUpdatingElement={isUpdatingElement}
        handleDeleteEdge={() => onElementsRemove([elementToUpdate])}
      />
      <ConditionDefineNode
        open={defineNodeOpen}
        close={() => {
          setDefineNodeOpen(false);
          setIsUpdatingElement(false);
        }}
        nodes={nodes}
        nodeLabel={nodeLabel}
        handleChangeLabel={(_label) => {
          if (_label.__isNew__) {
            dispatch(addNodeToList({
              attributes: [],
              description: '',
              id: null,
              label: _label.value
            }));
          }
          setNodeLabel(_label.value);
        }}
        handleNodeSave={handleNodeSave}
        handleNodeChange={handleNodeChange}
        conditionValues={conditionValues}
        nodeAttributes={nodeAttributes}
        comparisonsOptions={comparisonsOptions}
        addConditionValue={() => setConditionValues([...conditionValues, { attribut: null, comparison_type: 'is equal to', comparison_value: '' }])}
        deleteConditionValue={(index) => setConditionValues(values => values.filter((v, i) => i !== index))}
        isUpdatingElement={isUpdatingElement}
        handleDeleteNode={() => onElementsRemove([elementToUpdate])}
      />
      {!metaOpen && !defineEdgeOpen && !defineNodeOpen && (
        <ConditionFabs
          nodeClick={() => setDefineNodeOpen(true)}
          metaClick={() => setMetaOpen(true)}
          saveClick={onConditionSave}
          fromContent={fromContent}
        />
      )}
    </div>
  );
};

Condition.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Condition);
