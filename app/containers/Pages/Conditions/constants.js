import React from 'react';
import Button from '@material-ui/core/Button';

export const data = [
  ['Test condition', 'This is a test of a condition', 'Test Group', 1, 'Friday at 3:59 pm'],
  ['Test condition', 'This is a test of a condition', 'Test Group', 2, 'Friday at 3:59 pm'],
  ['Test condition', 'This is a test of a condition', 'Test Group', 3, 'Friday at 3:59 pm'],
  ['Test condition', 'This is a test of a condition', 'Test Group', 4, 'Friday at 3:59 pm'],
  ['Test condition', 'This is a test of a condition', 'Test Group', 5, 'Friday at 3:59 pm'],
  ['Test condition', 'This is a test of a condition', 'Test Group', 6, 'Friday at 3:59 pm'],
  ['Test condition', 'This is a test of a condition', 'Test Group', 7, 'Friday at 3:59 pm'],
  ['Test condition', 'This is a test of a condition', 'Test Group', 8, 'Friday at 3:59 pm'],
];

export const options = {
  filterType: 'dropdown',
  responsive: 'stacked',
  print: true,
  rowsPerPage: 10,
  page: 0
};

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
    name: 'See Condition',
    options: {
      filter: true,
      customBodyRender: (value) => (
        <Button variant="contained" color="primary" href={`/app/conditions/${value}`}>
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

export const reducer = 'conditions';
