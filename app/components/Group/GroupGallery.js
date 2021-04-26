import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import GroupCard from '../CardPaper/GroupCard';
import GroupDetail from './GroupDetail';

function GroupGallery(props) {
  const [open, setOpen] = useState(false);
  const {
    dataProduct,
    handleAddToCart,
    productIndex,
    keyword,
    listView,
    showDetail
  } = props;

  const handleDetailOpen = (product) => {
    setOpen(true);
    showDetail(product);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <GroupDetail
        open={open}
        close={handleClose}
        detailContent={dataProduct}
        productIndex={productIndex}
        handleAddToCart={handleAddToCart}
        listView={listView}
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
            if (product.get('name').toLowerCase().indexOf(keyword) === -1) {
              return false;
            }
            const itemAttr = {
              id: product.get('id'),
              name: product.get('name'),
              thumbnail: product.get('thumbnail'),
            };
            return (
              <Grid item md={listView === 'list' ? 12 : 4} sm={listView === 'list' ? 12 : 6} xs={12} key={index.toString()}>
                <GroupCard
                  list={listView === 'list'}
                  name={product.get('name')}
                  thumbnail={product.get('thumbnail')}
                  desc={product.get('desc')}
                  detailOpen={() => handleDetailOpen(product)}
                  addToCart={() => handleAddToCart(itemAttr)}
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
  handleAddToCart: PropTypes.func.isRequired,
  showDetail: PropTypes.func.isRequired,
  productIndex: PropTypes.number.isRequired,
  keyword: PropTypes.string.isRequired,
  listView: PropTypes.string.isRequired
};

export default GroupGallery;
