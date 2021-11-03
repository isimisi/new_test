import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Lottie from 'lottie-react';
import printer from './printer.json';

interface Props {
  open: boolean;
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
          Tillykke, du har nu opgraderet din bruger!
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Du har fået adgang til dine ekstra funktioner! Vi er glade for, at du finder værdi i Juristic. Oplever du problemer, eller har du bare spørgsmål, er du altid velkommen til at ringe eller skrive til os.
          </DialogContentText>
          <div style={{
            width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'
          }}
          >
            <Lottie
              animationData={printer}
              style={{
                width: '40%',
              }}
            />
          </div>
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
