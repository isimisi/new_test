/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

type Props = {
  open: boolean,
  close: () => void
}

const UpgradeModal = (props: Props) => {
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
          Det ser ud til, at du er på en mobil enhed 📱
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              Mange af vores funktioner virker på mobile enheder, men for den bedste oplevelse anbefaler vi, at du bruger en browser på din computer.
              Har du spørgsmål, så kontakt os gerne.
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

export default UpgradeModal;
