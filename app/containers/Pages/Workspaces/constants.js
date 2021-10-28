/* eslint-disable no-param-reassign */
import React from 'react';
import Button from '@material-ui/core/Button';
import { isNode } from 'react-flow-renderer';
import dagre from 'dagre';
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import CheckIcon from '@material-ui/icons/Check';

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
    name: 'Titel',
    options: {
      filter: true,
      customBodyRender: (value) => (
        value.split('∉').map((v, i) => {
          if (i === 0) {
            return v;
          }
          if (v === 'true') {
            return <CheckIcon style={{ color: 'green', marginBottom: 20 }} />;
          }
          return '';
        })
      )
    }
  },
  {
    name: 'Beskrivelse',
    options: {
      filter: true,
    }
  },
  {
    name: 'Gruppe',
    options: {
      filter: true,
    }
  },
  {
    name: 'Se arbejdsområde',
    options: {
      filter: true,
      customBodyRender: (value) => (
        <Tooltip title={!value ? 'Dine arbejdsområder bliver låst efter 7 dage på lite og 90 dage på base' : 'Gå til arbejdsområde'}>
          <Link to={!value ? '/app/plan' : `/app/workspaces/${value}`} style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="secondary" disabled={!value}>
              {!value ? 'Låst' : 'Åben'}
            </Button>
          </Link>
        </Tooltip>
      )
    }
  },
  {
    name: 'Oprettet',
    options: {
      filter: true,
    }
  },
  {
    name: 'Sidst ændret',
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

const localeSteps = {
  skip: <Button size="small" style={{ color: '#bbb' }}>Spring over</Button>,
  back: <div>Forrige</div>,
  next: <div>Næste</div>,
};

export const steps = [
  {
    content: <h2>Velkommen til arbejdsområdet</h2>,
    locale: localeSteps,
    placement: 'center',
    target: 'body',
  },
  {
    target: '.floatingPanel',
    content: 'Start med at beskrive arbejdsområdet. Vælg gruppen "Corporate"!',
    locale: localeSteps,
    disableBeacon: true,
    disableOverlayClose: true,
    hideCloseButton: true,
    hideFooter: true,
    spotlightClicks: true,
  },
  {
    content: <div style={{ textAlign: 'left' }}>Du kan indsætte tekstbokse og noter via denne kvik-knap.</div>,
    locale: localeSteps,
    target: '.rtf--mb:nth-of-type(1)',
  },
  {
    content: <div style={{ textAlign: 'left' }}>Indsæt elementer, som fx selskaber og personer, via denne kvik-knap.</div>,
    locale: localeSteps,
    target: '.rtf:nth-of-type(2) > li > button',
  },
  {
    content: <div style={{ textAlign: 'left' }}>I denne menu finder du de øvrige funktioner. Her kan du gemme ændringerne i dit arbejdsområde!</div>,
    locale: localeSteps,
    target: '.rtf--ab__c:nth-of-type(1)',
    disableBeacon: true,
  },
  {
    content: <div style={{ textAlign: 'left' }}>Hvis du vil ændre navn, beskrivelse og gruppe - eller ændre indstillingen for deling - skal du trykke her.</div>,
    locale: localeSteps,
    target: '.rtf--ab__c:nth-of-type(2)',
    disableBeacon: true,
  },
  {
    content: <div style={{ textAlign: 'left' }}>Tryk på Analyser-knappen for at skabe et notat eller en rapport på baggrund af tegningen i arbejdsområdet.</div>,
    locale: localeSteps,
    target: '.rtf--ab__c:nth-of-type(3)',
    disableBeacon: true,
  },
  {
    content: <div style={{ textAlign: 'left' }}>Du kan også få en fuld oversigt over red flags i arbejdsområdet - også selvom du allerede har set dem.</div>,
    locale: localeSteps,
    target: '.rtf--ab__c:nth-of-type(4)',
    disableBeacon: true,
  },
  {
    content: <div style={{ textAlign: 'left' }}>Hvis du får brug for at dele arbejdsområdet med nogen, der ikke er Juristic-brugere, kan du gøre det her.</div>,
    locale: localeSteps,
    target: '.rtf--ab__c:nth-of-type(5)',
    disableBeacon: true,
  },
  {
    content: <div style={{ textAlign: 'left' }}>Vi har koblet Juristic direkte til CVR (og snart også i Sverige, Norge og Finland). Prøv at trykke her nu!</div>,
    locale: localeSteps,
    target: '.rtf--ab__c:nth-of-type(6)',
    disableBeacon: true,
    disableOverlayClose: true,
    hideCloseButton: true,
    hideFooter: true,
    spotlightClicks: true,
  },
  {
    content: <div style={{ textAlign: 'left' }}>Hvis du ikke kan finde din tegning eller dit diagram, kan du trykke her for at centrere visningen!</div>,
    locale: localeSteps,
    target: '.react-flow__controls-fitview',
  },
  {
    content: <div style={{ textAlign: 'left' }}>Download koncerndiagrammet eller tegningen ved at trykke her - husk, det er kun det, du kan se på din skærm, der downloades!</div>,
    locale: localeSteps,
    target: '.react-flow__controls-button:nth-of-type(5)',
  },
  {
    content: <div style={{ textAlign: 'left' }}>Og til slut kan du trykke her for at skjule hjælpestreger m.v. fra arbejdsområdet - eller slå dem til igen.</div>,
    locale: localeSteps,
    target: '.react-flow__controls-button:nth-of-type(6)',
  },
  {
    content: <div style={{ textAlign: 'left' }}>Nu er det bare at begynde - velkommen! Hvis du har problemer eller spørgsmål, er vi tilgængelige via livechat. Knappen finder du i bunden til venstre.</div>,
    locale: localeSteps,
    target: '.react-flow__pane',
  },
];
