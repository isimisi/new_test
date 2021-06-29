/* eslint-disable no-param-reassign */
import React from 'react';
import Button from '@material-ui/core/Button';
import { isNode } from 'react-flow-renderer';
import dagre from 'dagre';
import { Link } from 'react-router-dom';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

export const getLayoutedElements = (elements, direction = 'TB') => {
  // these should be calculated
  const nodeWidth = 172;
  const nodeHeight = 36;

  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  elements.forEach((el) => {
    if (isNode(el)) {
      dagreGraph.setNode(el.id, { width: nodeWidth, height: nodeHeight });
    } else {
      dagreGraph.setEdge(el.source, el.target);
    }
  });

  dagre.layout(dagreGraph);

  return elements.map((el) => {
    if (isNode(el)) {
      const nodeWithPosition = dagreGraph.node(el.id);
      el.targetPosition = isHorizontal ? 'left' : 'top';
      el.sourcePosition = isHorizontal ? 'right' : 'bottom';

      // unfortunately we need this little hack to pass a slightly different position
      // to notify react flow about the change. Moreover we are shifting the dagre node position
      // (anchor=center center) to the top left so it matches the react flow node anchor point (top left).
      el.position = {
        x: nodeWithPosition.x - nodeWidth / 2 + Math.random() / 1000,
        y: nodeWithPosition.y - nodeHeight / 2,
      };
    }

    return el;
  });
};

export const columns = [
  {
    name: 'Title',
    options: {
      filter: true
    }
  },
  {
    name: 'Description',
    options: {
      filter: true,
    }
  },
  {
    name: 'Group',
    options: {
      filter: true,
    }
  },
  {
    name: 'See Workspace',
    options: {
      filter: true,
      customBodyRender: (value) => (
        <Link to={`/app/workspaces/${value}`}>
          <Button variant="contained" color="primary">
            Open
          </Button>
        </Link>
      )
    }
  },
  {
    name: 'Last Edited',
    options: {
      filter: true,
    }
  },
];

export const reducer = 'workspace';

export const initErstTypes = {
  nodes: {
    VIRKSOMHED: 'Selskab',
    PERSON: 'Person',
  },
  edges: {
    EJERSKAB: 'Ejerskab',
  },

};
