/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
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
  Controls,
  isEdge,
  Node,
  FlowElement,
  Connection,
  OnLoadParams,
  Dimensions,
  ConnectionMode
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
import useMouse from '@react-hook/mouse-position';
import { useCutCopyPaste } from '@hooks/useCutCopyPasteOld';
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
  addRelationshipToList, addNodeToList, addAttributToList,
  addElements
} from './reducers/conditionActions';
import { useAuth0, User } from "@auth0/auth0-react";

const BASE_BG_GAP = 32;
const BASE_BG_STROKE = 1;

const nonValueArray = ['exists', 'does not exist', 'any'];

export interface ConditionValue {
  conditionNodeValueId?: string;
  attribut: string | null;
  comparison_type: string;
  comparison_value: string;
}

const Condition = (props) => {
  const { classes } = props;
  const dispatch = useAppDispatch();
  const user = useAuth0().user as User;
  const history = useHistory();
  const reactFlowContainer = useRef(null);
  const mouse = useMouse(reactFlowContainer, { fps: 10, enterDelay: 100, leaveDelay: 100 });
  const id = getId(history) as string;
  const [metaOpen, setMetaOpen] = useState(false);
  const [reactFlowDimensions, setReactFlowDimensions] = useState<Dimensions | null>(null);
  const [rfInstance, setRfInstance] = useState<OnLoadParams | null>(null);
  // @ts-ignore
  const fromContent = history?.location?.state?.fromContent;
  // relationship
  const [defineEdgeOpen, setDefineEdgeOpen] = useState(false);
  const [currentConnectionData, setCurrentConnectionData] = useState<Connection>({
    source: "",
    target: "",
    sourceHandle: "",
    targetHandle: "",
  });
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
  const [conditionValues, setConditionValues] = useState<ConditionValue[]>([]);


  const [isUpdatingElement, setIsUpdatingElement] = useState(false);
  const [elementToUpdate, setElementToUpdate] = useState<FlowElement | null>(null);

  useEffect(() => {
    dispatch(getGroupDropDown(user));
    dispatch(showCondition(user, id, setMetaOpen));
  }, [user]);

  useEffect(() => {
    if (group?.length > 0) {
      dispatch(getNodes(user, group));
      dispatch(getRelationships(user, group));
      dispatch(getBuildTypeValueOptions(user, group));
    }
  }, [user, group]);


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

    if (isUpdatingElement && elementToUpdate) {
      dispatch(putEdge(user, elementToUpdate.id, choosenRelationship.id, choosenRelationship.label, comparisonType, comparisonValue, relationshipType, closeEdge));
    } else {
      const edge = {
        relationship_id: choosenRelationship.id,
        relationshipLabel: choosenRelationship.label,
        relationshipType,
        comparisonType,
        comparisonValue,
        ...currentConnectionData
      };

      dispatch(postEdge(user, id, edge, closeEdge));
    }
  };

  const closeNode = React.useCallback(() => {
    setDefineNodeOpen(false);
    setIsUpdatingElement(false);
    setNodeLabel('');
    setConditionValues([]);
  }, []);

  const handleNodeSave = () => {
    const rf = rfInstance?.toObject();

    const _x = rf && reactFlowDimensions && (rf.position[0] * -1 + reactFlowDimensions.width) / rf.zoom - 250;
    const _y = rf && reactFlowDimensions && (rf.position[1] * -1 + reactFlowDimensions.height) / rf.zoom - 150;

    if (isUpdatingElement && elementToUpdate) {
      const originalElementIds = elementToUpdate.data.conditionValues.map(cv => cv.id);
      const newConditionValueIds = conditionValues.map(cv => cv.conditionNodeValueId);
      const deletedConditionValues = originalElementIds.filter(x => !newConditionValueIds.includes(x));
      dispatch(putNode(user, elementToUpdate.id, choosenNode.id, choosenNode.label, JSON.stringify(conditionValues), JSON.stringify(deletedConditionValues), closeNode));
    } else {
      dispatch(postNode(user, id, choosenNode.id, choosenNode.label, JSON.stringify(conditionValues), _x, _y, closeNode));
    }
  };


  const onElementsRemove = (elementsToRemove: FlowElement[]) => {
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

    dispatch(deleteConditionElement(user, elementsToRemove, remainingElements));
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
      const _nodes = flow.elements.filter((n): n is Node => isNode(n));
      const mappedNodes = _nodes.map(n => ({ id: n.id, x: n.position.x, y: n.position.y }));
      dispatch(saveCondition(user, id, flow.zoom, flow.position[0], flow.position[1], JSON.stringify(mappedNodes), history, label));
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
        // @ts-ignore
        height: reactFlowContainer.current.clientHeight, // @ts-ignore
        width: reactFlowContainer.current.clientWidth
      });
    }
  }, []);


  const handlePaste = (elementsToAdd) => {
    // @ts-ignore
    const reactFlowBounds = reactFlowContainer.current.getBoundingClientRect();
    // @ts-ignore
    const position = rfInstance.project({
      // @ts-ignore
      x: mouse.clientX - reactFlowBounds.left,
      // @ts-ignore
      y: mouse.clientY - reactFlowBounds.top,
    });

    const sortedByY = elementsToAdd.filter(e => isNode(e)).sort((a, b) => b.position.y - a.position.y);
    const topNode = sortedByY[sortedByY.length - 1];

    const now = Date.now();
    elementsToAdd.map((element) => {
      if (isEdge(element)) {
        element.id = `${element.id}_${now}-edit`;
        element.source = `${element.source}_${now}-edit`;
        element.target = `${element.target}_${now}-edit`;
      } else {
        element.id = `${element.id}_${now}-edit`;
        const xDistanceToTopNode = element.position.x - topNode.position.x;
        const yDistanceToTopNode = element.position.y - topNode.position.y;

        element.position.x = position.x + xDistanceToTopNode;
        element.position.y = position.y + yDistanceToTopNode;
      }
      return element;
    });

    dispatch(addElements(user, id, elementsToAdd));
  };

  useCutCopyPaste(elements, onElementsRemove, handlePaste);

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
          connectionMode={ConnectionMode.Loose}
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
        onSave={() => dispatch(putConditionMeta(user, id, label, description, group, JSON.stringify(tags), setMetaOpen))}
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
        handleDeleteEdge={() => elementToUpdate && onElementsRemove([elementToUpdate])}
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
        handleDeleteNode={() => elementToUpdate && onElementsRemove([elementToUpdate])}
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
