import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { useTheme } from '@material-ui/core/styles';


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

export const selectStyles = (menuPosition = 'absolute') => {
  const theme = useTheme();
  return {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit',
      },
    }),
    menu: (provided, state) => ({
      ...provided,
      position: menuPosition,
    })
  };
};
