/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import { useSelector, useDispatch } from 'react-redux';
import { Notification } from '@components';
import CryptoJS from 'crypto-js';
import {
  useHistory
} from 'react-router-dom';
import tableOptions from '@api/ui/tableOptions';
import { loadFromLocalStorage } from '@api/localStorage/localStorage';
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
  const nodes = useSelector(state => state[reducer].get('nodes')).toJS();
  const messageNotif = useSelector(state => state[reducer].get('message'));
  const loading = useSelector(state => state[reducer].get('loading'));
  const history = useHistory();
  const { plan_id } = loadFromLocalStorage();

  useEffect(() => {
    dispatch(getNodes());

    if (plan_id === 1) {
      history.push('/app/plan');
    }
  }, []);

  const onDelete = ({ data }) => {
    const deletedNodes = data.map(v => ({ id: nodes[v.index][3], title: nodes[v.index][0] }));
    deletedNodes.forEach(e => {
      const id = CryptoJS.AES.decrypt(decodeURIComponent(e.id), 'path').toString(CryptoJS.enc.Utf8);
      dispatch(deleteNode(id, e.title));
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
        <Fab variant="extended" color="primary" className={classes.addBtn} onClick={() => dispatch(postNode(history))}>
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
