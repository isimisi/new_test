import React, { useCallback, useEffect, useRef, useState } from "react";

import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import { encryptId, getId } from "@api/constants";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import Notification from "@components/Notification/Notification";
import { reducer } from "./constants";
import { useAuth0, User } from "@auth0/auth0-react";
import useStyles from "./timeline-jss";
import {
  changeHandleVisability,
  closeNotifAction
} from "./reducers/timelineActions";
import ReactFlow, {
  Background,
  BackgroundVariant,
  OnLoadParams,
  PanOnScrollMode
} from "react-flow-renderer";
import { getPlanId } from "@helpers/userInfo";
import Collaboration from "@components/Flow/Actions/Collaborations";
import Meta from "@components/Flow/Actions/Meta";
import Items from "@components/Flow/Actions/Items";
import Controls from "@components/Flow/Actions/Controls";
import { useTheme } from "@material-ui/core/styles";
import Loader from "@components/Loading/LongLoader";
import { handleExport } from "@helpers/export/handleExport";
import { workspacePowerpoint } from "../Workspaces/reducers/workspaceActions";
import {
  openMenuAction,
  closeMenuAction,
  toggleAction
} from "@redux/actions/uiActions";
import Views from "@components/Flow/Actions/Views";
import Drawer from "@material-ui/core/Drawer";
import classnames from "classnames";
import HorizontalNode from "@components/Timeline/Nodes/HorizontalNode";
import AddItemNode from "@components/Timeline/Nodes/AddItemNode";
import EdgeWithButton from "@components/Timeline/Edges/EdgeWithButton";
import useWindowDimensions from "@hooks/useWindowDiemensions";
import "./timeline.css";
import Table from "@components/Timeline/Drawer/Table";

const BASE_BG_GAP = 32;
const BASE_BG_STROKE = 1;

const nodeTypes = {
  horizontal: HorizontalNode,
  addItem: AddItemNode
};

const edgeTypes = {
  custom: EdgeWithButton
};

const elements = [
  {
    id: "ewb-1",
    type: "horizontal",
    data: { label: "27/04/22" },
    position: { x: 250, y: 0 }
  },
  {
    id: "ewb-2",
    data: { label: "27/05/22" },
    position: { x: 550, y: 0 },
    type: "horizontal"
  },
  {
    id: "edge-1-2",
    source: "ewb-1",
    target: "ewb-2",
    type: "custom"
  },
  {
    id: "edge-2-3",
    source: "ewb-2",
    target: "ewb-3",
    type: "custom"
  },
  {
    id: "ewb-3",
    type: "horizontal",
    data: { label: "27/04/22" },
    position: { x: 850, y: 0 }
  },
  {
    id: "ewb-4",
    data: { label: "27/05/22" },
    position: { x: 1150, y: 0 },
    type: "horizontal"
  },
  {
    id: "edge-3-4",
    source: "ewb-3",
    target: "ewb-4",
    type: "custom"
  },
  {
    id: "ewb-5",
    data: {},
    position: { x: 1450, y: 0 },
    type: "addItem"
  },
  {
    id: "edge-4-5",
    source: "ewb-4",
    target: "ewb-5",
    type: "custom"
  }
];

const Timeline = () => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const messageNotif = useAppSelector(state => state[reducer].get("message"));
  const history = useHistory();
  const id = getId(history) as string;
  const user = useAuth0().user as User;
  const plan_id = getPlanId(user);
  const { t } = useTranslation();

  // refs
  const reactFlowContainer = useRef(null);

  // state
  const [metaOpen, setMetaOpen] = useState(false);
  const [rfInstance, setRfInstance] = useState<OnLoadParams | null>(null);
  const [currentZoom, setCurrentZoom] = useState(1);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [snapToGrid, setSnapToGrid] = useState(false);
  const [openTableView, setOpenTableView] = useState(false);

  const { height: windowHeight } = useWindowDimensions();

  const handleOpenTableView = () => {
    setOpenTableView(prevState => !prevState);
  };

  // redux selector
  // const elements = useAppSelector(state =>
  //   state[reducer].get("elements")
  // ).toJS();
  const handleVisability = useAppSelector(state =>
    state[reducer].get("handleVisability")
  );
  const initialLoading = useAppSelector(state =>
    state[reducer].get("initialLoading")
  );
  const label = useAppSelector(state => state[reducer].get("label"));

  const handleVisabilityChange = () =>
    dispatch(changeHandleVisability(!handleVisability));
  const handleImage = (type, _stopLoading) =>
    handleExport(type, reactFlowContainer, label, _stopLoading);
  const handlePowerpoint = _stopLoading => {
    id &&
      dispatch(workspacePowerpoint(user, id, label, elements, _stopLoading));
  };
  const toggleSubMenu = () => dispatch(toggleAction);

  const onLoad = _reactFlowInstance => {
    setRfInstance(_reactFlowInstance);
    _reactFlowInstance.fitView();
  };

  const onSave = useCallback(() => {
    if (rfInstance) {
      console.log("sbdj");
    }
  }, [rfInstance, user]);

  const onMouseLeave = useCallback(() => {
    onSave();
  }, [rfInstance, elements]);

  useEffect(() => {
    dispatch(closeMenuAction);

    return () => {
      dispatch(openMenuAction);
    };
  }, [user]);

  return (
    <div style={{ display: "flex" }}>
      <Notification
        close={() => dispatch(closeNotifAction)}
        message={messageNotif}
      />
      <div
        className={classnames(classes.root, {
          [classes.contentShift]: openTableView
        })}
        ref={reactFlowContainer}
        onMouseLeave={onMouseLeave}
      >
        <ReactFlow
          elements={elements}
          minZoom={0.3}
          maxZoom={3}
          panOnScroll
          translateExtent={[
            [Number.NEGATIVE_INFINITY, -(windowHeight || 1000) / 1.5],
            [Number.POSITIVE_INFINITY, (windowHeight || 1000) / 1.5]
          ]}
          panOnScrollMode={PanOnScrollMode.Horizontal}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onMove={flowTransform => {
            if (flowTransform) {
              setCurrentZoom(flowTransform.zoom);
            }
          }}
          onLoad={onLoad}
        >
          <div data-html2canvas-ignore="true">
            <Collaboration setShareModalOpen={setShareModalOpen} />
            <Meta
              label={label}
              setMetaOpen={setMetaOpen}
              handleVisabilityChange={handleVisabilityChange}
              handlePowerpoint={handlePowerpoint}
              handleVisability={handleVisability}
              elements={elements}
              handleOpenMenu={toggleSubMenu}
              handleImage={handleImage}
            />
            <Views openTableView={handleOpenTableView} />
            <Controls
              currentZoom={currentZoom}
              reactFlowInstance={rfInstance}
            />
          </div>

          {handleVisability && (
            <Background
              variant={BackgroundVariant.Lines}
              gap={BASE_BG_GAP / currentZoom}
              size={BASE_BG_STROKE / currentZoom / 2}
              color="#dadcdf"
            />
          )}
        </ReactFlow>
        {initialLoading && (
          <>
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: theme.palette.background.default,
                position: "absolute",
                zIndex: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Loader bigFont />
            </div>
          </>
        )}
      </div>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={openTableView}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <Table />
      </Drawer>
    </div>
  );
};

export default Timeline;
