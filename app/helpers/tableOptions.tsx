import Loader from '@components/Loading/LongLoader';
import { MUIDataTableOptions } from 'mui-datatables';
import React from 'react';


type onRowsDelete = (
  rowsDeleted: {
      lookup: { [dataIndex: number]: boolean };
      data: Array<{ index: number; dataIndex: number }>;
  },
  newTableData: any[],
) => void | false;


const tableOptions = (onDelete: onRowsDelete, loading: boolean, where = 'elementer'): MUIDataTableOptions => ({
  filterType: 'dropdown',
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
