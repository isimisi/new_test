/* eslint-disable no-param-reassign */
import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import styles from './workspace-jss';

const onDragStart = (event, nodeType) => {
  event.dataTransfer.setData('application/reactflow', nodeType);
  event.dataTransfer.effectAllowed = 'move';
};

const DrapAndDropPanel = (props) => {
  const { classes } = props;

  return (
    <Grid
      xs={4}
      item
      className={classes.paperGlass}
    >
      <div className={classes.dndnode} onDragStart={(event) => onDragStart(event, 'Leverandør')} draggable>
        Leverandør
      </div>
      <div className={classes.dndnode} onDragStart={(event) => onDragStart(event, 'Datterselskab')} draggable>
        Datterselskab
      </div>
      <div className={classes.dndnode} onDragStart={(event) => onDragStart(event, 'Datacenter')} draggable>
        Datacenter
      </div>
    </Grid>
  );
};

DrapAndDropPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DrapAndDropPanel);
