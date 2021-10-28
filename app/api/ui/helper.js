import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';

export const mapSelectOptions = (options) => options.map(suggestion => ({
  value: suggestion.value,
  label: (
    <>
      <Tooltip title={suggestion.label}>
        <div style={{ width: '100%', height: '100%' }}>
          <span style={{ paddingRight: '5px' }}>{suggestion.value}</span>
        </div>
      </Tooltip>
    </>
  ),
}));

export const selectStyles = (menuPosition = 'absolute') => ({
  input: base => ({
    ...base,
    color: 'black',
    '& input': {
      font: 'inherit',
    },
  }),
  menu: (provided) => {
    console.log(provided);
    return ({
      ...provided,
      position: menuPosition,
    });
  }
});
