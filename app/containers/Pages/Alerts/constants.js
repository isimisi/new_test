import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

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
    name: 'See Alert',
    options: {
      filter: true,
      customBodyRender: (value) => (
        <Link to={`/app/red flags/${value}`}>
          <Button variant="contained" color="primary">
            Open
          </Button>
        </Link>
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

export const tableOptions = (onDelete) => ({
  filterType: 'dropdown',
  responsive: 'stacked',
  print: true,
  rowsPerPage: 10,
  page: 0,
  onRowsDelete: onDelete
});
export const reducer = 'alert';
