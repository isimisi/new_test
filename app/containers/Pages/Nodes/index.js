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
import tableOptions from '@api/ui/tableOptions';
import {
  tableColumns, reducer
} from './constants';
import styles from './node-jss';
import {
  getNodes, postNode, closeNotifAction, deleteNode
} from './reducers/nodeActions';

function Nodes(props) {
  const { classes } = props;
  const dispatch = useDispatch();
  const nodes = useSelector(state => state.getIn([reducer, 'nodes'])).toJS();
  const messageNotif = useSelector(state => state.getIn([reducer, 'message']));
  const loading = useSelector(state => state.getIn([reducer, 'loading']));
  const history = useHistory();

  useEffect(() => {
    dispatch(getNodes());
  }, []);

  const onDelete = ({ data }) => {
    const deletedNodes = data.map(v => ({ id: nodes[v.index][3], title: nodes[v.index][0] }));
    deletedNodes.forEach(e => {
      dispatch(deleteNode(e.id, e.title));
    });
  };


  return (
    <div className={classes.table}>
      <Notification close={() => dispatch(closeNotifAction)} message={messageNotif} />
      <MUIDataTable
        title="Dine elementer"
        data={nodes}
        columns={tableColumns}
        options={tableOptions(onDelete, loading)}
        elevation={10}
      />
      <Tooltip title="Nyt element">
        <Fab variant="extended" color="secondary" className={classes.addBtn} onClick={() => dispatch(postNode(history))}>
            Nyt element
        </Fab>
      </Tooltip>
    </div>
  );
}

Nodes.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Nodes);
