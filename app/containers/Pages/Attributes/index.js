/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import { useSelector, useDispatch } from 'react-redux';
import tableOptions from '@api/ui/tableOptions';
import { loadFromLocalStorage } from '@api/localStorage/localStorage';
import {
  useHistory
} from 'react-router-dom';
import styles from './attribute-jss';
import Attribute from './Attribute';
import { columns, reducer } from './constants';
import { Notification } from '@components';
import {
  getAttributes, closeNotifAction, postAttribute, getGroupDropDown, putAttribute, showAttribute, deleteAttribute, changeCurrentAttribute
} from './reducers/attributeActions';

function Attributes(props) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const attributes = useSelector(state => state[reducer].get('attributes')).toJS();
  const messageNotif = useSelector(state => state[reducer].get('message'));
  const groupsDropDownOptions = useSelector(state => state[reducer].get('groupsDropDownOptions')).toJS();
  const id = useSelector(state => state[reducer].get('id'));
  const label = useSelector(state => state[reducer].get('label'));
  const description = useSelector(state => state[reducer].get('description'));
  const type = useSelector(state => state[reducer].get('type'));
  const group = useSelector(state => state[reducer].get('group'));
  const loading = useSelector(state => state[reducer].get('loading'));
  const selectionOptions = useSelector(state => state[reducer].get('selectionOptions'));
  const { plan_id } = loadFromLocalStorage();
  const history = useHistory();

  const { classes } = props;

  useEffect(() => {
    dispatch(getAttributes());
    dispatch(getGroupDropDown());

    if (plan_id < 3) {
      history.push('/app/plan');
    }
  }, []);

  const onOpen = (value) => {
    setOpen(true);
    dispatch(changeCurrentAttribute(value));
    dispatch(showAttribute(value));
  };

  const onDelete = ({ data }) => {
    const deletedAttributes = data.map(v => ({ id: attributes[v.index][3], title: attributes[v.index][0] }));
    deletedAttributes.forEach(e => {
      dispatch(deleteAttribute(e.id, e.title));
    });
  };

  return (
    <div className={classes.table}>
      <Notification close={() => dispatch(closeNotifAction)} message={messageNotif} />
      <MUIDataTable
        title="Dine kendetegn"
        data={attributes}
        columns={columns(onOpen)}
        options={tableOptions(onDelete, loading, 'kendetegn')}
        elevation={10}
      />
      <Tooltip title="Nyt kendetegn">
        <Fab
          variant="extended"
          color="primary"
          className={classes.addBtn}
          onClick={() => {
            setOpen(true);
            dispatch(postAttribute());
          }}
        >
            Nyt kendetegn
        </Fab>
      </Tooltip>
      <Attribute
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
        handleSave={() => {
          setOpen(false);
          dispatch(putAttribute(
            id,
            label,
            description,
            type,
            group,
            selectionOptions.toJS()
          ));
        }}
        groupsDropDownOptions={groupsDropDownOptions}
        group={group}
        label={label}
        description={description}
        type={type}
        selectionOptions={selectionOptions}
      />
    </div>
  );
}

Attributes.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Attributes);
