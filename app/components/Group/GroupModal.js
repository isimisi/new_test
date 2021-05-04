import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import GroupForm from '../Forms/GroupForm';

function getModalStyle() {
  return {
    top: '50%',
    left: '50%',
    borderRadius: 10,
    transform: 'translate(-50%, -50%)',
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing(50),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
  },
});

const GroupModal = props => {
  const {
    classes,
    open,
    setOpen,
    title,
    description,
    image,
    handleSubmit
  } = props;

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={() => setOpen(false)}
    >
      <div style={getModalStyle()} className={classes.paper}>
        <GroupForm
          title={title}
          description={description}
          image={image}
          handleSubmit={handleSubmit}
        />
      </div>
    </Modal>
  );
};


GroupModal.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(GroupModal);
