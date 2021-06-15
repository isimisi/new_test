import React from 'react';
import Loader from './Loader';

const tableOptions = (onDelete, loading) => ({
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
        : 'Det ser vidst ud som om, at du ikke har lavet nogle arbejdsområder endnu',
    },
  }
});

export default tableOptions;
