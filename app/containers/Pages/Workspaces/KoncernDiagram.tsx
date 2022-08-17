/* eslint-disable react/no-unescaped-entities */
/* eslint-disable new-cap */
/* eslint-disable camelcase */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import React, { useState, useEffect, useRef, useCallback } from "react";
import { withStyles, useTheme } from "@material-ui/core/styles";
import ReactFlow, {
  Background,
  ConnectionMode,
  BackgroundVariant,

} from "react-flow-renderer10";
import { useTranslation } from 'react-i18next';
import Collaboration from '@components/Flow/Actions/Collaborations';
import Grid from "@material-ui/core/Grid";
import { useHistory, useLocation } from "react-router-dom";
import Notification from "@components/Notification/Notification";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import DialogTitle from "@material-ui/core/DialogTitle";
import { getId } from "@api/constants";
import Loader from "@components/Loading/LongLoader";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import styles from "../../../components/Workspace/workspace-jss";
import { reducer, initErstTypes, BASE_BG_STROKE, BASE_BG_GAP, proOptions } from "./constants";
import {
  cvrWorkspacePublic,
  closeNotifAction,
  changeHandleVisability,
} from "./reducers/workspaceActions";
import "./workspace.css";
import { useAuth0, User } from "@auth0/auth0-react";

import useMove from "@hooks/flow/useMove";
import useInit from "@hooks/flow/useInit";
import { useAppSelector, useAppDispatch } from "@hooks/redux";
import useCvr from "@hooks/workspace/useCvr";
import useChangeElements from "@hooks/workspace/useChangeElements";
import CustomNode from "@components/Workspace/Node/CustomNode";
import Meta from "@components/Flow/Actions/Meta10";
import useMeta from "@hooks/flow/useMeta";
import Controls from "@components/Flow/Actions/Controls10";

const nodeTypes = {
  custom: CustomNode,
};

const Workspace = props => {
  const { classes } = props;
  const dispatch = useAppDispatch();
  const history = useHistory();
  const user = useAuth0().user as User;
  const { t } = useTranslation();

  const theme = useTheme();
  const id = getId(history);
  const { search } = useLocation();
  const cvr = new URLSearchParams(search).get("cvr");
  const messageNotif = useAppSelector(state => state[reducer].get("message"));

  const reactFlowContainer = useRef(null);
  const nodeElements = useAppSelector(state => state[reducer].get("nodeElements")).toJS();
  const edgeElements = useAppSelector(state => state[reducer].get("edgeElements")).toJS();
  const handleVisability = useAppSelector(state => state[reducer].get('handleVisability'));

  const [openRegisterModal, setOpenRegisterModal] = useState(false);

  const [loading, setLoading] = useState(true);


  const { onMove, currentZoom } = useMove();
  const { onInit, rfInstance } = useInit();

  const cvrFinish = () => {
    setLoading(false);
  };

  const { subscription } = useCvr(
    dispatch,
    useAppSelector,
    id as string,
    t,
    user,
    undefined,
    undefined,
    undefined,
    cvrFinish
  );


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

  const handleVisabilityChange = useCallback(
    () => dispatch(changeHandleVisability(!handleVisability)),
    [handleVisability]
  );

  const handleActions = () => {
    setOpenRegisterModal(true);
  };

  const handleCloseActions = () => {
    setOpenRegisterModal(false);
  };


  const { onNodesChange, onEdgesChange } = useChangeElements(dispatch, nodeElements, edgeElements);

  const { handleAutoLayout, handleImage, snapToGrid, setSnapToGrid } = useMeta(dispatch, nodeElements, edgeElements, reactFlowContainer, cvr || "download");

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
          proOptions={proOptions}
          edges={edgeElements}
          nodes={nodeElements}
          onNodesDelete={handleActions}
          onEdgesDelete={handleActions}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={handleActions}
          ref={reactFlowContainer}
          minZoom={0.3}
          maxZoom={3}
          nodeTypes={nodeTypes}
          onMove={onMove}
          onInit={onInit}
          connectionMode={ConnectionMode.Loose}
          onNodeClick={handleActions}
          onEdgeClick={handleActions}
          snapToGrid={snapToGrid}
          snapGrid={[BASE_BG_GAP / currentZoom, BASE_BG_GAP / currentZoom]}
        >
          <div data-html2canvas-ignore="true">
            <Collaboration />
            <Meta
              label={cvr || ""}
              setMetaOpen={handleActions}
              handleVisabilityChange={handleVisabilityChange}
              handlePowerpoint={handleActions}
              handleVisability={handleVisability}
              handleExcel={handleActions}
              loadingExcel={false}
              setSnapToGrid={setSnapToGrid}
              snapToGrid={snapToGrid}
              handleAutoLayout={handleAutoLayout}
              handleOpenMenu={handleActions}
              handleImage={handleImage}
              backLink="/app"
            />
            <Controls currentZoom={currentZoom} reactFlowInstance={rfInstance} />

          </div>

          {handleVisability && <Background
            variant={BackgroundVariant.Lines}
            gap={BASE_BG_GAP / currentZoom}
            size={BASE_BG_STROKE / currentZoom}
          />}
        </ReactFlow>

      </div>

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
    </div>
  );
};

Workspace.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Workspace);
