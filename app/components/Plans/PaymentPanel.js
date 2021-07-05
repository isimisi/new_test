import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FloatingPanel from '../Panel/FloatingPanel';
import styles from './plan-jss';
import PaymentForm from './PaymentForm';

function PaymentPanel(props) {
  const {
    open,
    closeForm,
  } = props;
  const branch = '';
  return (
    <div>
      <FloatingPanel
        openForm={open}
        branch={branch}
        closeForm={closeForm}
        title="Abboner på juristic"
      >
        <PaymentForm />
      </FloatingPanel>
    </div>
  );
}

PaymentPanel.propTypes = {
  open: PropTypes.bool.isRequired,
  closeForm: PropTypes.func.isRequired,
};

export default withStyles(styles)(PaymentPanel);
