import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import { useSelector, useDispatch, } from 'react-redux';
import {
  useHistory
} from 'react-router-dom';
import { Notification } from '@components';
import {
  tableOptions, columns, reducer
} from './constants';
import styles from './output-jss';
import {
  getOutput, postOutput, closeNotifAction, deleteOutput
} from './reducers/outputActions';


function Outputs(props) {
  const { classes } = props;
  const dispatch = useDispatch();
  const outputs = useSelector(state => state.getIn([reducer, 'outputs'])).toJS();
  const messageNotif = useSelector(state => state.getIn([reducer, 'message']));
  const history = useHistory();

  useEffect(() => {
    dispatch(getOutput());
  }, []);

  const onDelete = ({ data }) => {
    const deletedOutput = data.map(v => ({ id: outputs[v.index][3], title: outputs[v.index][0] }));
    deletedOutput.forEach(e => {
      dispatch(deleteOutput(e.id, e.title));
    });
  };

  return (
    <div className={classes.table}>
      <Notification close={() => dispatch(closeNotifAction)} message={messageNotif} />
      <MUIDataTable
        title="Dit indhold"
        data={outputs}
        columns={columns}
        options={tableOptions(onDelete)}
        elevation={10}
      />
      <Tooltip title="Nyt indhold">
        <Fab variant="extended" color="primary" className={classes.addBtn} onClick={() => dispatch(postOutput(history))}>
            Create new Output
        </Fab>
      </Tooltip>
    </div>
  );
}

Outputs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Outputs);
