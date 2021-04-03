import React, { useEffect } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useSelector, useDispatch, } from 'react-redux';
import {
  NodeDemo, NodeStyling, NodeForm, Notification
} from '@components';
import {
  useHistory
} from 'react-router-dom';
import { putNode, showNode, closeNotifAction } from './reducers/nodeActions';
import { reducer, generateNodeStyle } from './constants';

const Node = () => {
  const dispatch = useDispatch();
  const messageNotif = useSelector(state => state.getIn([reducer, 'message']));
  const history = useHistory();
  const theme = useTheme();
  const id = history.location.pathname.split('/').pop();
  const title = useSelector(state => state.getIn([reducer, 'title']));
  const description = useSelector(state => state.getIn([reducer, 'description']));
  const type = useSelector(state => state.getIn([reducer, 'type']));
  const groupId = null;
  // venter lidt med gruppen
  // const group_id = useSelector(state => state.getIn([reducer, 'group_id']));

  // generate style object
  const size = useSelector(state => state.getIn([reducer, 'size']));
  const backgroundColor = useSelector(state => state.getIn([reducer, 'backgroundColor']));
  const borderColor = useSelector(state => state.getIn([reducer, 'borderColor']));
  const nodeStyle = generateNodeStyle(size, backgroundColor.toJS(), borderColor.toJS(), theme);

  const onSave = () => {
    dispatch(putNode(id, title, description, type, groupId, nodeStyle, history));
  };

  useEffect(() => {
    dispatch(showNode(id));
  }, []);

  return (
    <div>
      <Notification close={() => dispatch(closeNotifAction)} message={messageNotif} />
      <Grid container spacing={1}>
        <Grid item md={4}>
          <NodeForm />
        </Grid>
        <Grid item md={4}>
          <NodeDemo />
        </Grid>
        <Grid item md={4}>
          <NodeStyling />
        </Grid>
      </Grid>
      <Tooltip title="Save">
        <Fab
          variant="extended"
          color="primary"
          style={{
            position: 'fixed',
            bottom: 30,
            right: 50,
            zIndex: 100,
          }}
          onClick={onSave}
        >
            Save Node
        </Fab>
      </Tooltip>
    </div>
  );
};

export default Node;
