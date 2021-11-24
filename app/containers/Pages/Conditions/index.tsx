/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import {
  useHistory
} from 'react-router-dom';
import tableOptions from '@helpers/tableOptions';
import CryptoJS from 'crypto-js';
import Notification from '@components/Notification/Notification';
import { loadFromLocalStorage } from '@utils/localStorage';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import {
  columns, reducer
} from './constants';
import styles from './conditions-jss';
import {
  closeNotifAction, getConditions, postCondition, deleteCondition
} from './reducers/conditionActions';
import {useTranslation} from 'react-i18next';

function Conditions(props) {
  const { classes } = props;
  const dispatch = useAppDispatch();
  const conditions = useAppSelector(state => state[reducer].get('conditions')).toJS();
  const messageNotif = useAppSelector(state => state[reducer].get('message'));
  const loading = useAppSelector(state => state[reducer].get('loading'));
  const history = useHistory();
  const { plan_id } = loadFromLocalStorage();
  const {t} = useTranslation();

  useEffect(() => {
    dispatch(getConditions());

    if (plan_id === 1) {
      history.push('/app/plan');
    }
  }, []);

  const onDelete = ({ data }) => {
    const deletedNodes = data.map(v => ({ id: conditions[v.index][3], title: conditions[v.index][0] }));
    deletedNodes.forEach(e => {
      const id = CryptoJS.AES.decrypt(decodeURIComponent(e.id), 'path').toString(CryptoJS.enc.Utf8);
      dispatch(deleteCondition(id, e.title));
    });
  };

  return (
    <div className={classes.table}>
      <Notification close={() => dispatch(closeNotifAction)} message={messageNotif} />
      <MUIDataTable
        title={t('conditions.your_conditions')}
        data={conditions}
        columns={columns(t)}
        options={tableOptions(onDelete, loading)}
      />
      <Tooltip title={`${t('conditions.your_conditions')}`}>
        <Fab variant="extended" color="primary" className={classes.addBtn} onClick={() => dispatch(postCondition(history))}>
        {`${t('conditions.your_conditions')}`}
        </Fab>
      </Tooltip>
    </div>
  );
}

Conditions.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Conditions);
