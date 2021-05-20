import React from 'react';
import Button from '@material-ui/core/Button';

export const tableOptions = (onDelete) => ({
  filterType: 'dropdown',
  responsive: 'stacked',
  print: true,
  rowsPerPage: 10,
  page: 0,
  onRowsDelete: onDelete
});

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
    name: 'See Condition',
    options: {
      filter: true,
      customBodyRender: (value) => (
        <Button variant="contained" color="primary" href={`/app/conditions/${value}`}>
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

export const reducer = 'conditions';

export const andOrOption = [
  { label: 'All' },
  { label: 'At Least One' },
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label,
}));

export const buildTypeOptions = [
  { label: 'Node Title' },
  { label: 'Node Attribut' },
  { label: 'Node Description' },
  { label: 'Relationship Label' },
  // { label: 'All (AND)' },
  // { label: 'At Least One (OR)' },
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label,
}));


export const comparisonsOptions = [
  { label: 'is equal to' },
  { label: 'is not equal to' },
  { label: 'is greater than' },
  { label: 'is less than' },
  { label: 'exists' },
  { label: 'does not exist' },
  { label: 'contains' },
  { label: 'does not contain' },
  { label: 'any' },
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label,
}));
