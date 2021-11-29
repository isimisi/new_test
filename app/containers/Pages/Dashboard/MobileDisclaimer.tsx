/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useTranslation} from 'react-i18next';

type Props = {
  open: boolean,
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
          {t('mobile-disclaimer.you_re_on_a_mobile_device')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t('mobile-disclaimer.desc')}
              {t('mobile-disclaimer.contact_us')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="primary" autoFocus>
          {t('mobile-disclaimer.btn_continue')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpgradeModal;
