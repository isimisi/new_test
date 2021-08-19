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
import CryptoJS from 'crypto-js';
import { loadFromLocalStorage } from '@api/localStorage/localStorage';
import {
  columns, reducer
} from './constants';
import styles from './conditions-jss';
import { Notification } from '@components';
import {
  closeNotifAction, getConditions, postCondition, deleteCondition
} from './reducers/conditionActions';

function Conditions(props) {
  const { classes } = props;
  const dispatch = useDispatch();
  const conditions = useSelector(state => state[reducer].get('conditions')).toJS();
  const messageNotif = useSelector(state => state[reducer].get('message'));
  const loading = useSelector(state => state[reducer].get('loading'));
  const history = useHistory();
  const { plan_id } = loadFromLocalStorage();

  useEffect(() => {
    dispatch(getConditions());

    if (plan_id < 3) {
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
        title="Dine betingelser"
        data={conditions}
        columns={columns}
        options={tableOptions(onDelete, loading)}
        elevation={10}
      />
      <Tooltip title="Ny betingelse">
        <Fab variant="extended" color="primary" className={classes.addBtn} onClick={() => dispatch(postCondition(history))}>
            Ny betingelse
        </Fab>
      </Tooltip>
    </div>
  );
}

Conditions.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Conditions);
