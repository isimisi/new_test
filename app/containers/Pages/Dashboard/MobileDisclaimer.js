import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';

const UpgradeModal = (props) => {
  const { open, close } = props;

  return (
    <div>
      <Dialog
        open={open}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Du bruger Juristic på en telefon
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Vi anbefaler ikke man bruger Juristic på et telefon. Vi anbefaler i stedet, at du bruger en computer, hvilket de fleste af vores andre brugere også gør.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="primary" autoFocus>
            Fortsæt
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};


UpgradeModal.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default UpgradeModal;
