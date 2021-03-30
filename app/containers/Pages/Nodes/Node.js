import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import NamingForm from '../../../components/Forms/NamingForm';

const Node = () => (
  <div>
    <Grid container spacing={2}>
      <Grid item md={6}>
        <NamingForm type="Node" />
      </Grid>
      <Grid item md={6}>
        {/* <NodeDemo/> */}
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

export default Node;
