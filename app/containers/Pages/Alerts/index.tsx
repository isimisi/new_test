/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes, { any } from 'prop-types';
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
import { useTranslation} from 'react-i18next';

const Alerts = (props) => {
  const { classes } = props;
  const dispatch = useAppDispatch();
  const alerts = useAppSelector(state => state[reducer].get('alerts')).toJS();
  const messageNotif = useAppSelector(state => state[reducer].get('message'));
  const history = useHistory();
  const { plan_id } = loadFromLocalStorage();
  const { t } = useTranslation();


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
        title={t('alerts.your_red_flags')}
        data={alerts}
        columns={columns(t)}
        options={tableOptions(onDelete, false)}
      />
        <Fab variant="extended" color="primary" className={classes.addBtn} onClick={() => dispatch(postAlert(history))}>
            {`${t('alerts.btn_new_red_flag')}`}
        </Fab>
    </div>
  );
};

Alerts.propTypes = {
  classes: PropTypes.object.isRequired,
  t: any
};

export default withStyles(styles)(Alerts);
