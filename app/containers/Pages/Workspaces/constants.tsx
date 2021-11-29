/* eslint-disable no-param-reassign */
import React from 'react';
import Button from '@material-ui/core/Button';
import {
  isNode, Position, FlowElement
} from 'react-flow-renderer';
import dagre from 'dagre';
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import CheckIcon from '@material-ui/icons/Check';
import Chip from '@material-ui/core/Chip';

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

  return elements.map((el: FlowElement) => {
    if (isNode(el)) {
      const nodeWithPosition = dagreGraph.node(el.id);
      el.targetPosition = isHorizontal ? Position.Left : Position.Top;
      el.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;

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

export const columns = (t) => [
  {
    name: t('workspaces.table_title'),
    options: {
      filter: true,
      filterOptions: {
        renderValue: v => v.split('∉')[0]
      },
      customFilterListOptions: {
        render: v => v.split('∉')[0]
      },
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
    name: t('workspaces.table_desc'),
    options: {
      filter: true,
    }
  },
  {
    name: t('workspaces.tags'),
    options: {
      filter: false,
      filterList: [],
      filterOptions: {
        logic: (tags, filters) => {
          const mappedTags = tags.map(tag => (`${tag.tag.emoji ? tag.tag.emoji : ''} ${tag.tag.name}`));
          return !filters.every(tag => mappedTags.includes(tag));
        }
      },
      sort: false,
      customBodyRender: (tags) => Array.isArray(tags) && tags.map(tag => (<Chip key={tag.id} style={{ margin: 2 }} size="small" label={`${tag.tag.emoji ? tag.tag.emoji : ''} ${tag.tag.name}`} />))
    }
  },
  {
    name: t('workspaces.table_groups'),
    options: {
      filter: true,
    }
  },
  {
    name: '',
    options: {
      filter: false,
      sort: false,
      viewColumns: false,
      customBodyRender: (value) => (
        <Tooltip title={!value ? 'Dine arbejdsområder bliver låst efter 90 dage på base' : 'Gå til arbejdsområde'}>
          <Link to={!value ? '/app/plan' : `/app/workspaces/${value}`} style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="secondary" disabled={!value}>
              {!value ? 'Låst' : t('workspaces.btn_open')}
            </Button>
          </Link>
        </Tooltip>
      )
    }
  },
  {
    name: t('workspaces.table_created'),
    options: {
      filter: true,
    }
  },
  {
    name: t('workspaces.last_changed'),
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

export const steps = (t) => [
  {
    content: <h2>{t('workspaces.welcome_to_the_work_area')}</h2>,
    locale: localeSteps,
    placement: 'center',
    target: 'body',
  },
  {
    target: '.floatingPanel',
    content: t('workspaces.describing_the_work_area'),
    locale: localeSteps,
    disableBeacon: true,
    disableOverlayClose: true,
    hideCloseButton: true,
    hideFooter: true,
    spotlightClicks: true,
  },
  {
    content: <div style={{ textAlign: 'left' }}>{t('workspaces.insert_text_boxes_and_notes')}</div>,
    locale: localeSteps,
    target: '.rtf--mb:nth-of-type(1)',
  },
  {
    content: <div style={{ textAlign: 'left' }}>{t('workspaces.insert_elements')}</div>,
    locale: localeSteps,
    target: '.rtf:nth-of-type(2) > li > button',
  },
  {
    content: <div style={{ textAlign: 'left' }}>{t('workspaces.other_functions')}</div>,
    locale: localeSteps,
    target: '.rtf--ab__c:nth-of-type(1)',
    disableBeacon: true,
  },
  {
    content: <div style={{ textAlign: 'left' }}>{t('workspaces.change_name_description_and_group')}</div>,
    locale: localeSteps,
    target: '.rtf--ab__c:nth-of-type(2)',
    disableBeacon: true,
  },
  {
    content: <div style={{ textAlign: 'left' }}>{t('workspaces.press_analyze_btn_to_create_a_note_or_report')}</div>,
    locale: localeSteps,
    target: '.rtf--ab__c:nth-of-type(3)',
    disableBeacon: true,
  },
  {
    content: <div style={{ textAlign: 'left' }}>{t('workspaces.get_a_full_overview_of_red_flags')}</div>,
    locale: localeSteps,
    target: '.rtf--ab__c:nth-of-type(4)',
    disableBeacon: true,
  },
  {
    content: <div style={{ textAlign: 'left' }}>{t('workspaces.share_workspace_with_non_juristic_user')}</div>,
    locale: localeSteps,
    target: '.rtf--ab__c:nth-of-type(5)',
    disableBeacon: true,
  },
  {
    content: <div style={{ textAlign: 'left' }}>{t('workspaces.connected_juristic_to_cvr_in_dk_swe_no_fi')}</div>,
    locale: localeSteps,
    target: '.rtf--ab__c:nth-of-type(6)',
    disableBeacon: true,
    disableOverlayClose: true,
    hideCloseButton: true,
    hideFooter: true,
    spotlightClicks: true,
  },
  // {
  //   content: <div style={{ textAlign: 'left' }}>Hvis du ikke kan finde din tegning eller dit diagram, kan du trykke her for at centrere visningen!</div>,
  //   locale: localeSteps,
  //   target: '.react-flow__controls-fitview',
  // },
  // {
  //   content: <div style={{ textAlign: 'left' }}>Download koncerndiagrammet eller tegningen ved at trykke her - husk, det er kun det, du kan se på din skærm, der downloades!</div>,
  //   locale: localeSteps,
  //   target: '.react-flow__controls-button:nth-of-type(5)',
  // },
  // {
  //   content: <div style={{ textAlign: 'left' }}>Og til slut kan du trykke her for at skjule hjælpestreger m.v. fra arbejdsområdet - eller slå dem til igen.</div>,
  //   locale: localeSteps,
  //   target: '.react-flow__controls-button:nth-of-type(6)',
  // },
  // {
  //   content: <div style={{ textAlign: 'left' }}>Nu er det bare at begynde - velkommen! Hvis du har problemer eller spørgsmål, er vi tilgængelige via livechat. Knappen finder du i bunden til venstre.</div>,
  //   locale: localeSteps,
  //   target: '.react-flow__pane',
  // },
];
