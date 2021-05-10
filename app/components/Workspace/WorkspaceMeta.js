import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ComposeEmailForm from './WorkspaceForm';
import FloatingPanel from '../Panel/FloatingPanel';
import styles from './workspace-jss';

function WorkspaceMeta(props) {
  const {
    open,
    closeForm,
    sendEmail,
    to,
    subject,
    validMail,
    inputChange,
  } = props;
  const branch = '';
  return (
    <div>
      <FloatingPanel
        openForm={open}
        branch={branch}
        closeForm={closeForm}
        title="Edit Properties"// "Name your Workspace"
      >
        <ComposeEmailForm
          to={to}
          subject={subject}
          validMail={validMail}
          sendEmail={sendEmail}
          closeForm={closeForm}
          inputChange={inputChange}
        />
      </FloatingPanel>
    </div>
  );
}

WorkspaceMeta.propTypes = {
  open: PropTypes.bool.isRequired,
  to: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  validMail: PropTypes.string.isRequired,
  closeForm: PropTypes.func.isRequired,
  sendEmail: PropTypes.func.isRequired,
  inputChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(WorkspaceMeta);
