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
import {
  columns,
  reducer
} from './constants';
import tableOptions from '@api/ui/tableOptions';
import styles from './workspace-jss';
import {
  getWorkspaces, closeNotifAction, postWorkspace, deleteWorkspaces
} from './reducers/workspaceActions';
import { Notification } from '@components';

const Workspaces = (props) => {
  const { classes } = props;
  const dispatch = useDispatch();
  const workspaces = useSelector(state => state.getIn([reducer, 'workspaces'])).toJS();
  const messageNotif = useSelector(state => state.getIn([reducer, 'message']));
  const loading = useSelector(state => state.getIn([reducer, 'loading']));
  const history = useHistory();

  useEffect(() => {
    dispatch(getWorkspaces());
  }, []);

  const onDelete = ({ data }) => {
    const deletedWorkspaces = data.map(v => ({ id: workspaces[v.index][3], title: workspaces[v.index][0] }));
    deletedWorkspaces.forEach(e => {
      dispatch(deleteWorkspaces(e.id, e.title));
    });
  };

  return (
    <div className={classes.table}>
      <Notification close={() => dispatch(closeNotifAction)} message={messageNotif} />
      <MUIDataTable
        title="Dine arbejdsområder"
        data={workspaces}
        columns={columns}
        options={tableOptions(onDelete, loading)}
        elevation={10}
      />
      <Tooltip title="Opret nyt">
        <Fab variant="extended" color="primary" className={classes.addBtn} onClick={() => dispatch(postWorkspace(history))}>
            Create new Workspace
        </Fab>
      </Tooltip>
    </div>
  );
};

Workspaces.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Workspaces);
