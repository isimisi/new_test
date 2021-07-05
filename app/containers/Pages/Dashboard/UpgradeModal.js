import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Lottie from 'lottie-react';
import printer from './printer.json';

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
          Tillykke, med dit køb
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Vi er glade for at du finder værdi i juristic. Tøv ikke med at række ud, hvis der skulle opstå nogle problemer undervejs.
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


UpgradeModal.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default UpgradeModal;
