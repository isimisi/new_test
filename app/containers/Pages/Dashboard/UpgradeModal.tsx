import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Lottie from 'lottie-react';
import printer from './printer.json';
import {useTranslation} from 'react-i18next';

interface Props {
  open: boolean;
  close: () => void
}

const UpgradeModal = (props: Props) => {
  const { open, close } = props;
  const {t} = useTranslation();

  return (
    <div>
      <Dialog
        open={open}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t('upgrade-modal.you_have_now_upgraded_your_user')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {t('upgrade-modal.desc')}
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
            {t('upgrade-modal.btn_continue')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpgradeModal;
