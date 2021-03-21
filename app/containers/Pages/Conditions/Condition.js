import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import NamingForm from '../../../components/Forms/NamingForm';
import ConditionForm from '../../../components/Forms/ConditionForm';

function Conditions() {
  return (
    <div>
      <NamingForm type="condition" />
      <ConditionForm />
    </div>
  );
}

export default withStyles()(Conditions);
