import React from 'react';
import Button from '@material-ui/core/Button';

export const columns = (onOpen) => [
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
    name: 'See Attribut',
    options: {
      filter: true,
      customBodyRender: (value) => (
        <Button variant="contained" color="primary" onClick={() => onOpen(value)}>
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

export const reducer = 'attribute';
