import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import Loader from '@api/ui/Loader';
import AsyncSelect from 'react-select/async';
import axios from 'axios';
import { selectStyles } from '@api/ui/helper';
import { baseUrl } from '@api/constants';

const FormDialog = (props) => {
  const {
    handleClose, open, title, description, textFielLabel, onConfirm, loading
  } = props;
  const [textField, setTextField] = useState('');

  const changeTextField = (e) => {
    setTextField(e.value);
  };

  const confirm = () => {
    onConfirm(textField, handleClose);
  };


  const getAsyncOptions = inputValue => axios
    .get(`${baseUrl}/workspaces/cvr/dropdown?q=${inputValue}`)
    .then(res => res.data);


  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        {loading
          ? <Loader />
          : (
            <>
              <DialogContentText>
                {description}
              </DialogContentText>
              <AsyncSelect
                styles={selectStyles('relative')}
                menuPlacement="auto"
                maxMenuHeight={150}
                onChange={changeTextField}
                placeholder="Navn eller CVR-nummer"
                loadOptions={getAsyncOptions}
              />
            </>
          )}
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
  loading: PropTypes.bool.isRequired
};


export default FormDialog;
