import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

const FormDialog = (props) => {
  const {
    handleClose, open, title, description, textFielLabel, onConfirm
  } = props;
  const [textField, setTextField] = useState('');
  const [error, setError] = useState(false);

  const changeTextField = (e) => {
    setTextField(e.target.value);
  };

  const confirm = () => {
    if (textField.length === 8 && /^\d+$/.test(textField)) {
      onConfirm(textField);
      handleClose();
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {description}
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="cvr"
          label={textFielLabel}
          value={textField}
          onChange={changeTextField}
          fullWidth
          error={error}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
            Afbryd
        </Button>
        <Button onClick={confirm} color="primary">
            Videre
        </Button>
      </DialogActions>
    </Dialog>
  );
};

FormDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  textFielLabel: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
};


export default FormDialog;
