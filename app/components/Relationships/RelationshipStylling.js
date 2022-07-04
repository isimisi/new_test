/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import withStyles from '@mui/styles/withStyles';
import PropTypes from "prop-types";
import { SketchPicker } from "react-color";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import {
  colorChange,
  sizeChange,
} from "@pages/Relationships/reducers/relationshipActions";

const styles = () => ({
  root: {
    flexGrow: 1,
    padding: 30,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    marginTop: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  color: {
    width: "36px",
    height: "14px",
    borderRadius: "2px",
  },
  swatch: {
    padding: "5px",
    background: "#fff",
    borderRadius: 4,
    boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
    display: "inline-block",
    cursor: "pointer",
  },
  popover: {
    position: "absolute",
    zIndex: "2",
  },
  cover: {
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
  },
  size: {
    borderRadius: 5,
  },
});

const RelationshipStylling = (props) => {
  const dispatch = useDispatch();
  const { classes, color, size } = props;
  const { t } = useTranslation();

  const [displayColorPickerColor, setDisplayColorPickerColor] = useState(false);

  const handleClickColor = () => {
    setDisplayColorPickerColor((prevVal) => !prevVal);
  };

  const handleCloseColor = () => {
    setDisplayColorPickerColor(false);
  };

  const handleChangeColor = (col) => {
    dispatch(colorChange(col.rgb));
  };

  const handleSizeClick = (e) => {
    dispatch(sizeChange(e.target.textContent));
  };

  return (
    <Paper className={classes.root}>
      <Typography variant="h5" component="h3">
        {t("relationships.relationship-stylling.standard_look")}
      </Typography>
      <div className={classes.row}>
        <Typography variant="subtitle2" component="h3">
          {t("relationships.relationship-stylling.pick_a_label_size")}
        </Typography>
        <Button
          onClick={handleSizeClick}
          className={classes.size}
          size="small"
          variant="contained"
          color={size === "Small" ? "secondary" : ""}
        >
          {t("relationships.relationship-stylling.small")}
        </Button>
        <Button
          onClick={handleSizeClick}
          className={classes.size}
          size="small"
          variant="contained"
          color={size === "Medium" ? "secondary" : ""}
        >
          {t("relationships.relationship-stylling.medium")}
        </Button>
        <Button
          onClick={handleSizeClick}
          className={classes.size}
          size="small"
          variant="contained"
          color={size === "Large" ? "secondary" : ""}
        >
          {t("relationships.relationship-stylling.large")}
        </Button>
      </div>
      <div className={classes.row}>
        <Typography variant="subtitle2">
          {t("relationships.relationship-stylling.pick_a_color")}
        </Typography>
        <div className={classes.swatch} onClick={handleClickColor}>
          <div
            className={classes.color}
            style={{
              backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
            }}
          />
        </div>
        {displayColorPickerColor ? (
          <div className={classes.popover}>
            <div className={classes.cover} onClick={handleCloseColor} />
            <SketchPicker color={color} onChange={handleChangeColor} />
          </div>
        ) : null}
      </div>
    </Paper>
  );
};

RelationshipStylling.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.object.isRequired,
  size: PropTypes.string.isRequired,
};

export default withStyles(styles)(RelationshipStylling);
