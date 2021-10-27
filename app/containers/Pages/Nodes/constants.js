import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

export const tableColumns = [
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
    name: 'Se element',
    options: {
      filter: true,
      customBodyRender: (value) => (
        <Link to={`/app/nodes/${value}`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="secondary">
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

export const reducer = 'node';

export const getWidth = (size) => {
  switch (size) {
    case 'Small':
      return '70%';
    case 'Medium':
      return '90%';
    case 'Large':
      return '100%';
    default:
      return '90%';
  }
};

export const getSize = (width) => {
  switch (width) {
    case '70%':
      return 'Small';
    case '90%':
      return 'Medium';
    case '100%':
      return 'Large';
    default:
      return 'Medium';
  }
};

export const generateNodeStyle = (size, backgroundColor, borderColor, theme) => (
  JSON.stringify({
    width: getWidth(size),
    backgroundColor,
    borderColor,
    border: '3px solid',
    borderRadius: theme.rounded.small,
    display: 'flex',
    padding: 10,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  }));
