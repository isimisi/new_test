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
import CryptoJS from 'crypto-js';
import styles from './relationship-jss';
import { tableColumns, tableOptions, reducer } from './constants';
import {
  getRelationships, postRelationship, closeNotifAction, deleteRelationship
} from './reducers/relationshipActions';
import { Notification } from '@components';

function Relationships(props) {
  const { classes } = props;
  const dispatch = useDispatch();
  const relationships = useSelector(state => state.getIn([reducer, 'relationships'])).toJS();
  const messageNotif = useSelector(state => state.getIn([reducer, 'message']));
  const history = useHistory();

  useEffect(() => {
    dispatch(getRelationships());
  }, []);

  const onDelete = ({ data }) => {
    const deletedRelationships = data.map(v => ({ id: relationships[v.index][3], title: relationships[v.index][0] }));
    deletedRelationships.forEach(e => {
      const id = CryptoJS.AES.decrypt(decodeURIComponent(e.id), 'path').toString(CryptoJS.enc.Utf8);
      dispatch(deleteRelationship(id, e.title));
    });
  };

  return (
    <div className={classes.table}>
      <Notification close={() => dispatch(closeNotifAction)} message={messageNotif} />
      <MUIDataTable
        title="Dine forbindelser"
        data={relationships}
        columns={tableColumns}
        options={tableOptions(onDelete)}
        elevation={10}
      />
      <Tooltip title="Ny forbindelse">
        <Fab variant="extended" color="secondary" className={classes.addBtn} onClick={() => dispatch(postRelationship(history))}>
            Ny forbindelse
        </Fab>
      </Tooltip>
    </div>
  );
}

Relationships.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Relationships);
