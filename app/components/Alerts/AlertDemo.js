import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const styles = () => ({
  root: {
    flexGrow: 1,
    padding: 30,
    display: 'flex',
    flexDirection: 'column',
    height: 384.63,
  },
});


const AlertDemo = props => {
  const {
    classes,
    title,
    description,
    border,
    disabled,
    handleSeeCondition
  } = props;

  return (
    <Paper className={classes.root} variant={border ? 'outlined' : 'elevation'}>
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={!disabled}
          color="primary"
          variant="outlined"
          size="large"
          onClick={handleSeeCondition}
        >
            Se betingelse
        </Button>
        <Button disabled color="secondary" variant="outlined" size="large">
            Luk
        </Button>
      </DialogActions>
    </Paper>
  );
};

AlertDemo.defaultProps = {
  border: false,
  disabled: false,
  handleSeeCondition: () => {}
};

AlertDemo.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  border: PropTypes.bool,
  disabled: PropTypes.bool,
  handleSeeCondition: PropTypes.func
};


export default withStyles(styles)(AlertDemo);
