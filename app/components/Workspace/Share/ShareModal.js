import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FloatingPanel from '../../Panel/FloatingPanel';
import ShareForm from './ShareForm';
import styles from '../workspace-jss';

function ShareModal(props) {
  const {
    open,
    close,
    onShare
  } = props;


  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [editable, setEditable] = useState(false);
  const [signable, setSignable] = useState(false);

  const onFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const onLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const onEditableChange = () => {
    setEditable(prevVal => !prevVal);
  };


  const onSignableChange = () => {
    setSignable(prevVal => !prevVal);
  };


  return (
    <div>
      <FloatingPanel
        openForm={open}
        closeForm={close}
        title="Del dit workspace"
      >
        <ShareForm
          close={close}
          firstName={firstName}
          onFirstNameChange={onFirstNameChange}
          lastName={lastName}
          onLastNameChange={onLastNameChange}
          email={email}
          onEmailChange={onEmailChange}
          phone={phone}
          onPhoneChange={onPhoneChange}
          editable={editable}
          onEditableChange={onEditableChange}
          signable={signable}
          onSignableChange={onSignableChange}
          onShare={onShare}
        />
      </FloatingPanel>
    </div>
  );
}

ShareModal.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  onShare: PropTypes.func.isRequired,
};

export default withStyles(styles)(ShareModal);
