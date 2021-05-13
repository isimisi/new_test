import React from 'react';

export const initElement = [
  {
    id: '1',
    type: 'custom',
    data: {
      label: (
        <>
          <strong>Lux Fund</strong>
        </>
      ),
    },
    position: { x: 250, y: 0 },
  },
  {
    id: '2',
    type: 'custom',
    data: {
      label: (
        <>
          <strong>DK HoldCo</strong>
        </>
      ),
    },
    position: { x: 245, y: 200 },
  },
  {
    id: '3',
    type: 'custom',
    data: {
      label: (
        <>
          <strong>Seller</strong>
        </>
      ),
    },
    position: { x: 540, y: 200 },
  },
  {
    id: '4',
    type: 'custom',
    data: {
      label: (
        <>
          <strong>Target</strong>
        </>
      ),
    },
    position: { x: 260, y: 350 },
  },
  {
    id: '5',
    type: 'custom',
    data: {
      label: (
        <>
          <strong>Investors</strong>
        </>
      ),
    },
    position: { x: 450, y: 0 },
  },
  {
    id: '6',
    type: 'custom',
    data: {
      label: (
        <>
          <strong>Investors</strong>
        </>
      ),
    },
    position: { x: 600, y: 0 },
  },
  {
    id: '11',
    source: '5',
    target: '3',
    sourceHandle: 'bottom',
    targetHandle: 'top',
    style: { stroke: '#000' },
    type: 'smoothstep'
  },
  {
    id: '12',
    source: '6',
    target: '3',
    sourceHandle: 'bottom',
    targetHandle: 'top',
    style: { stroke: '#000' },
    type: 'smoothstep'
  },
  {
    id: '13',
    source: '1',
    target: '2',
    sourceHandle: 'bottom',
    targetHandle: 'top',
    style: { stroke: '#000' },
    label: '100%',
    type: 'straight'
  },
  {
    id: '14',
    source: '2',
    target: '3',
    sourceHandle: 'right',
    targetHandle: '1left',
    style: { stroke: '#F00' },
    label: 'SHARES',
    animated: true,
    labelStyle: { fontSize: '8' },
    arrowHeadType: 'arrowclosed',
    type: 'straight'
  },
  {
    id: '15',
    source: '3',
    target: '2',
    sourceHandle: 'left',
    targetHandle: '1right',
    style: { stroke: '#F00' },
    labelBgPadding: [0, 0],
    label: 'CASH',
    labelStyle: { fontSize: '8' },
    animated: true,
    arrowHeadType: 'arrowclosed',
    type: 'straight'
  },
  {
    id: '16',
    source: '2',
    target: '4',
    sourceHandle: 'bottom',
    targetHandle: 'top',
    style: { stroke: '#000' },
    label: '100%',
    type: 'straight'
  },
  {
    id: '17',
    source: '1',
    target: '2',
    sourceHandle: 'right',
    targetHandle: '1right',
    style: { stroke: '#334FFF' },
    data: {
      text: 'SHL',
    },
    type: 'custom'
  },
  {
    id: '18',
    source: '4',
    target: '2',
    sourceHandle: 'left',
    targetHandle: '1left',
    style: { stroke: '#334FFF' },
    data: {
      text: 'Remuneration of Dividends',
    },
    type: 'custom'
  },
  {
    id: '19',
    source: '2',
    target: '1',
    sourceHandle: 'left',
    targetHandle: '1left',
    style: { stroke: '#334FFF' },
    data: {
      text: 'Interest (4%)',
    },
    type: 'custom',
    arrowHeadType: 'arrowclosed',
  },
];

export const reducer = 'workspace';
