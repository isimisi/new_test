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

export const tableColumns = [
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
    name: 'See Relationship',
    options: {
      filter: true,
      customBodyRender: (value) => (
        <Button variant="contained" color="primary" href={`/app/relationships/${value}`}>
              Open
        </Button>
      )
    }
  },
  {
    name: 'Last edited',
    options: {
      filter: true,
    }
  },
];

export const reducer = 'relationship';
