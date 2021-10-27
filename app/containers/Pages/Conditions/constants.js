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
    name: 'Se betingelse',
    options: {
      filter: true,
      customBodyRender: (value) => (
        <Link to={`/app/conditions/${value}`} style={{ textDecoration: 'none' }}>
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
