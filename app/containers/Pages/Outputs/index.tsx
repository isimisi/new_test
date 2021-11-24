/* eslint-disable camelcase */
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
import Notification from '@components/Notification/Notification';
import tableOptions from '@helpers/tableOptions';
import { loadFromLocalStorage } from '@utils/localStorage';
import {
  columns, reducer
} from './constants';
import styles from './output-jss';
import {
  getOutput, postOutput, closeNotifAction, deleteOutput
} from './reducers/outputActions';
import {useTranslation} from 'react-i18next';


function Outputs(props) {
  const { classes } = props;
  const dispatch = useDispatch();
  const outputs = useSelector(state => state[reducer].get('outputs')).toJS();
  const messageNotif = useSelector(state => state[reducer].get('message'));
  const history = useHistory();
  const { plan_id } = loadFromLocalStorage();
  const {t} = useTranslation();

  useEffect(() => {
    dispatch(getOutput());

    if (plan_id !== 4) {
      history.push('/app/plan');
    }
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
        title={t('outputs.outputs.title')}
        data={outputs}
        columns={columns}
        options={tableOptions(onDelete, false, t('outputs.outputs.loadingMeassage'))}
      />
      <Tooltip title="Nyt indhold">
        <Fab variant="extended" color="primary" className={classes.addBtn} onClick={() => dispatch(postOutput(history))}>
          {`${t('outputs.outputs.btn_create_new_output')}`}
        </Fab>
      </Tooltip>
    </div>
  );
}

Outputs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Outputs);
