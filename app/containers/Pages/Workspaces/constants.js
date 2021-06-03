import React from 'react';
import Button from '@material-ui/core/Button';
import Loader from '@api/ui/Loader';

export const tableOptions = (onDelete, loading) => ({
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

export const columns = [
  {
    name: 'Title',
    options: {
      filter: true
    }
  },
  {
    name: 'Description',
    options: {
      filter: true,
    }
  },
  {
    name: 'Group',
    options: {
      filter: true,
    }
  },
  {
    name: 'See Workspace',
    options: {
      filter: true,
      customBodyRender: (value) => (
        <Button variant="contained" color="primary" href={`/app/workspaces/${value}`}>
            Open
        </Button>
      )
    }
  },
  {
    name: 'Last Edited',
    options: {
      filter: true,
    }
  },
];

export const reducer = 'workspace';
