/* eslint-disable react/no-unescaped-entities */
/* eslint-disable new-cap */
/* eslint-disable camelcase */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import React, { useState, useEffect, useRef } from "react";
import { withStyles, useTheme } from "@material-ui/core/styles";
import ReactFlow, {
  Controls,
  MiniMap,
  ControlButton,
  Background,
  ConnectionMode,
  BackgroundVariant,
  OnLoadParams
} from "react-flow-renderer";
import logoBeta from "@images/logoBeta.svg";
import brand from "@api/ui/brand";
import Grid from "@material-ui/core/Grid";
import { Link, useHistory, useLocation } from "react-router-dom";
import Notification from "@components/Notification/Notification";
import CustomNode from "@components/Workspace/Node/CustomNode";
import StickyNoteNode from "@components/Workspace/Node/StickyNoteNode";
import WorkspaceFabs from "@components/Workspace/Public/WorkspaceFabs";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import Checkbox from "@material-ui/core/Checkbox";

import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import DialogTitle from "@material-ui/core/DialogTitle";
import { getId } from "@api/constants";
import connection from "@api/socket/SocketConnection";
import Loader from "@components/Loading/LongLoader";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import styles from "../../../components/Workspace/workspace-jss";
import { reducer, getLayoutedElementsOld, initErstTypes } from "./constants";
import {
  cvrSuccess,
  cvrWorkspacePublic,
  closeNotifAction,
  firstPublicVisit
} from "./reducers/workspaceActions";
import "./workspace.css";
import { useAuth0, User } from "@auth0/auth0-react";
import { handleExport } from "@helpers/export/handleExport";

const nodeTypes = {
  custom: CustomNode,
  sticky: StickyNoteNode
};
const BASE_BG_GAP = 32;
const BASE_BG_STROKE = 1;

const Workspace = props => {
  const { classes } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useAuth0();

  const theme = useTheme();
  const id = getId(history);
  const { search } = useLocation();
  const cvr = new URLSearchParams(search).get("cvr");
  const messageNotif = useSelector(state => state[reducer].get("message"));
  const hasVisitedPublic = useSelector(state =>
    state[reducer].get("hasVisitedPublic")
  );

  const reactFlowContainer = useRef(null);
  const [currentZoom, setCurrentZoom] = useState(1);
  const elements = useSelector(state => state[reducer].get("elements")).toJS();
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [showInitModal, setShowInitModal] = useState(false);
  const [showAgain, setShowAgain] = useState(false);
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [rfInstance, setRfInstance] = useState<OnLoadParams | null>(null);

  const handleCvrSuccess = el => {
    dispatch(cvrSuccess(getLayoutedElementsOld(el)));
    setLoading(false);
    setShowInitModal(!hasVisitedPublic);
    if (rfInstance) {
      rfInstance.fitView();
    }
  };

  useEffect(() => {
    connection.connect(user);

    // storing the subscription in the global variable
    // passing the incoming data handler fn as a second argument

    const sub = connection.subscribeToCvr("cvr:" + id, handleCvrSuccess);
    setSubscription(sub);

    // Specify how to clean up after this effect:
    return function cleanup() {
      if (subscription) {
        subscription.close();
      }
    };
  }, []);

  useEffect(() => {
    if (subscription) {
      dispatch(
        cvrWorkspacePublic(
          user as User,
          id as string,
          cvr as string,
          initErstTypes
        )
      );
    }
  }, [subscription, user]);

  const onLoad = _reactFlowInstance => {
    setRfInstance(_reactFlowInstance);
    _reactFlowInstance.fitView();
  };

  const flowStyle = {
    backgroundColor: "white"
  };

  const handleActions = () => {
    setOpenRegisterModal(true);
  };

  const handleCloseActions = () => {
    setOpenRegisterModal(false);
  };

  const handleCloseActionInitModal = () => {
    setShowInitModal(false);
    if (showAgain) {
      dispatch(firstPublicVisit);
    }
  };

  const handleShowAgain = e => {
    setShowAgain(e.target.checked);
  };

  const handleImage = () => handleExport("image", reactFlowContainer, cvr);

  return (
    <div>
      <Notification
        close={() => dispatch(closeNotifAction)}
        message={messageNotif}
      />
      {loading && (
        <div className={classes.publicLoader}>
          <Loader bigFont />
        </div>
      )}
      <div className={classes.canvasRoot}>
        <ReactFlow
          elements={elements}
          onElementsRemove={handleActions}
          onConnect={handleActions}
          ref={reactFlowContainer}
          minZoom={0.3}
          maxZoom={3}
          style={flowStyle}
          nodeTypes={nodeTypes}
          onMove={flowTransform => {
            if (flowTransform) {
              setCurrentZoom(flowTransform.zoom);
            }
          }}
          onLoad={onLoad}
          connectionMode={ConnectionMode.Loose}
          onElementClick={handleActions}
        >
          <div data-html2canvas-ignore="true">
            <MiniMap
              nodeStrokeWidth={3}
              nodeColor={theme.palette.secondary.light}
              style={{ top: 0, right: 0 }}
            />
          </div>
          <div data-html2canvas-ignore="true">
            <Controls className={classes.controls}>
              <ControlButton onClick={handleImage}>
                <PhotoCameraIcon />
              </ControlButton>
            </Controls>
          </div>
          <Background
            variant={BackgroundVariant.Lines}
            gap={BASE_BG_GAP / currentZoom}
            size={BASE_BG_STROKE / currentZoom}
          />
        </ReactFlow>
        <a href="http://koncerndiagrammer.dk/" className={classes.logo}>
          <img className={classes.img} src={logoBeta} alt={brand.name} />
        </a>
      </div>
      <WorkspaceFabs
        nodeClick={handleActions}
        stickyClick={handleActions}
        noAdd
      />
      <Dialog
        open={openRegisterModal}
        onClose={handleCloseActions}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Opret en gratis bruger</DialogTitle>
        <DialogContent>
          <Typography>
            Det ser ikke ud som om, at du er logget ind. Med en bruger kan du
            gemme søgninger, se selskabsinformationer fra CVR og meget mere.
          </Typography>

          <Grid
            container
            justifyContent="space-around"
            className={classes.packageContainter}
            spacing={2}
          >
            <Grid item sm={5} xs={12} className={classes.package}>
              <div
                className={classes.center}
                style={{
                  backgroundColor: theme.palette.primary.main,
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10
                }}
              >
                <Typography className={classes.packageHeader}>
                  Uden bruger
                </Typography>
              </div>
              <div className={classes.packageContent}>
                <div className={classes.packageBullets}>
                  <Typography className={classes.bulletText}>
                    <CheckIcon
                      fontSize="inherit"
                      className={classes.textIcon}
                    />
                    Koncerndiagrammer
                  </Typography>
                  <Typography className={classes.bulletText}>
                    <ClearIcon
                      fontSize="inherit"
                      className={classes.textIconError}
                    />
                    Gem 50 søgninger
                  </Typography>
                  <Typography className={classes.bulletText}>
                    <ClearIcon
                      fontSize="inherit"
                      className={classes.textIconError}
                    />
                    Tegn og rediger data
                  </Typography>
                  <Typography className={classes.bulletText}>
                    <ClearIcon
                      fontSize="inherit"
                      className={classes.textIconError}
                    />
                    Selskabsdata
                  </Typography>
                  <Typography className={classes.bulletText}>
                    <ClearIcon
                      fontSize="inherit"
                      className={classes.textIconError}
                    />
                    Regnskabstal (beta)
                  </Typography>
                </div>
              </div>
            </Grid>

            <Grid item sm={5} xs={12} className={classes.package}>
              <div
                className={classes.center}
                style={{
                  backgroundColor: theme.palette.primary.main,
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10
                }}
              >
                <Typography className={classes.packageHeader}>
                  Med gratis bruger
                </Typography>
              </div>
              <div className={classes.packageContent}>
                <div className={classes.packageBullets}>
                  <Typography className={classes.bulletText}>
                    <CheckIcon
                      fontSize="inherit"
                      className={classes.textIcon}
                    />
                    Koncerndiagrammer
                  </Typography>
                  <Typography className={classes.bulletText}>
                    <CheckIcon
                      fontSize="inherit"
                      className={classes.textIcon}
                    />
                    Gem 50 søgninger
                  </Typography>
                  <Typography className={classes.bulletText}>
                    <CheckIcon
                      fontSize="inherit"
                      className={classes.textIcon}
                    />
                    Tegn og rediger data
                  </Typography>
                  <Typography className={classes.bulletText}>
                    <CheckIcon
                      fontSize="inherit"
                      className={classes.textIcon}
                    />
                    Selskabsdata
                  </Typography>
                  <Typography className={classes.bulletText}>
                    <CheckIcon
                      fontSize="inherit"
                      className={classes.textIcon}
                    />
                    Regnskabstal
                  </Typography>
                </div>
              </div>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseActions} color="primary">
            Nej tak
          </Button>

          <Button
            color="primary"
            variant="contained"
            onClick={() =>
              window.open("https://app.juristic.io/app", "_blank")?.focus()
            }
          >
            Opret GRATIS bruger
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showInitModal}
        onClose={handleCloseActionInitModal}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">
          Hurtig introduktion til Koncerndiagrammer
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            spacing={2}
            className={classes.packageContainter}
            style={{ marginTop: 20 }}
          >
            <Grid
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
              }}
              xs={12}
              sm={3}
              item
            >
              <div className={classes.nonCenteredRow}>
                <div className="react-flow__controls-button react-flow__controls-zoomin">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                    <path d="M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z" />
                  </svg>
                </div>
                <Typography
                  color="textSecondary"
                  className={classes.bulletText}
                  style={{ marginTop: 0 }}
                >
                  {" "}
                  Zoom ind
                </Typography>
              </div>
              <div className={classes.nonCenteredRow}>
                <div className="react-flow__controls-button react-flow__controls-zoomout">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 5">
                    <path d="M0 0h32v4.2H0z" />
                  </svg>
                </div>
                <Typography
                  color="textSecondary"
                  className={classes.bulletText}
                >
                  {" "}
                  Zoom ud
                </Typography>
              </div>
              <div className={classes.nonCenteredRow}>
                <div className="react-flow__controls-button react-flow__controls-fitview">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 30">
                    <path d="M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94a.919.919 0 01-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z" />
                  </svg>
                </div>
                <Typography
                  color="textSecondary"
                  className={classes.bulletText}
                >
                  {" "}
                  Centrer
                </Typography>
              </div>
              <div className={classes.nonCenteredRow}>
                <div className="react-flow__controls-button react-flow__controls-interactive">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 32">
                    <path d="M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z" />
                  </svg>
                </div>
                <Typography
                  color="textSecondary"
                  className={classes.bulletText}
                >
                  {" "}
                  Lås (op)
                </Typography>
              </div>
              <div className={classes.nonCenteredRow}>
                <div className="react-flow__controls-button">
                  <svg
                    className="MuiSvgIcon-root"
                    focusable="false"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="3.2" />
                    <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                  </svg>
                </div>
                <Typography
                  color="textSecondary"
                  className={classes.bulletText}
                  style={{ marginBottom: 0 }}
                >
                  {" "}
                  Download
                </Typography>
              </div>
            </Grid>
            <Grid xs={12} sm={9} item>
              Velkommen til Koncerndiagrammer.dk.
              <br />
              <br />
              Med "fjernbetjeningen" kan du styre diagrammet: zoom, centrer
              diagrammet, lås/lås op samt download.
              <br />
              <br />
              Funktionerne styrer du ved at anvende knapperne til venstre. Hvis
              du ikke kan finde dit koncerndiagram, så tryk på "Centrer".
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <div className={classes.row} style={{ marginRight: 10 }}>
            <Checkbox
              checked={showAgain}
              onChange={handleShowAgain}
              name="dont show"
              color="primary"
            />
            <Typography variant="subtitle2">Vis ikke igen</Typography>
          </div>
          <Button
            color="primary"
            variant="contained"
            onClick={handleCloseActionInitModal}
          >
            Luk
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

Workspace.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Workspace);
