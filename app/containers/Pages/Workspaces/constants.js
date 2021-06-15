import React from 'react';
import Button from '@material-ui/core/Button';

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
    name: 'See Workspace',
    options: {
      filter: true,
      customBodyRender: (value) => (
        <Button variant="contained" color="primary" href={`/app/workspaces/${value}`}>
            Open
        </Button>
      )
    }
  },
  {
    name: 'Last Edited',
    options: {
      filter: true,
    }
  },
];

export const reducer = 'workspace';
