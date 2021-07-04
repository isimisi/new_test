import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import Tooltip from '@material-ui/core/Tooltip';
import { Notification } from '@components';
import Fab from '@material-ui/core/Fab';
import {
  useHistory
} from 'react-router-dom';
import { useSelector, useDispatch, } from 'react-redux';
import styles from './alert-jss';
import {
  columns, tableOptions, reducer
} from './constants';
import {
  getAlerts, postAlert, deleteAlert, closeNotifAction
} from './reducers/alertActions';

const Alerts = (props) => {
  const { classes } = props;
  const dispatch = useDispatch();
  const alerts = useSelector(state => state.getIn([reducer, 'alerts'])).toJS();
  const messageNotif = useSelector(state => state.getIn([reducer, 'message']));
  const history = useHistory();

  useEffect(() => {
    dispatch(getAlerts());
  }, []);

  const onDelete = ({ data }) => {
    const deletedNodes = data.map(v => ({ id: alerts[v.index][3], title: alerts[v.index][0] }));
    deletedNodes.forEach(e => {
      dispatch(deleteAlert(e.id, e.title));
    });
  };

  return (
    <div className={classes.table}>
      <Notification close={() => dispatch(closeNotifAction)} message={messageNotif} />
      <MUIDataTable
        title="Dine Red Flags"
        data={alerts}
        columns={columns}
        options={tableOptions(onDelete)}
        elevation={10}
      />
      <Tooltip title="Nyt red flag">
        <Fab variant="extended" color="primary" className={classes.addBtn} onClick={() => dispatch(postAlert(history))}>
            Nyt red flag
        </Fab>
      </Tooltip>
    </div>
  );
};

Alerts.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Alerts);
