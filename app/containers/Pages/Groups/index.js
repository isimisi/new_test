/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import brand from '@api/dummy/brand';
import { useSelector, useDispatch } from 'react-redux';
import { SearchGroup, GroupGallery, Notification } from '@components';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import {
  fetchAction,
  addAction,
  removeAction,
  checkoutAction,
  detailAction,
  searchAction,
  closeNotifAction
} from './reducers/groupActions';
import data from './api/productData';

const styles = () => ({
  addBtn: {
    position: 'fixed',
    bottom: 30,
    right: 50,
    zIndex: 100,
  },
});

function Ecommerce(props) {
  const { classes } = props;
  // Redux State
  const reducer = 'groups';
  const keyword = useSelector(state => state.getIn([reducer, 'keywordValue']));
  const dataProduct = useSelector(state => state.getIn([reducer, 'productList']));
  const dataCart = useSelector(state => state.getIn([reducer, 'cart']));
  const productIndex = useSelector(state => state.getIn([reducer, 'productIndex']));
  const totalItems = useSelector(state => state.getIn([reducer, 'totalItems']));
  const totalPrice = useSelector(state => state.getIn([reducer, 'totalPrice']));
  const messageNotif = useSelector(state => state.getIn([reducer, 'notifMsg']));

  // Dispatcher
  const fetchData = useDispatch();
  const search = useDispatch();
  const handleAddToCart = useDispatch();
  const removeItem = useDispatch();
  const showDetail = useDispatch();
  const checkout = useDispatch();
  const closeNotif = useDispatch();


  const [listView, setListView] = useState('grid');

  useEffect(() => {
    fetchData(fetchAction(data));
  }, []);

  const handleSwitchView = (event, value) => {
    setListView(value);
  };

  const title = brand.name + ' - Groups';
  const description = brand.desc;

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <Notification close={() => closeNotif(closeNotifAction)} message={messageNotif} />
      <SearchGroup
        dataCart={dataCart}
        dataProduct={dataProduct}
        removeItem={(payload) => removeItem(removeAction(payload))}
        checkout={() => checkout(checkoutAction)}
        totalItems={totalItems}
        totalPrice={totalPrice}
        search={(payload) => search(searchAction(payload))}
        keyword={keyword}
        listView={listView}
        handleSwitchView={handleSwitchView}
      />
      <GroupGallery
        listView={listView}
        dataProduct={dataProduct}
        showDetail={(payload) => showDetail(detailAction(payload))}
        handleAddToCart={(payload) => handleAddToCart(addAction(payload))}
        productIndex={productIndex}
        keyword={keyword}
      />
      <Tooltip title="New Group">
        <Fab variant="extended" color="primary" className={classes.addBtn}>
            Create new Group
        </Fab>
      </Tooltip>
    </div>
  );
}

export default withStyles(styles)(Ecommerce);
