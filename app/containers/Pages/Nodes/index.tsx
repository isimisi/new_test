/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MUIDataTable from 'mui-datatables';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import { useSelector, useDispatch } from 'react-redux';
import Notification from '@components/Notification/Notification';
import CryptoJS from 'crypto-js';
import {
  useHistory
} from 'react-router-dom';
import tableOptions from '@helpers/tableOptions';
import { loadFromLocalStorage } from '@utils/localStorage';
import {
  tableColumns, reducer
} from './constants';
import styles from './node-jss';
import {
  getNodes, postNode, closeNotifAction, deleteNode
} from './reducers/nodeActions';

const useStyles = makeStyles(styles);

const Nodes = () => {
  const classes = useStyles();
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
      />
      <Tooltip title="Nyt element">
        <Fab variant="extended" color="primary" className={classes.addBtn} onClick={() => dispatch(postNode(history))}>
            Nyt element
        </Fab>
      </Tooltip>
    </div>
  );
};

export default Nodes;
