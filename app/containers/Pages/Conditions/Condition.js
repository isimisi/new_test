import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import NamingForm from '../../../components/Forms/NamingForm';
import ConditionForm from '../../../components/Forms/ConditionForm';

function Condition() {
  return (
    <div>
      <NamingForm type="Condition" />
      <ConditionForm />
    </div>
  );
}

export default withStyles()(Condition);
