/* eslint-disable camelcase */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import GroupCard from '../CardPaper/GroupCard';
import GroupDetail from './GroupDetail';

function GroupGallery(props) {
  const [open, setOpen] = useState(false);
  const {
    dataProduct,
    keyword,
    listView,
    showDetail,
    activeGroup,
    updateDetail,
    deleteGroup,
    plan_id,
    notif
  } = props;

  const handleDetailOpen = (product) => {
    console.log(plan_id);
    if (plan_id < 3) {
      notif();
    } else {
      setOpen(true);
      showDetail(product);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <GroupDetail
        open={open}
        close={handleClose}
        listView={listView}
        activeGroup={activeGroup}
        updateDetail={updateDetail}
      />
      <Grid
        container
        alignItems="flex-start"
        justify="flex-start"
        direction="row"
        spacing={3}
      >
        {
          dataProduct.map((product, index) => {
            if (product.get('title').toLowerCase().indexOf(keyword) === -1) {
              return false;
            }
            return (
              <Grid item md={listView === 'list' ? 12 : 4} sm={listView === 'list' ? 12 : 6} xs={12} key={index.toString()}>
                <GroupCard
                  list={listView === 'list'}
                  title={product.get('title')}
                  image={product.get('image')}
                  description={product.get('description')}
                  detailOpen={() => handleDetailOpen(product)}
                  deleteGroup={() => deleteGroup(product.get('id'))}
                />
              </Grid>
            );
          })
        }
      </Grid>
    </div>
  );
}

GroupGallery.propTypes = {
  dataProduct: PropTypes.object.isRequired,
  showDetail: PropTypes.func.isRequired,
  keyword: PropTypes.string.isRequired,
  listView: PropTypes.string.isRequired,
  activeGroup: PropTypes.object.isRequired,
  updateDetail: PropTypes.func.isRequired,
  deleteGroup: PropTypes.func.isRequired,
  plan_id: PropTypes.number.isRequired,
  notif: PropTypes.func.isRequired,
};

export default GroupGallery;
