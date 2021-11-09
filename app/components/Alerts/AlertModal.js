import React from 'react';
import PropTypes from 'prop-types';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

const AlertModal = props => {
  const {
    title, description, open, handleClose, handleSeeCondition, disabled
  } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
    >
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          variant="outlined"
          size="large"
          onClick={handleSeeCondition}
          disabled={disabled}
        >
            Se betingelse
        </Button>
        <Button color="primary" variant="contained" size="large" onClick={handleClose}>
            Luk
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AlertModal.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSeeCondition: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};


export default (AlertModal);
