import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Select from 'react-select';
import { useDispatch, } from 'react-redux';
import { mapSelectOptions, selectStyles } from '@api/ui/helper';
import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CallToActionIcon from '@material-ui/icons/CallToAction';
import QueueIcon from '@material-ui/icons/Queue';
import Button from '@material-ui/core/Button';
import {
  addType, addConditionValue, changeConditionValue, deleteConditionValue
} from '../../containers/Pages/Conditions/reducers/conditionActions';
import styles from './condition-jss';


const NodeForm = (props) => {
  const {
    classes,
    type,
    conditionValues,
    andOrOption,
    nodeAttributes,
    comparisonsOptions,
    attrType
  } = props;

  const dispatch = useDispatch();
  const [anchorElNode, setAnchorElNode] = useState(null);
  const [anchorElAttr, setAnchorElAttr] = useState(null);
  const [actionIndex, setActionIndex] = useState(0);

  const handleChange = (value, index, _type) => {
    const newArray = [...conditionValues];
    newArray[index] = { ...newArray[index], [_type]: value };
    dispatch(changeConditionValue(newArray));
  };

  return (
    <Paper className={classes.paper}>
      <div className={classes.inlineWrap} style={{ justifyContent: 'space-between' }}>
        <Typography variant="h5" component="h3" color="primary">
          {type[0].toUpperCase() + type.slice(1)}
        </Typography>
        {type === 'afsender' && (
          <Button variant="contained" color="secondary" onClick={(e) => setAnchorElNode(e.currentTarget)}>
            Tilføj kilde
          </Button>
        )}
      </div>
      <div className={classes.subHeader}>
        <Typography variant="subtitle1">
        Skal din
          {' '}
          {type}
          {' '}
        have en bestemt titel?
        </Typography>
      </div>
      <div>
        <TextField
          name="title"
          placeholder="Title"
          label="Title"
          className={classes.field}
        />
      </div>
      <div className={classes.inlineWrap}>
        <div className={classes.subHeader} style={{ marginBottom: 15 }}>
          <Typography variant="subtitle1">
        Skal din
            {' '}
            {type}
            {' '}
        have nogle kendetegn?
          </Typography>
        </div>
        {conditionValues.length > 1 && (
          <div className={classes.select}>
            <Select
              classes={classes}
              styles={selectStyles}
              inputId="react-select-single"
              options={andOrOption}
              value={attrType && { label: attrType, value: attrType }}
              onChange={(value) => dispatch(addType(value.value))}
            />
          </div>
        )}
      </div>
      {conditionValues.map((row, index) => (
        <>
          <div className={classes.inlineWrap}>
            <div className={classes.attrField} style={{ marginLeft: 0 }}>
              <Select
                classes={classes}
                styles={selectStyles}
                inputId="react-select-single"
                options={mapSelectOptions(nodeAttributes)}
                value={row.build_value && { label: row.build_value, value: row.build_value }}
                onChange={(value) => handleChange(value.value, index, 'build_value')}
              />
            </div>
            <div className={classes.attrField}>
              <Select
                classes={classes}
                styles={selectStyles}
                inputId="react-select-single"
                options={comparisonsOptions}
                value={row.comparison_type && { label: row.comparison_type, value: row.comparison_type }}
                onChange={(value) => handleChange(value.value, index, 'comparison_type')}
              />
            </div>
            <IconButton
              color="primary"
              style={{ alignSelf: 'center', top: -10, left: 10 }}
              onClick={(e) => {
                setActionIndex(index);
                setAnchorElAttr(e.currentTarget);
              }}
            >
              <CallToActionIcon />
            </IconButton>
          </div>
          {!['exists', 'does not exist'].includes(row.comparison_type) && (
            <div className={classes.attrField} style={{ marginLeft: 0 }}>
              <TextField
                value={row.comparison_value}
                placeholder="Value"
                onChange={(e) => handleChange(e.target.value, index, 'comparison_value')}
              />
            </div>
          )}
        </>
      ))}
      <Popover
        id={anchorElAttr ? 'attrPopover' : undefined}
        open={Boolean(anchorElAttr)}
        anchorEl={anchorElAttr}
        onClose={() => setAnchorElAttr(null)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'top',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        {actionIndex > 0 && (
          <IconButton
            style={{ color: 'red' }}
            onClick={() => {
              setAnchorElAttr(null);
              dispatch(deleteConditionValue(actionIndex));
            }}
          >
            <DeleteIcon />
          </IconButton>
        )}
        <IconButton
          color="primary"
          onClick={() => {
            setAnchorElAttr(null);
            dispatch(addConditionValue());
          }}
        >
          <QueueIcon />
        </IconButton>
      </Popover>
      <Popover
        id={anchorElNode ? 'nodePopover' : undefined}
        open={Boolean(anchorElNode)}
        anchorEl={anchorElNode}
        onClose={() => setAnchorElNode(null)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'top',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Button style={{ margin: 5 }} variant="contained" color="primary">
            Forælder
        </Button>
        <Button style={{ margin: 5 }} variant="contained" color="primary">
            Søster
        </Button>
      </Popover>
    </Paper>
  );
};

NodeForm.propTypes = {
  classes: PropTypes.object.isRequired,
  conditionValues: PropTypes.any.isRequired,
  type: PropTypes.string.isRequired,
  attrType: PropTypes.string.isRequired,
  andOrOption: PropTypes.any.isRequired,
  nodeAttributes: PropTypes.any.isRequired,
  comparisonsOptions: PropTypes.any.isRequired
};

export default withStyles(styles)(NodeForm);
