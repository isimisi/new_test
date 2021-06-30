import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

export const columns = [
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
    name: 'Se Red Flag',
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
    name: 'Sidst ændret',
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
