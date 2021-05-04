/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import brand from '@api/dummy/brand';
import { useSelector, useDispatch } from 'react-redux';
import {
  SearchGroup, GroupGallery, Notification, GroupModal
} from '@components';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import {
  getGroups,
  postGroup,
  detailAction,
  searchAction,
  closeNotifAction
} from './reducers/groupActions';

const styles = () => ({
  addBtn: {
    position: 'fixed',
    bottom: 30,
    right: 50,
    zIndex: 100,
  },
});

function Groups(props) {
  const { classes } = props;
  const [open, setOpen] = useState(false);
  const [listView, setListView] = useState('grid');
  // Redux State
  const reducer = 'groups';
  const keyword = useSelector(state => state.getIn([reducer, 'keywordValue']));
  const groups = useSelector(state => state.getIn([reducer, 'groups']));
  const productIndex = useSelector(state => state.getIn([reducer, 'productIndex']));
  const title = useSelector(state => state.getIn([reducer, 'title']));
  const description = useSelector(state => state.getIn([reducer, 'description']));
  const image = useSelector(state => state.getIn([reducer, 'image'])).toJS();
  const messageNotif = useSelector(state => state.getIn([reducer, 'message']));

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
      <Notification close={() => dispatch(closeNotifAction())} message={messageNotif} />
      <SearchGroup
        dataProduct={groups}
        search={(payload) => dispatch(searchAction(payload))}
        keyword={keyword}
        listView={listView}
        handleSwitchView={handleSwitchView}
      />
      <GroupGallery
        listView={listView}
        dataProduct={groups}
        showDetail={(payload) => dispatch(detailAction(payload))}
        productIndex={productIndex}
        keyword={keyword}
      />
      <Tooltip title="New Group">
        <Fab variant="extended" color="primary" className={classes.addBtn} onClick={() => setOpen(true)}>
            Create new Group
        </Fab>
      </Tooltip>
      <GroupModal
        open={open}
        setOpen={(v) => setOpen(v)}
        title={title}
        description={description}
        image={image}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default withStyles(styles)(Groups);
