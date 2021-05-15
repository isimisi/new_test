import React from 'react';
import Button from '@material-ui/core/Button';

export const tableOptions = (onDelete) => ({
  filterType: 'dropdown',
  responsive: 'stacked',
  print: true,
  rowsPerPage: 10,
  page: 0,
  onRowsDelete: onDelete
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
    name: 'See Report',
    options: {
      filter: true,
      customBodyRender: (value) => (
        <Button variant="contained" color="secondary" href={`/app/conditions/${value}`}>
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
