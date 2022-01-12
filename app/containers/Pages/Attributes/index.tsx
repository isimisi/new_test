/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import tableOptions from '@helpers/tableOptions';
import { useHistory } from 'react-router-dom';
import Notification from '@components/Notification/Notification';
import { loadFromLocalStorage } from '@utils/localStorage';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { useTranslation } from 'react-i18next';
import styles from './attribute-jss';
import Attribute from './Attribute';
import { columns, reducer } from './constants';
import {
  getAttributes,
  closeNotifAction,
  postAttribute,
  getGroupDropDown,
  putAttribute,
  showAttribute,
  deleteAttribute,
  changeCurrentAttribute
} from './reducers/attributeActions';

function Attributes(props) {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const attributes = useAppSelector(state => state[reducer].get('attributes')
  ).toJS();
  const messageNotif = useAppSelector(state => state[reducer].get('message'));
  const groupsDropDownOptions = useAppSelector(state => state[reducer].get('groupsDropDownOptions')
  ).toJS();
  const id = useAppSelector(state => state[reducer].get('id'));
  const label = useAppSelector(state => state[reducer].get('label'));
  const description = useAppSelector(state => state[reducer].get('description')
  );
  const type = useAppSelector(state => state[reducer].get('type'));
  const group = useAppSelector(state => state[reducer].get('group'));
  const loading = useAppSelector(state => state[reducer].get('loading'));
  const selectionOptions = useAppSelector(state => state[reducer].get('selectionOptions')
  );
  const { plan_id } = loadFromLocalStorage();
  const history = useHistory();
  const { t } = useTranslation();

  const { classes } = props;

  useEffect(() => {
    dispatch(getAttributes());
    dispatch(getGroupDropDown());

    if (plan_id === 1) {
      history.push('/app/plan');
    }
  }, []);

  const onOpen = value => {
    setOpen(true);
    dispatch(changeCurrentAttribute(value));
    dispatch(showAttribute(value));
  };

  const onDelete = ({ data }) => {
    const deletedAttributes = data.map(v => ({
      id: attributes[v.index][3],
      title: attributes[v.index][0]
    }));
    deletedAttributes.forEach(e => {
      dispatch(deleteAttribute(e.id, e.title));
    });
  };

  return (
    <div className={classes.table}>
      <Notification
        close={() => dispatch(closeNotifAction)}
        message={messageNotif}
      />
      <MUIDataTable
        title={t('attributes.your_features')}
        data={attributes}
        columns={columns(onOpen, t)}
        options={tableOptions(onDelete, loading, 'kendetegn')}
      />
      <Tooltip title={`${t('attributes.btn_new_features')}`}>
        <Fab
          variant="extended"
          color="primary"
          className={classes.addBtn}
          onClick={() => {
            setOpen(true);
            dispatch(postAttribute());
          }}
        >
          {`${t('attributes.btn_new_features')}`}
        </Fab>
      </Tooltip>
      <Attribute
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
        handleSave={() => {
          setOpen(false);
          dispatch(
            putAttribute(
              id,
              label,
              description,
              type,
              group,
              selectionOptions.toJS()
            )
          );
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
