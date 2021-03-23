import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import NamingForm from '../../../components/Forms/NamingForm';

const Node = () => (
  <div>
    <NamingForm type="Node" />
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
