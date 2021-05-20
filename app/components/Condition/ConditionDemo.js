import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './condition-jss';
import ReactFlow, {
  Background,
} from 'react-flow-renderer';
import { CustomNode, CustomEdge } from '@components';


const ConditionDemo = (props) => {
  const { classes } = props;

  const nodeTypes = {
    custom: CustomNode
  };

  const elements = [
    {
      id: '1',
      type: 'custom',
      data: {
        label: (
          <>
            Afsender
          </>
        ),
      },
      position: { x: 500, y: 100 },
    },
    {
      id: '2',
      type: 'custom',
      data: {
        label: (
          <>
              Modtager
          </>
        ),
      },
      position: { x: 500, y: 300 },
    },
    {
      id: '11',
      source: '1',
      target: '2',
      sourceHandle: 'bottom',
      targetHandle: 'top',
      label: 'Forbindelse 1',
      style: { stroke: '#000' },
    },
    {
      id: '12',
      source: '1',
      target: '2',
      type: 'custom',
      sourceHandle: 'sourceRight',
      targetHandle: 'targetRight',
      data: {
        label: 'Forbindelse 2',
        showLabel: true,
        value: 'værdi'
      },
      style: { stroke: '#000' },
    },
    {
      id: '13',
      source: '1',
      target: '2',
      type: 'custom',
      sourceHandle: 'sourceLeft',
      targetHandle: 'targetLeft',
      data: {
        label: 'Forbindelse 3',
        showLabel: true,
        value: 'værdi',
        convert: true
      },
      style: { stroke: '#000' },
    },
  ];

  return (
    <div className={classes.demoContainer}>
      <div
        className={classes.demoContent}
      >
        <ReactFlow
          elements={elements}
          nodeTypes={nodeTypes}
          edgeTypes={{ custom: CustomEdge }}
          connectionMode="loose"
        >
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </div>
    </div>
  );
};

ConditionDemo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConditionDemo);
