/* eslint-disable new-cap */
/* eslint-disable camelcase */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import React, {
  useState, useEffect, useRef
} from 'react';
import { withStyles, useTheme } from '@material-ui/core/styles';
import ReactFlow, {
  Controls,
  MiniMap,
  ControlButton,
  Background,
  ConnectionMode,
  BackgroundVariant
} from 'react-flow-renderer';
import logoBeta from '@images/logoBeta.svg';
import brand from '@api/dummy/brand';
import {
  Link,
  useHistory, useLocation
} from 'react-router-dom';
import {
  WorkspaceFabs, CustomNode, StickyNoteNode, CustomEdge, Notification
} from '@components';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useScreenshot, createFileName } from 'use-react-screenshot';
import { getId } from '@api/constants';
import connection from '@api/socket/SocketConnection';
import Loader from '@api/ui/Loader';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import styles from '../../../components/Workspace/workspace-jss';
import { reducer, getLayoutedElements, initErstTypes } from './constants';
import {
  cvrSuccess, cvrWorkspacePublic, closeNotifAction
} from './reducers/workspaceActions';
import './workspace.css';


const nodeTypes = {
  custom: CustomNode,
  sticky: StickyNoteNode
};
const BASE_BG_GAP = 32;
const BASE_BG_STROKE = 1;


const Workspace = (props) => {
  const { classes } = props;
  const dispatch = useDispatch();
  const history = useHistory();

  const theme = useTheme();
  const id = getId(history);
  const { search } = useLocation();
  const cvr = new URLSearchParams(search).get('cvr');
  const messageNotif = useSelector(state => state[reducer].get('message'));
  const reactFlowContainer = useRef(null);
  const [image, takeScreenShot] = useScreenshot();
  const [currentZoom, setCurrentZoom] = useState(1);
  const elements = useSelector(state => state[reducer].get('elements')).toJS();
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rfInstance, setRfInstance] = useState(null);


  const handleCvrSuccess = (el) => {
    dispatch(cvrSuccess(getLayoutedElements(el)));
    setLoading(false);

    if (rfInstance) {
      rfInstance.fitView();
    }
  };

  useEffect(() => {
    connection.connect();

    // storing the subscription in the global variable
    // passing the incoming data handler fn as a second argument

    const sub = connection.subscribeToCvr('cvr:' + id, handleCvrSuccess);
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
      dispatch(cvrWorkspacePublic(id, cvr, initErstTypes));
    }
  }, [subscription]);


  const onLoad = (_reactFlowInstance) => {
    setRfInstance(_reactFlowInstance);
    _reactFlowInstance.fitView();
  };


  const flowStyle = {
    backgroundColor: 'white'
  };


  useEffect(() => {
    if (image) {
      const a = document.createElement('a');
      a.href = image;
      a.download = createFileName('jpg', cvr);
      a.click();
    }
  }, [image]);

  const handleActions = () => {
    setOpenRegisterModal(true);
  };

  const handleCloseActions = () => {
    setOpenRegisterModal(false);
  };

  return (
    <div>
      <Notification close={() => dispatch(closeNotifAction)} message={messageNotif} />
      {loading && (
        <div className={classes.publicLoader}>
          <Loader bigFont />
        </div>
      )}
      <div className={classes.canvasRoot} ref={reactFlowContainer}>

        <ReactFlow
          elements={elements}
          onElementsRemove={handleActions}
          onConnect={handleActions}
          minZoom={0.3}
          maxZoom={3}
          style={flowStyle}
          nodeTypes={nodeTypes}
          onMove={(flowTransform) => {
            if (flowTransform) {
              setCurrentZoom(flowTransform.zoom);
            }
          }}
          edgeTypes={{ custom: CustomEdge }}
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
              <ControlButton onClick={() => {
                takeScreenShot(reactFlowContainer?.current);
              }}
              >
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
        <a
          href="http://koncerndiagrammer.dk/"
          className={classes.logo}
        >
          <img className={classes.img} src={logoBeta} alt={brand.name} />
        </a>

      </div>
      <WorkspaceFabs
        nodeClick={handleActions}
        stickyClick={handleActions}
        noAdd
      />
      <Dialog open={openRegisterModal} onClose={handleCloseActions} aria-labelledby="form-dialog-title" fullWidth>
        <DialogTitle id="form-dialog-title">Opret en gratis bruger</DialogTitle>
        <DialogContent>
          <Typography>
            Det ser ikke ud som om, at du er logget ind. Med en bruger kan du gemme søgninger, se selskabsinformationer fra CVR og meget mere.
          </Typography>

          <div className={classes.packageContainter}>
            <div className={classes.package}>
              <div
                className={classes.center}
                style={{
                  backgroundColor: '#C9D2CB', borderTopRightRadius: 10, borderTopLeftRadius: 10
                }}
              >
                <Typography className={classes.packageHeader}>
                  Uden bruger
                </Typography>
              </div>
              <div className={classes.packageContent}>

                <div className={classes.packageBullets}>
                  <Typography className={classes.bulletText}>
                    <CheckIcon fontSize="inherit" color="secondary" className={classes.textIcon} />
                  Koncerndiagrammer
                  </Typography>
                  <Typography className={classes.bulletText}>
                    <ClearIcon fontSize="inherit" color="error" className={classes.textIcon} />
                  Gem 10 søgninger
                  </Typography>
                  <Typography className={classes.bulletText}>
                    <ClearIcon fontSize="inherit" color="error" className={classes.textIcon} />
                  Selskabsdata
                  </Typography>
                  <Typography className={classes.bulletText}>
                    <ClearIcon fontSize="inherit" color="error" className={classes.textIcon} />
                  Regnskabstal (beta)
                  </Typography>
                </div>
              </div>
            </div>

            <div className={classes.package}>
              <div
                className={classes.center}
                style={{
                  backgroundColor: '#4B5E6D', borderTopRightRadius: 10, borderTopLeftRadius: 10
                }}
              >
                <Typography className={classes.packageHeader}>
                  Med gratis bruger
                </Typography>
              </div>
              <div className={classes.packageContent}>

                <div className={classes.packageBullets}>
                  <Typography className={classes.bulletText}>
                    <CheckIcon fontSize="inherit" color="secondary" className={classes.textIcon} />
                  Koncerndiagrammer
                  </Typography>
                  <Typography className={classes.bulletText}>
                    <CheckIcon fontSize="inherit" color="secondary" className={classes.textIcon} />
                  Gem 10 søgninger
                  </Typography>
                  <Typography className={classes.bulletText}>
                    <CheckIcon fontSize="inherit" color="secondary" className={classes.textIcon} />
                  Selskabsdata
                  </Typography>
                  <Typography className={classes.bulletText}>
                    <CheckIcon fontSize="inherit" color="secondary" className={classes.textIcon} />
                  Regnskabstal (beta)
                  </Typography>
                </div>
              </div>
            </div>

          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseActions} color="primary">
            Nej tak
          </Button>
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <Button color="primary" variant="contained">
            Opret GRATIS bruger
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
};

Workspace.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Workspace);
