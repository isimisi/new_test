import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

export const columns = (t) => ([
  {
    name: t('columns.title'),
    options: {
      filter: true
    }
  },
  {
    name: t('columns.desc'),
    options: {
      filter: true,
    }
  },
  {
    name: t('columns.groups'),
    options: {
      filter: true,
    }
  },
  {
    name: t('columns.see_red_flag'),
    options: {
      filter: true,
      customBodyRender: (value) => (
        <Link to={`/app/red flags/${value}`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="secondary">
            {t('columns.btn_open')}
          </Button>
        </Link>
      )
    }
  },
  {
    name: t('columns.last_changed'),
    options: {
      filter: true,
    }
  },
]);

export const reducer = 'alert';
