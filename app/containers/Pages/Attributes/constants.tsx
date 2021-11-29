import React from 'react';
import Button from '@material-ui/core/Button';

export const columns = (onOpen, t) => [
  {
    name: t('attributes.table_title'),
    options: {
      filter: true
    }
  },
  {
    name: t('attributes.table_desc'),
    options: {
      filter: true
    }
  },
  {
    name: t('attributes.table_groups'),
    options: {
      filter: true
    }
  },
  {
    name: t('attributes.table_see_features'),
    options: {
      filter: true,
      customBodyRender: value => (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => onOpen(value)}
        >
          {`${t('attributes.btn_open')}`}
        </Button>
      )
    }
  },
  {
    name: t('attributes.last_changed'),
    options: {
      filter: true
    }
  }
];

export const reducer = 'attribute';
