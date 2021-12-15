/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-empty-function */
import Loader from '@components/Loading/LongLoader';
import { MUIDataTableOptions } from 'mui-datatables';
import React from 'react';
import { useTranslation } from 'react-i18next';

type onRowsDelete = (
  rowsDeleted: {
    lookup: { [dataIndex: number]: boolean };
    data: Array<{ index: number; dataIndex: number }>;
  },
  newTableData: any[]
) => void | false;

const tableOptions = (
  onDelete: onRowsDelete,
  loading: boolean,
  where = 'elementer',
  handleFilterChanged: any = () => {}
): MUIDataTableOptions => {
  const { t } = useTranslation();
  return {
    filterType: 'dropdown',
    print: true,
    rowsPerPage: 10,
    page: 0,
    onFilterChange: handleFilterChanged,
    onRowsDelete: onDelete,
    textLabels: {
      body: {
        noMatch: loading ? <Loader /> : null
      },
      toolbar: {
        downloadCsv: t('helpers.toolbar.downloadCsv'),
        filterTable: t('helpers.toolbar.filterTable'),
        print: t('helpers.toolbar.print'),
        search: t('helpers.toolbar.search'),
        viewColumns: t('helpers.toolbar.viewColumns')
      },
      filter: {
        all: t('helpers.filter.all'),
        reset: t('helpers.filter.reset'),
        title: t('helpers.filter.filter')
      },
      pagination: {
        displayRows: t('helpers.pagination.display_rows'),
        rowsPerPage: t('helpers.pagination.rows_per_page')
      },
      selectedRows: {
        delete: t('helpers.selectedRows.delete'),
        text: t('helpers.selectedRows.row_selected')
      },
      viewColumns: {
        title: t('helpers.pagination.display.view_columns')
      }
    }
  };
};

export default tableOptions;
