import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import { useSelector, useDispatch } from 'react-redux';
import { NodeDemo, NodeStyling, NodeForm } from '@components';


const Node = () => {
  const onSave = (title, description, attributes, type, group) => {

  };

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item md={4}>
          <NodeForm
            onSave={onSave}

          />
        </Grid>
        <Grid item md={4}>
          <NodeDemo />
        </Grid>
        <Grid item md={4}>
          <NodeStyling />
        </Grid>
      </Grid>
      <Tooltip title="Save">
        <Fab
          variant="extended"
          color="primary"
          style={{
            position: 'fixed',
            bottom: 30,
            right: 50,
            zIndex: 100,
          }}
        >
            Save Node
        </Fab>
      </Tooltip>
    </div>
  );
};

export default Node;
