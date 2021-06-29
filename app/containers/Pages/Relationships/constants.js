import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

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
        <Link to={`/app/relationships/${value}`}>
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

export const reducer = 'relationship';

export const getSize = (fontSize) => {
  switch (fontSize) {
    case '1rem':
      return 'Small';
    case '1.25rem':
      return 'Medium';
    case '2.125rem':
      return 'Large';
    default:
      return 'Medium';
  }
};

export const generateLabelStyle = (size) => {
  switch (size) {
    case 'Small':
      return {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 400,
        fontSize: '1rem',
        lineHeight: 1.5,
        letterSpacing: '0.00938em'
      };
    case 'Medium':
      return {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 500,
        fontSize: '1.25rem',
        lineHeight: 1.6,
        letterSpacing: '0.0075em'
      };
    case 'Large':
      return {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 400,
        fontSize: '2.125rem',
        lineHeight: 1.235,
        letterSpacing: '0.00735em'
      };
    default:
      return {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 500,
        fontSize: '1.25rem',
        lineHeight: 1.6,
        letterSpacing: '0.0075em'
      };
  }
};
