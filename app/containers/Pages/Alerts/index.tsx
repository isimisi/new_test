/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Notification from '@components/Notification/Notification';
import {
  useHistory
} from 'react-router-dom';
import CryptoJS from 'crypto-js';
import tableOptions from '@helpers/tableOptions';
import { loadFromLocalStorage } from '@utils/localStorage';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import styles from './alert-jss';
import {
  columns, reducer
} from './constants';
import {
  getAlerts, postAlert, deleteAlert, closeNotifAction
} from './reducers/alertActions';

const Alerts = (props) => {
  const { classes } = props;
  const dispatch = useAppDispatch();
  const alerts = useAppSelector(state => state[reducer].get('alerts')).toJS();
  const messageNotif = useAppSelector(state => state[reducer].get('message'));
  const history = useHistory();
  const { plan_id } = loadFromLocalStorage();

  useEffect(() => {
    dispatch(getAlerts());

    if (plan_id === 1) {
      history.push('/app/plan');
    }
  }, []);

  const onDelete = ({ data }) => {
    const deletedNodes = data.map(v => ({ id: alerts[v.index][3], title: alerts[v.index][0] }));
    deletedNodes.forEach(e => {
      const id = CryptoJS.AES.decrypt(decodeURIComponent(e.id), 'path').toString(CryptoJS.enc.Utf8);
      dispatch(deleteAlert(id, e.title));
    });
  };

  return (
    <div className={classes.table}>
      <Notification close={() => dispatch(closeNotifAction)} message={messageNotif} />
      <MUIDataTable
        title="Dine Red Flags"
        data={alerts}
        columns={columns}
        options={tableOptions(onDelete, false)}
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
