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
        <Link to={`/app/red flags/${value}`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="secondary">
            Åben
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

export const reducer = 'alert';
