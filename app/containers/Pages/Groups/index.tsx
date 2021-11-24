/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import brand from '@api/dummy/brand';
import { useSelector, useDispatch } from 'react-redux';
import SearchGroup from '@components/Search/SearchGroup';
import GroupGallery from '@components/Group/GroupGallery';
import Notification from '@components/Notification/Notification';
import GroupModal from '@components/Group/GroupModal';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import { loadFromLocalStorage } from '@utils/localStorage';
import { useTranslation } from 'react-i18next';
import {
  getGroups,
  postGroup,
  showGroup,
  putGroup,
  deleteGroup,
  searchAction,
  closeNotifAction,
  showNotifAction
} from './reducers/groupActions';

const useStyles = makeStyles(() => ({
  addBtn: {
    position: 'fixed',
    bottom: 30,
    right: 50,
    zIndex: 100
  }
}));

const { plan_id } = loadFromLocalStorage();

function Groups() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [listView, setListView] = useState('grid');
  // Redux State
  const reducer = 'groups';
  const keyword = useSelector(state => state[reducer].get('keywordValue'));
  const groups = useSelector(state => state[reducer].get('groups'));
  const activeGroup = useSelector(state => state[reducer].get('activeGroup')
  ).toJS();
  const title = useSelector(state => state[reducer].get('title'));
  const description = useSelector(state => state[reducer].get('description'));
  const image = useSelector(state => state[reducer].get('image')).toJS();
  const messageNotif = useSelector(state => state[reducer].get('message'));
  const { t } = useTranslation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGroups());
  }, []);

  const handleSwitchView = (event, value) => {
    setListView(value);
  };

  const handleSubmit = () => {
    dispatch(postGroup(title, description, image[0], setOpen));
  };

  const metaTitle = brand.name + ' - Groups';
  const metaDescription = brand.desc;

  return (
    <div>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="twitter:title" content={metaTitle} />
        <meta property="twitter:description" content={metaDescription} />
      </Helmet>
      <Notification
        close={() => dispatch(closeNotifAction())}
        message={messageNotif}
      />
      <SearchGroup
        dataProduct={groups}
        search={payload => dispatch(searchAction(payload))}
        keyword={keyword}
        listView={listView}
        handleSwitchView={handleSwitchView}
      />
      <GroupGallery
        listView={listView}
        dataProduct={groups}
        showDetail={payload => dispatch(showGroup(payload.get('id')))}
        updateDetail={(x, d) => dispatch(putGroup(activeGroup.id, x, d))}
        activeGroup={activeGroup}
        plan_id={plan_id}
        notif={() => dispatch(
          showNotifAction(
            'At ændre grupper er forbehold brugere på Draw abonnementer.'
          )
        )
        }
        keyword={keyword}
        deleteGroup={id => {
          if (plan_id === 1) {
            dispatch(
              showNotifAction(
                'At slette grupper er forbehold brugere på Draw abonnementer.'
              )
            );
          } else {
            dispatch(deleteGroup(id));
          }
        }}
      />
      <Tooltip title="New Group">
        <Fab
          variant="extended"
          color="primary"
          className={classes.addBtn}
          onClick={() => {
            if (plan_id === 1) {
              dispatch(
                showNotifAction(
                  'At oprette grupper er forbehold brugere på Draw abonnementer.'
                )
              );
            } else {
              setOpen(true);
            }
          }}
        >
          {`${t('groups.btn_create_new_group')}`}
        </Fab>
      </Tooltip>
      <GroupModal
        open={open}
        setOpen={v => setOpen(v)}
        title={title}
        description={description}
        image={image}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default Groups;
