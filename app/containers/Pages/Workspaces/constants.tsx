import React from "react";
import Button from "@material-ui/core/Button";
import { Position, isNode } from "react-flow-renderer";
import dagre from "dagre";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import CheckIcon from "@material-ui/icons/Check";
import Chip from "@material-ui/core/Chip";
import { TCustomNode, TCustomEdge } from "@customTypes/reducers/workspace";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

export const initialAttribut = {
  label: null,
  value: ""
};

export const proOptions = {
  // passing in the account property will enable hiding the attribution
  account: "paid-pro",
  // in combination with the account property, hideAttribution: true will remove the attribution
  hideAttribution: true
};

export const BASE_BG_GAP = 32;
export const BASE_BG_STROKE = 1;

export const getLayoutedElements = (
  nodes: TCustomNode[],
  edges: TCustomEdge[],
  direction = "TB"
) => {
  const nodeWidth = 172;
  const nodeHeight = 36;

  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = Position.Top;
    node.sourcePosition = Position.Bottom;

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2
    };

    return node;
  });

  return { nodes, edges };
};

export const columns = (t) => [
  {
    name: t("workspaces.table_title"),
    options: {
      filter: true,
      filterOptions: {
        renderValue: (v) => v.split("∉")[0]
      },
      customFilterListOptions: {
        render: (v) => v.split("∉")[0]
      },
      customBodyRender: (value) =>
        value.split("∉").map((v, i) => {
          if (i === 0) {
            return v;
          }
          if (v === "true") {
            return <CheckIcon style={{ color: "green", marginBottom: 20 }} />;
          }
          return "";
        })
    }
  },
  {
    name: t("workspaces.table_desc"),
    options: {
      filter: true
    }
  },
  {
    name: t("workspaces.tags"),
    options: {
      filter: false,
      filterList: [],
      filterOptions: {
        logic: (tags, filters) => {
          const mappedTags = tags.map(
            (tag) => `${tag.tag.emoji ? tag.tag.emoji : ""} ${tag.tag.name}`
          );
          return !filters.every((tag) => mappedTags.includes(tag));
        }
      },
      sort: false,
      customBodyRender: (tags) =>
        Array.isArray(tags) &&
        tags.map((tag) => (
          <Chip
            key={tag.id}
            style={{ margin: 2 }}
            size="small"
            label={`${tag.tag.emoji ? tag.tag.emoji : ""} ${tag.tag.name}`}
          />
        ))
    }
  },
  {
    name: t("workspaces.table_groups"),
    options: {
      filter: true
    }
  },
  {
    name: "",
    options: {
      filter: false,
      sort: false,
      viewColumns: false,
      customBodyRender: (value) => (
        <Tooltip
          title={
            !value
              ? t("workspaces.your_work_areas_will_be_locked")
              : t("workspaces.go_to_workspace")
          }
        >
          <Link
            to={!value ? "/app/plan" : `/app/workspaces/${value}`}
            style={{ textDecoration: "none" }}
          >
            <Button variant="contained" color="secondary" disabled={!value}>
              {!value ? "Låst" : t("workspaces.btn_open")}
            </Button>
          </Link>
        </Tooltip>
      )
    }
  },
  {
    name: t("workspaces.table_created"),
    options: {
      filter: true
    }
  },
  {
    name: t("workspaces.last_changed"),
    options: {
      filter: true
    }
  }
];

export const reducer = "workspace";

export interface ErstTypes {
  nodes: {
    VIRKSOMHED: string;
    PERSON: string;
  };
  edges: {
    EJERSKAB: string;
  };
}

export const initErstTypes = {
  nodes: {
    VIRKSOMHED: "Selskab",
    PERSON: "Person"
  },
  edges: {
    EJERSKAB: "Ejerskab"
  }
};

const localeSteps = (t) => [
  {
    skip: (
      <Button size="small" style={{ color: "#bbb" }}>
        {t("workspaces.split")}
      </Button>
    ),
    back: <div>{t("workspaces.previous")}</div>,
    next: <div>{t("workspaces.next")}</div>
  }
];

export const steps = (t) => [
  {
    content: <h2>{t("workspaces.welcome_to_the_work_area")}</h2>,
    locale: localeSteps,
    placement: "center",
    target: "body"
  },
  {
    target: ".floatingPanel",
    content: t("workspaces.describing_the_work_area"),
    locale: localeSteps,
    disableBeacon: true,
    disableOverlayClose: true,
    hideCloseButton: true,
    hideFooter: true,
    spotlightClicks: true
  },
  {
    content: (
      <div style={{ textAlign: "left" }}>
        {t("workspaces.insert_text_boxes_and_notes")}
      </div>
    ),
    locale: localeSteps,
    target: ".rtf--mb:nth-of-type(1)"
  },
  {
    content: (
      <div style={{ textAlign: "left" }}>{t("workspaces.insert_elements")}</div>
    ),
    locale: localeSteps,
    target: ".rtf:nth-of-type(2) > li > button"
  },
  {
    content: (
      <div style={{ textAlign: "left" }}>{t("workspaces.other_functions")}</div>
    ),
    locale: localeSteps,
    target: ".rtf--ab__c:nth-of-type(1)",
    disableBeacon: true
  },
  {
    content: (
      <div style={{ textAlign: "left" }}>
        {t("workspaces.change_name_description_and_group")}
      </div>
    ),
    locale: localeSteps,
    target: ".rtf--ab__c:nth-of-type(2)",
    disableBeacon: true
  },
  {
    content: (
      <div style={{ textAlign: "left" }}>
        {t("workspaces.press_analyze_btn_to_create_a_note_or_report")}
      </div>
    ),
    locale: localeSteps,
    target: ".rtf--ab__c:nth-of-type(3)",
    disableBeacon: true
  },
  {
    content: (
      <div style={{ textAlign: "left" }}>
        {t("workspaces.get_a_full_overview_of_red_flags")}
      </div>
    ),
    locale: localeSteps,
    target: ".rtf--ab__c:nth-of-type(4)",
    disableBeacon: true
  },
  {
    content: (
      <div style={{ textAlign: "left" }}>
        {t("workspaces.share_workspace_with_non_juristic_user")}
      </div>
    ),
    locale: localeSteps,
    target: ".rtf--ab__c:nth-of-type(5)",
    disableBeacon: true
  },
  {
    content: (
      <div style={{ textAlign: "left" }}>
        {t("workspaces.connected_juristic_to_cvr_in_dk_swe_no_fi")}
      </div>
    ),
    locale: localeSteps,
    target: ".rtf--ab__c:nth-of-type(6)",
    disableBeacon: true,
    disableOverlayClose: true,
    hideCloseButton: true,
    hideFooter: true,
    spotlightClicks: true
  }
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
