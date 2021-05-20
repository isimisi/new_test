import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { mapSelectOptions, selectStyles } from '@api/ui/helper';
import Typography from '@material-ui/core/Typography';
import Select from 'react-select';
import Filter1Icon from '@material-ui/icons/Filter1';
import Filter2Icon from '@material-ui/icons/Filter2';
import Filter3Icon from '@material-ui/icons/Filter3';
import DeleteIcon from '@material-ui/icons/Delete';
import CallToActionIcon from '@material-ui/icons/CallToAction';
import QueueIcon from '@material-ui/icons/Queue';
import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import styles from './condition-jss';


const NodeForm = (props) => {
  const {
    classes,
    relationshipLabels
  } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5" component="h3" color="primary">
          Forbindelse
      </Typography>
      <div className={classes.subHeader} style={{ marginBottom: 15 }}>
        <Typography variant="subtitle1">
        Skal din forbindelse have en bestemt titel?
        </Typography>
      </div>
      <div className={classes.inlineWrap} style={{ alignItems: 'center' }}>
        <Filter1Icon />
        <div style={{ width: '80%', marginLeft: 20, marginRight: 20 }}>
          <Select
            classes={classes}
            styles={selectStyles}
            inputId="react-select-single"
            options={mapSelectOptions(relationshipLabels)}
          />
        </div>
        <IconButton
          color="primary"
          onClick={(e) => {
            setAnchorEl(e.currentTarget);
          }}
        >
          <CallToActionIcon />
        </IconButton>
      </div>
      <div className={classes.subHeader} style={{ marginBottom: 15 }}>
        <Typography variant="subtitle1">
        Skal din forbindelse have en bestemt værdi?
        </Typography>
      </div>
      <div className={classes.inlineWrap} style={{ alignItems: 'center' }}>
        <Filter1Icon />
        <div style={{ width: '80%', marginLeft: 20, marginRight: 20 }}>
          <Select
            classes={classes}
            styles={selectStyles}
            inputId="react-select-single"
            options={mapSelectOptions(relationshipLabels)}
          />
        </div>
      </div>
      <Popover
        id={anchorEl ? 'attrPopover' : undefined}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'top',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <IconButton
          style={{ color: 'red' }}
          onClick={() => {
            setAnchorEl(null);
            // dispatch(deleteConditionValue(actionIndex));
          }}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          color="primary"
          onClick={() => {
            setAnchorEl(null);
            // dispatch(addConditionValue());
          }}
        >
          <QueueIcon />
        </IconButton>
      </Popover>
    </Paper>
  );
};

NodeForm.propTypes = {
  classes: PropTypes.object.isRequired,
  relationshipLabels: PropTypes.array.isRequired
};

export default withStyles(styles)(NodeForm);
