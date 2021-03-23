import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import NamingForm from '../../../components/Forms/NamingForm';
import OutputForm from '../../../components/Forms/OutputForm';


function Condition() {
  return (
    <div>
      <NamingForm type="Output" />
      <OutputForm />
    </div>
  );
}

export default withStyles()(Condition);
