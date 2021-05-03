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
  columns, options, reducer
} from './constants';
import styles from './conditions-jss';
import { Notification } from '@components';
import {
  closeNotifAction, getConditions, postCondition
} from './reducers/conditionActions';

function Conditions(props) {
  const { classes } = props;
  const dispatch = useDispatch();
  const conditions = useSelector(state => state.getIn([reducer, 'conditions'])).toJS();
  const messageNotif = useSelector(state => state.getIn([reducer, 'message']));
  const history = useHistory();

  useEffect(() => {
    dispatch(getConditions());
  }, []);

  return (
    <div className={classes.table}>
      <Notification close={() => dispatch(closeNotifAction)} message={messageNotif} />
      <MUIDataTable
        title="Your Conditions"
        data={conditions}
        columns={columns}
        options={options}
        elevation={10}
      />
      <Tooltip title="New Condition">
        <Fab variant="extended" color="primary" className={classes.addBtn} onClick={() => dispatch(postCondition(history))}>
            Create new Condition
        </Fab>
      </Tooltip>
    </div>
  );
}

Conditions.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Conditions);
