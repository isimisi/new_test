import Loader from '@components/Loading/LongLoader';
import { MUIDataTableOptions } from 'mui-datatables';
import React from 'react';
import {t} from 'i18next';

type onRowsDelete = (
  rowsDeleted: {
      lookup: { [dataIndex: number]: boolean };
      data: Array<{ index: number; dataIndex: number }>;
  },
  newTableData: any[],
) => void | false;


const tableOptions = (onDelete: onRowsDelete, loading: boolean, where = 'elementer', handleFilterChanged: any = () => {}): MUIDataTableOptions => ({
  filterType: 'dropdown',
  print: true,
  rowsPerPage: 10,
  page: 0,
  onFilterChange: handleFilterChanged,
  onRowsDelete: onDelete,
  textLabels: {
    body: {
      noMatch: loading
        ? <Loader />
        : t('outputs.outputs.loadingMeassage'),
    },
    toolbar: {
      downloadCsv: 'Download som CSV fil',
      filterTable: 'Filtrer tabel',
      print: 'Print',
      search: 'Søg',
      viewColumns: 'Vis colonner'
    },
    filter: {
      all: 'alle',
      reset: 'reset',
      title: 'Filtrer'
    },
    pagination: {
      displayRows: 'af',
      rowsPerPage: 'Rækker per side:',
    },
    selectedRows: {
      delete: 'Slet',
      text: 'række(r) valgt',
    },
    viewColumns: {
      title: 'Vis colonner'
    }
  }
});

export default tableOptions;
