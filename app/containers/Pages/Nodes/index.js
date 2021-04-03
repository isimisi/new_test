import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import { useSelector, useDispatch } from 'react-redux';
import { Notification } from '@components';
import {
  useHistory
} from 'react-router-dom';
import {
  tableColumns, tableOptions, reducer
} from './constants';
import styles from './node-jss';
import { getNodes, postNode, closeNotifAction } from './reducers/nodeActions';

function Nodes(props) {
  const { classes } = props;
  const dispatch = useDispatch();
  const nodes = useSelector(state => state.getIn([reducer, 'nodes']));
  const messageNotif = useSelector(state => state.getIn([reducer, 'message']));
  const history = useHistory();

  useEffect(() => {
    dispatch(getNodes());
  }, []);

  return (
    <div className={classes.table}>
      <Notification close={() => dispatch(closeNotifAction)} message={messageNotif} />
      <MUIDataTable
        title="Your Node"
        data={nodes.toJS()}
        columns={tableColumns}
        options={tableOptions}
        elevation={10}
      />
      <Tooltip title="New Node">
        <Fab variant="extended" color="primary" className={classes.addBtn} onClick={() => dispatch(postNode(history))}>
            Create new Node
        </Fab>
      </Tooltip>
    </div>
  );
}

Nodes.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Nodes);
