/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import { useSelector, useDispatch } from 'react-redux';
import {
  useHistory
} from 'react-router-dom';
import tableOptions from '@api/ui/tableOptions';
import { loadFromLocalStorage } from '@api/localStorage/localStorage';
import CryptoJS from 'crypto-js';
import {
  columns,
  reducer
} from './constants';
import styles from './workspace-jss';
import {
  getWorkspaces, closeNotifAction, postWorkspace, deleteWorkspaces, showNotifAction
} from './reducers/workspaceActions';
import { Notification } from '@components';

const { plan_id } = loadFromLocalStorage();

const Workspaces = (props) => {
  const { classes } = props;
  const dispatch = useDispatch();
  const workspaces = useSelector(state => state[reducer].get('workspaces')).toJS();
  const messageNotif = useSelector(state => state[reducer].get('message'));
  const loading = useSelector(state => state[reducer].get('loading'));
  const history = useHistory();

  useEffect(() => {
    dispatch(getWorkspaces());
  }, []);

  const onDelete = ({ data }) => {
    const deletedWorkspaces = data.map(v => ({ id: workspaces[v.index][3], title: workspaces[v.index][0] }));
    deletedWorkspaces.forEach(e => {
      const id = CryptoJS.AES.decrypt(decodeURIComponent(e.id), 'path').toString(CryptoJS.enc.Utf8);
      dispatch(deleteWorkspaces(id, e.title));
    });
  };

  const createWorkspace = () => {
    if ((plan_id === 1 && workspaces.length === 10) || (plan_id === 2 && workspaces.length === 50)) {
      dispatch(showNotifAction('Du kan ikke lave flere arbejdsområder. Opgrader for at lave flere.'));
    } else {
      dispatch(postWorkspace(history));
    }
  };

  return (
    <div className={classes.table}>
      <Notification close={() => dispatch(closeNotifAction)} message={messageNotif} />
      <MUIDataTable
        title="Dine arbejdsområder"
        data={workspaces}
        columns={columns}
        options={tableOptions(onDelete, loading, 'arbejdsområder')}
        elevation={10}
      />
      <Tooltip title="Nyt arbejdsområde">
        <Fab variant="extended" color="primary" className={classes.addBtn} onClick={createWorkspace}>
            Nyt arbejdsområde
        </Fab>
      </Tooltip>
    </div>
  );
};

Workspaces.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Workspaces);
