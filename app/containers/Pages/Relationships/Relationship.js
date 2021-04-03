import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
// import { useSelector, useDispatch } from 'react-redux';
import { RelationshipDemo, RelationshipStylling, RelationshipForm } from '@components';


const Node = () => {
  const onSave = (label, description, type, group) => {
    console.log(label, description, type, group);
  };

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item md={4}>
          <RelationshipForm
            onSave={(onSave)}
          />
        </Grid>
        <Grid item md={4}>
          <RelationshipDemo />
        </Grid>
        <Grid item md={4}>
          <RelationshipStylling />
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
