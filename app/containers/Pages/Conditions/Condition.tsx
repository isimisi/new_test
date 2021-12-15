/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
// @ts-nocheck
import React, {
  useState, useEffect, useRef
} from 'react';
import { withStyles, useTheme } from '@material-ui/core/styles';
import ReactFlow, {
  removeElements,
  Background,
  isNode,
  BackgroundVariant,
  MiniMap,
  Controls
} from 'react-flow-renderer';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import CustomEdge from '@components/Workspace/Edge/CustomEdge';
import CustomNode from '@components/Workspace/Node/CustomNode';
import ConditionDefineEdge from '@components/Condition/Edge/DefineEdge';
import ConditionDefineNode from '@components/Condition/Node/DefineNode';
import ConditionMeta from '@components/Condition/ConditionMeta';
import ConditionFabs from '@components/Condition/ConditionFabs';
import Notification from '@components/Notification/Notification';
import PropTypes from 'prop-types';
import {
  useHistory
} from 'react-router-dom';
import { getId } from '@api/constants';
import styles from './conditions-jss';
import { reducer, comparisonsOptions } from './constants';
import {
  closeNotifAction, titleChange, descriptionChange,
  addGroup, getGroupDropDown, getNodes,
  getBuildTypeValueOptions, changeTags,
  getRelationships, postNode, postEdge,
  showCondition, putConditionMeta, saveCondition,
  putNode, putEdge, deleteConditionElement,
  addRelationshipToList, addNodeToList, addAttributToList
} from './reducers/conditionActions';

const BASE_BG_GAP = 32;
const BASE_BG_STROKE = 1;

const nonValueArray = ['exists', 'does not exist', 'any'];


const Condition = (props) => {
  const { classes } = props;
  const dispatch = useAppDispatch();
  const history = useHistory();
  const reactFlowContainer = useRef(null);
  const id = getId(history);
  const [metaOpen, setMetaOpen] = useState(false);
  const [reactFlowDimensions, setReactFlowDimensions] = useState(null);
  const [rfInstance, setRfInstance] = useState(null);
  const fromContent = history?.location?.state?.fromContent;
  // relationship
  const [defineEdgeOpen, setDefineEdgeOpen] = useState(false);
  const [currentConnectionData, setCurrentConnectionData] = useState({});
  const [relationshipLabel, setRelationshipLabel] = useState('');
  const [relationshipType, setRelationshipType] = useState('custom');
  const [comparisonType, setComparisonType] = useState('exists');
  const [comparisonValue, setComparisonValue] = useState('');

  const [currentZoom, setCurrentZoom] = useState(1);

  const theme = useTheme();

  // REDUX
  const relationships = useAppSelector(state => state[reducer].get('relationships')).toJS();
  const nodes = useAppSelector(state => state[reducer].get('nodes')).toJS();
  const elements = useAppSelector(state => state[reducer].get('elements')).toJS();
  const label = useAppSelector(state => state[reducer].get('label'));
  const description = useAppSelector(state => state[reducer].get('description'));
  const group = useAppSelector(state => state[reducer].get('group'));
  const groupsDropDownOptions = useAppSelector(state => state[reducer].get('groupsDropDownOptions')).toJS();
  const nodeAttributes = useAppSelector(state => state[reducer].get('nodeAttributes')).toJS();
  const messageNotif = useAppSelector(state => state[reducer].get('message'));
  const tagOptions = useAppSelector(state => state.tags.get('tags')).toJS();
  const tags = useAppSelector(state => state[reducer].get('conditionTags'))?.toJS();

  const [defineNodeOpen, setDefineNodeOpen] = useState(false);
  const [nodeLabel, setNodeLabel] = useState('');
  const [conditionValues, setConditionValues] = useState([]);

  const [isUpdatingElement, setIsUpdatingElement] = useState(false);
  const [elementToUpdate, setElementToUpdate] = useState(null);

  useEffect(() => {
    dispatch(getGroupDropDown());
    dispatch(showCondition(id, setMetaOpen));
  }, []);

  useEffect(() => {
    if (group?.length > 0) {
      dispatch(getNodes(group));
      dispatch(getRelationships(group));
      dispatch(getBuildTypeValueOptions(group));
    }
  }, [group]);


  const choosenNode = nodes.find(r => r.label === nodeLabel);

  const onConnect = (data) => {
    if (data.source !== data.target) {
      setCurrentConnectionData(data);
      setDefineEdgeOpen(true);
    }
  };

  const closeEdge = React.useCallback(() => {
    setDefineEdgeOpen(false);
    setIsUpdatingElement(false);
    setRelationshipLabel('');
    setRelationshipType('custom');
    setComparisonType('exists');
    setComparisonValue('');
  }, []);

  const handleRelationshipSave = () => {
    const choosenRelationship = relationships.find(r => r.label === relationshipLabel);

    if (isUpdatingElement) {
      dispatch(putEdge(elementToUpdate.id, choosenRelationship.id, choosenRelationship.label, comparisonType, comparisonValue, relationshipType, closeEdge));
    } else {
      const edge = {
        relationship_id: choosenRelationship.id,
        relationshipLabel: choosenRelationship.label,
        relationshipType,
        comparisonType,
        comparisonValue,
        ...currentConnectionData
      };

      dispatch(postEdge(id, edge, closeEdge));
    }
  };

  const closeNode = React.useCallback(() => {
    setDefineNodeOpen(false);
    setIsUpdatingElement(false);
    setNodeLabel('');
    setConditionValues([]);
  }, []);

  const handleNodeSave = () => {
    const rf = rfInstance.toObject();

    const _x = (rf.position[0] * -1 + reactFlowDimensions.width) / rf.zoom - 250;
    const _y = (rf.position[1] * -1 + reactFlowDimensions.height) / rf.zoom - 150;

    if (isUpdatingElement) {
      const originalElementIds = elementToUpdate.data.conditionValues.map(cv => cv.id);
      const newConditionValueIds = conditionValues.map(cv => cv.conditionNodeValueId);
      const deletedConditionValues = originalElementIds.filter(x => !newConditionValueIds.includes(x));
      dispatch(putNode(elementToUpdate.id, choosenNode.id, choosenNode.label, JSON.stringify(conditionValues), JSON.stringify(deletedConditionValues), closeNode));
    } else {
      dispatch(postNode(id, choosenNode.id, choosenNode.label, JSON.stringify(conditionValues), _x, _y, closeNode));
    }
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


    if (_type === 'comparison_type' && nonValueArray.includes(value)) {
      newArray[index].comparison_value = '';
    }

    newArray[index] = { ...newArray[index], [_type]: value };

    if (_type === 'attribut' && isNew) {
      dispatch(addAttributToList({ label: value, value }));
    }

    setConditionValues(newArray);
  };

  window.onbeforeunload = () => {
    onConditionSave();
  };

  useEffect(() => {
    if (reactFlowContainer) {
      setReactFlowDimensions({
        height: reactFlowContainer.current.clientHeight,
        width: reactFlowContainer.current.clientWidth
      });
    }
  }, []);

  // useEffect(() => {
  //   if (rfInstance) {
  //     rfInstance.fitView();
  //   }
  // }, [elements, rfInstance]);

  return (
    <div>
      <Notification close={() => dispatch(closeNotifAction)} message={messageNotif} />
      <div className={classes.root} ref={reactFlowContainer}>

        <ReactFlow
          elements={elements}
          onElementsRemove={onElementsRemove}
          onConnect={onConnect}
          nodeTypes={{ custom: CustomNode }}
          edgeTypes={{ custom: CustomEdge }}
          onLoad={onLoad}
          connectionMode="loose"
          onElementClick={onElementClick}
          onMove={(flowTransform) => {
            if (flowTransform) {
              setCurrentZoom(flowTransform.zoom);
            }
          }}
        >
          <Background
            variant={BackgroundVariant.Lines}
            gap={BASE_BG_GAP / currentZoom}
            size={BASE_BG_STROKE / currentZoom}
          />

          <MiniMap
            nodeStrokeWidth={3}
            nodeColor={theme.palette.secondary.main}
            style={{ top: 10, right: 10, borderRadius: 10 }}
          />
          <Controls style={{ borderRadius: 4 }} />
        </ReactFlow>
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
        onSave={() => dispatch(putConditionMeta(id, label, description, group, JSON.stringify(tags), setMetaOpen))}
        closeForm={() => setMetaOpen(false)}
        tagOptions={tagOptions}
        tags={tags}
        changeTags={_tags => dispatch(changeTags(_tags))}
      />
      <ConditionDefineEdge
        open={defineEdgeOpen}
        close={closeEdge}
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
        handleComparisonTypeChange={(v) => {
          if (nonValueArray.includes(v)) {
            setComparisonValue('');
          }
          setComparisonType(v);
        }}
        comparisonValue={comparisonValue}
        handleComparisonValueChange={(v) => setComparisonValue(v)}
        isUpdatingElement={isUpdatingElement}
        handleDeleteEdge={() => onElementsRemove([elementToUpdate])}
      />
      <ConditionDefineNode
        open={defineNodeOpen}
        close={closeNode}
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
