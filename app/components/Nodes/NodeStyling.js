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

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 30
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
  const { classes } = props;
  const [selectedSize, setSelectedSize] = useState('Medium');

  const [displayColorPickerBackground, setDisplayColorPickerBackground] = useState(false);
  const [colorBackground, setColorBackground] = useState({
    r: '230',
    g: '230',
    b: '230',
    a: '1',
  });

  const handleClickBackground = () => {
    setDisplayColorPickerBackground(prevVal => !prevVal);
  };

  const handleCloseBackground = () => {
    setDisplayColorPickerBackground(false);
  };

  const handleChangeBackground = (col) => {
    setColorBackground(col.rgb);
    dispatch(backgroundChange(col.rgb));
  };

  const [displayColorPickerBorder, setDisplayColorPickerBorder] = useState(false);
  const [colorBorder, setColorBorder] = useState({
    r: '0',
    g: '0',
    b: '0',
    a: '1',
  });

  const handleClickBorder = () => {
    setDisplayColorPickerBorder(prevVal => !prevVal);
  };

  const handleCloseBorder = () => {
    setDisplayColorPickerBorder(false);
  };

  const handleChangeBorder = (col) => {
    setColorBorder(col.rgb);
    dispatch(borderChange(col.rgb));
  };

  const handleSizeClick = (e) => {
    setSelectedSize(e.target.textContent);
    dispatch(sizeChange(e.target.textContent));
  };


  return (
    <Paper className={classes.root}>
      <Typography variant="h5" component="h3">
        Style Your Node
      </Typography>
      <div className={classes.row}>
        <Typography variant="subtitle2" component="h3">
        Pick a size
        </Typography>
        <Button onClick={handleSizeClick} className={classes.size} size="small" variant="contained" color={selectedSize === 'Small' ? 'secondary' : ''}>Small</Button>
        <Button onClick={handleSizeClick} className={classes.size} size="small" variant="contained" color={selectedSize === 'Medium' ? 'secondary' : ''}>Medium</Button>
        <Button onClick={handleSizeClick} className={classes.size} size="small" variant="contained" color={selectedSize === 'Large' ? 'secondary' : ''}>Large</Button>
      </div>
      <div className={classes.row}>
        <Typography variant="subtitle2">
        Pick a Color for the Backgroud
        </Typography>
        <div className={classes.swatch} onClick={handleClickBackground}>
          <div className={classes.color} style={{ backgroundColor: `rgba(${colorBackground.r}, ${colorBackground.g}, ${colorBackground.b}, ${colorBackground.a})` }} />
        </div>
        { displayColorPickerBackground ? (
          <div className={classes.popover}>
            <div className={classes.cover} onClick={handleCloseBackground} />
            <SketchPicker color={colorBackground} onChange={handleChangeBackground} />
          </div>
        ) : null }
      </div>
      <div className={classes.row}>
        <Typography variant="subtitle2">
        Pick a Color for the Border
        </Typography>
        <div className={classes.swatch} onClick={handleClickBorder}>
          <div className={classes.color} style={{ backgroundColor: `rgba(${colorBorder.r}, ${colorBorder.g}, ${colorBorder.b}, ${colorBorder.a})` }} />
        </div>
        { displayColorPickerBorder ? (
          <div className={classes.popover}>
            <div className={classes.cover} onClick={handleCloseBorder} />
            <SketchPicker color={colorBorder} onChange={handleChangeBorder} />
          </div>
        ) : null }
      </div>
    </Paper>
  );
};

NodeStyling.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NodeStyling);
