import React from 'react';
import Button from '@material-ui/core/Button';

/* eslint-disable import/prefer-default-export */
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
    name: 'See Node',
    options: {
      filter: true,
      customBodyRender: (value) => (
        <Button variant="contained" color="primary" href={`/app/nodes/${value}`}>
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
export const tableOptions = {
  filterType: 'dropdown',
  responsive: 'stacked',
  print: true,
  rowsPerPage: 10,
  page: 0
};

export const reducer = 'node';
