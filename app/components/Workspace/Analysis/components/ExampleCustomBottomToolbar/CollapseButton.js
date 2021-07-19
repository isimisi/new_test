/* eslint-disable react/prop-types */
import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import IconCollapse from '@material-ui/icons/KeyboardArrowDown';
import IconRestore from '@material-ui/icons/KeyboardArrowUp';


const CollapseButton = ({
  collapsed,
  setCollapsed,
}) => {
  const toggleCollapsed = React.useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed, setCollapsed]);
  return (
    <Tooltip title={collapsed ? 'Restore Panel' : 'Collapse Panel'}>
      <IconButton onClick={toggleCollapsed} aria-label="delete" color="default">
        {collapsed ? <IconRestore /> : <IconCollapse />}
      </IconButton>
    </Tooltip>
  );
};

export default React.memo(CollapseButton);
