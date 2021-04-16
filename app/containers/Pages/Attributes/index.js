import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import { useSelector, useDispatch } from 'react-redux';
import styles from './attribute-jss';
import Attribute from './Attribute';
import {
  tableOptions, columns, reducer
} from './constants';
import { Notification } from '@components';
import {
  getAttributes, closeNotifAction, postAttribute, getGroupDropDown, putAttribute, showAttribute, deleteAttribute, changeCurrentAttribute
} from './reducers/attributeActions';

function Attributes(props) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const attributes = useSelector(state => state.getIn([reducer, 'attributes'])).toJS();
  const messageNotif = useSelector(state => state.getIn([reducer, 'message']));
  const groupsDropDownOptions = useSelector(state => state.getIn([reducer, 'groupsDropDownOptions'])).toJS();
  const id = useSelector(state => state.getIn([reducer, 'id']));
  const label = useSelector(state => state.getIn([reducer, 'label']));
  const description = useSelector(state => state.getIn([reducer, 'description']));
  const type = useSelector(state => state.getIn([reducer, 'type']));
  const group = useSelector(state => state.getIn([reducer, 'group']));
  const selectionOptions = useSelector(state => state.getIn([reducer, 'selectionOptions']));

  const { classes } = props;

  useEffect(() => {
    dispatch(getAttributes());
    dispatch(getGroupDropDown());
  }, []);

  const onOpen = () => {
    setOpen(true);
    dispatch(changeCurrentAttribute(id));
    dispatch(showAttribute(id));
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
        title="Your Attributes"
        data={attributes}
        columns={columns(onOpen)}
        options={tableOptions(onDelete)}
        elevation={10}
      />
      <Tooltip title="New Attribut">
        <Fab
          variant="extended"
          color="secondary"
          className={classes.addBtn}
          onClick={() => {
            setOpen(true);
            dispatch(postAttribute());
          }}
        >
            Create new Attribut
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
