import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { Chip } from '@material-ui/core';

export const columns = t => [
  {
    name: t('columns.title'),
    options: {
      filter: true
    }
  },
  {
    name: t('columns.tags'),
    options: {
      filter: false,
      filterList: [],
      filterOptions: {
        logic: (tags, filters) => {
          const mappedTags = tags.map(
            tag => `${tag.tag.emoji ? tag.tag.emoji : ''} ${tag.tag.name}`
          );
          return !filters.every(tag => mappedTags.includes(tag));
        }
      },
      sort: false,
      customBodyRender: tags => Array.isArray(tags)
        && tags.map(tag => (
          <Chip
            key={tag.id}
            style={{ margin: 2 }}
            size="small"
            label={`${tag.tag.emoji ? tag.tag.emoji : ''} ${tag.tag.name}`}
          />
        ))
    }
  },
  {
    name: t('columns.groups'),
    options: {
      filter: true
    }
  },
  {
    name: t('columns.see_red_flag'),
    options: {
      filter: true,
      customBodyRender: value => (
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
      filter: true
    }
  }
];

export const reducer = 'alert';
