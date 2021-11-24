/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { SketchPicker } from 'react-color';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import {
  backgroundChange, borderChange, sizeChange
} from '../../containers/Pages/Nodes/reducers/nodeActions';
import { useTranslation } from 'react-i18next';

const styles = () => ({
  root: {
    flexGrow: 1,
    padding: 30,
    marginTop: 10
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  color: {
    width: '36px',
    height: '14px',
    borderRadius: '2px',
  },
  swatch: {
    padding: '5px',
    background: '#fff',
    borderRadius: 4,
    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
    display: 'inline-block',
    cursor: 'pointer',
  },
  popover: {
    position: 'absolute',
    zIndex: '2',
  },
  cover: {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  },
  size: {
    borderRadius: 5,
  }
});

const NodeStyling = (props) => {
  const dispatch = useDispatch();
  const {
    classes,
    size,
    backgroundColor,
    borderColor
  } = props;
  const {t} = useTranslation();

  const [displayColorPickerBackground, setDisplayColorPickerBackground] = useState(false);

  const handleClickBackground = () => {
    setDisplayColorPickerBackground(prevVal => !prevVal);
  };

  const handleCloseBackground = () => {
    setDisplayColorPickerBackground(false);
  };

  const handleChangeBackground = (col) => {
    dispatch(backgroundChange(col.rgb));
  };

  const [displayColorPickerBorder, setDisplayColorPickerBorder] = useState(false);

  const handleClickBorder = () => {
    setDisplayColorPickerBorder(prevVal => !prevVal);
  };

  const handleCloseBorder = () => {
    setDisplayColorPickerBorder(false);
  };

  const handleChangeBorder = (col) => {
    dispatch(borderChange(col.rgb));
  };

  const handleSizeClick = (e) => {
    dispatch(sizeChange(e.target.textContent));
  };


  return (
    <Paper className={classes.root}>
      <Typography variant="h5" component="h3">
        {t('nodes.node-styling.standard-look')}
      </Typography>
      <div className={classes.row}>
        <Typography variant="subtitle2" component="h3">
        {t('nodes.node-styling.size')}
        </Typography>
        <Button onClick={handleSizeClick} className={classes.size} size="small" variant="contained" color={size === 'Small' ? 'secondary' : ''}>{t('nodes.node-styling.small')}</Button>
        <Button onClick={handleSizeClick} className={classes.size} size="small" variant="contained" color={size === 'Medium' ? 'secondary' : ''}>{t('nodes.node-styling.medium')}</Button>
        <Button onClick={handleSizeClick} className={classes.size} size="small" variant="contained" color={size === 'Large' ? 'secondary' : ''}>{t('nodes.node-styling.large')}</Button>
      </div>
      <div className={classes.row}>
        <Typography variant="subtitle2">
        {t('nodes.node-styling.color')}
        </Typography>
        <div className={classes.swatch} onClick={handleClickBackground}>
          <div className={classes.color} style={{ backgroundColor: `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})` }} />
        </div>
        { displayColorPickerBackground ? (
          <div className={classes.popover}>
            <div className={classes.cover} onClick={handleCloseBackground} />
            <SketchPicker color={backgroundColor} onChange={handleChangeBackground} />
          </div>
        ) : null }
      </div>
      <div className={classes.row}>
        <Typography variant="subtitle2">
        {t('nodes.node-styling.border_color')}
        </Typography>
        <div className={classes.swatch} onClick={handleClickBorder}>
          <div className={classes.color} style={{ backgroundColor: `rgba(${borderColor.r}, ${borderColor.g}, ${borderColor.b}, ${borderColor.a})` }} />
        </div>
        { displayColorPickerBorder ? (
          <div className={classes.popover}>
            <div className={classes.cover} onClick={handleCloseBorder} />
            <SketchPicker color={borderColor} onChange={handleChangeBorder} />
          </div>
        ) : null }
      </div>
    </Paper>
  );
};

NodeStyling.propTypes = {
  classes: PropTypes.object.isRequired,
  size: PropTypes.string.isRequired,
  backgroundColor: PropTypes.any.isRequired,
  borderColor: PropTypes.any.isRequired,
};

export default withStyles(styles)(NodeStyling);
