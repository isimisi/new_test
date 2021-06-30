import React from 'react';
import Button from '@material-ui/core/Button';

export const columns = (onOpen) => [
  {
    name: 'Titel',
    options: {
      filter: true
    }
  },
  {
    name: 'Beskrivelse',
    options: {
      filter: true,
    }
  },
  {
    name: 'Gruppe',
    options: {
      filter: true,
    }
  },
  {
    name: 'Se kendetegn',
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
    name: 'Sidst ændret',
    options: {
      filter: true,
    }
  },
];

export const reducer = 'attribute';
