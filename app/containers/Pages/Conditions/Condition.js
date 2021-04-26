import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import NamingForm from '../../../components/Forms/NamingForm';
import ConditionForm from '../../../components/Forms/ConditionForm';

function Condition() {
  return (
    <div>
      <NamingForm type="Condition" />
      <ConditionForm />
      <div>
        <Tooltip title="Save Condition">
          <Fab
            variant="extended"
            color="primary"
            style={{
              position: 'fixed',
              bottom: 30,
              right: 30,
              zIndex: 100
            }}
          >
            Save Condition
          </Fab>
        </Tooltip>
      </div>
    </div>
  );
}

export default Condition;
