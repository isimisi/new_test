import React from 'react';
import Loader from './Loader';

const tableOptions = (onDelete, loading, where = 'elementer') => ({
  filterType: 'dropdown',
  responsive: 'stacked',
  print: true,
  rowsPerPage: 10,
  page: 0,
  onRowsDelete: onDelete,
  textLabels: {
    body: {
      noMatch: loading
        ? <Loader />
        : 'Det ser vist ud som om, at du ikke har lavet nogle ' + where + ' endnu',
    },
  }
});

export default tableOptions;
