/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles, useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";
import css from "@styles/Form.scss";
import "@styles/vendors/react-draft-wysiwyg/react-draft-wysiwyg.css";
import Select from "react-select";
import { mapSelectOptions, selectStyles } from "@api/ui/helper";
import CreatableSelect from "react-select/creatable";
import { SketchPicker } from "react-color";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import ButtonBase from "@material-ui/core/ButtonBase";
import styles from "../workspace-jss";
import BeizerCurve from "./beizerCurve.svg";
import StraightLine from "./straightLine.svg";
import SmoothStep from "./smoothStep.svg";

export const relationshipTypeOptions = [
  {
    value: "straight",
    label: (
      <>
        <span style={{ paddingRight: "5px" }}>Lige linje</span>
        <img src={StraightLine} alt="straight line" style={{ height: 25 }} />
      </>
    ),
  },
  {
    value: "custom",
    label: (
      <>
        <span style={{ paddingRight: "5px" }}>Beizer Kurve</span>
        <img src={BeizerCurve} alt="beizer curve" style={{ height: 25 }} />
      </>
    ),
  },
  {
    value: "smoothstep",
    label: (
      <>
        <span style={{ paddingRight: "5px" }}>Step kurve</span>
        <img src={SmoothStep} alt="smooth step" style={{ height: 25 }} />
      </>
    ),
  },
];

const EdgeForm = (props) => {
  const {
    classes,
    close,
    relationshipLabel,
    handleChangeLabel,
    relationshipValue,
    handleChangeValue,
    type,
    handleTypeChange,
    color,
    handleColorChange,
    showArrow,
    handleShowArrowChange,
    animatedLine,
    handleAnimatedLineChange,
    showLabel,
    handleShowLabelChange,
    lineThrough,
    handleLineThroughChange,
    handleSave,
    relationships: iRelationships,
    isUpdatingElement,
    handleDeleteEdge,
  } = props;
  const [displayColorPickerColor, setDisplayColorPickerColor] = useState();
  const editable = relationshipLabel.length === 0;
  const relationships = iRelationships.toJS();
  const choosenRelationship = relationships.find((r) => r.label === relationshipLabel);
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <div>
      <section className={css.bodyForm}>
        <div className={classes.field}>
          <CreatableSelect
            styles={selectStyles()}
            noOptionsMessage={() => t("generic.no_options")}
            formatCreateLabel={(input) => t("generic.create_new", { input })}
            menuPortalTarget={document.body}
            menuPlacement="auto"
            menuPosition="absolute"
            inputId="react-select-single-edgelabel"
            TextFieldProps={{
              label: "label",
              InputLabelProps: {
                htmlFor: "react-select-single-edgelabel",
                shrink: true,
              },
              placeholder: "label",
            }}
            placeholder="label"
            options={mapSelectOptions(
              relationships.map((r) => ({ value: r?.label, label: r?.description }))
            )}
            value={
              relationshipLabel && { label: relationshipLabel, value: relationshipLabel }
            }
            onChange={handleChangeLabel}
          />
        </div>
        {!editable ? (
          choosenRelationship.use_suggestions === 0 ? (
            <TextField
              name="Værdi"
              className={classes.field}
              placeholder="Værdi"
              label="Værdi"
              value={relationshipValue}
              onChange={handleChangeValue}
            />
          ) : (
            <div className={classes.field} style={{ marginTop: 20 }}>
              <CreatableSelect
                isClearable
                styles={selectStyles()}
                noOptionsMessage={() => t("generic.no_options")}
                formatCreateLabel={(input) => t("generic.create_new", { input })}
                menuPortalTarget={document.body}
                menuPlacement="auto"
                menuPosition="absolute"
                inputId="react-select-single-edge-value"
                TextFieldProps={{
                  label: "Værdi",
                  InputLabelProps: {
                    htmlFor: "react-select-single-edge-value",
                    shrink: true,
                  },
                  placeholder: "Værdi",
                }}
                placeholder="Værdi"
                options={
                  choosenRelationship &&
                  choosenRelationship.values.map((r) => ({ value: r, label: r }))
                }
                value={
                  relationshipValue && {
                    label: relationshipValue,
                    value: relationshipValue,
                  }
                }
                onChange={handleChangeValue}
              />
            </div>
          )
        ) : null}
        <div className={classes.field} style={{ marginTop: 20 }}>
          <Select
            classes={classes}
            menuPortalTarget={document.body}
            menuPlacement="auto"
            menuPosition="absolute"
            styles={selectStyles()}
            inputId="react-select-single-edge-workspace-type"
            TextFieldProps={{
              label: "type",
              InputLabelProps: {
                htmlFor: "react-select-single-edge-workspace-type",
                shrink: true,
              },
              placeholder: "type",
            }}
            placeholder="type"
            options={relationshipTypeOptions}
            value={type && relationshipTypeOptions.find((x) => x.value === type)}
            onChange={handleTypeChange}
          />
        </div>

        <div className={classes.colorRow}>
          <Typography variant="subtitle2">Pick a Color</Typography>
          <div
            className={classes.swatch}
            onClick={() => !editable && setDisplayColorPickerColor((prevVal) => !prevVal)}
          >
            <div
              className={classes.color}
              style={{
                backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
              }}
            />
          </div>
          {displayColorPickerColor ? (
            <div className={classes.popover}>
              <div
                className={classes.cover}
                onClick={() => setDisplayColorPickerColor(false)}
              />
              <SketchPicker color={color} onChange={handleColorChange} />
            </div>
          ) : null}
        </div>
        <ButtonBase className={classes.row} onClick={handleShowArrowChange}>
          <Checkbox
            checked={showArrow}
            name="arrow"
            color="primary"
            disabled={editable}
          />
          <Typography variant="subtitle2">Vis som pil</Typography>
        </ButtonBase>
        <ButtonBase className={classes.row} onClick={handleAnimatedLineChange}>
          <Checkbox
            checked={animatedLine}
            name="animated"
            color="primary"
            disabled={editable}
          />
          <Typography variant="subtitle2">Animeret linje</Typography>
        </ButtonBase>
        <ButtonBase className={classes.row} onClick={handleLineThroughChange}>
          <Checkbox
            checked={lineThrough}
            name="line through"
            color="primary"
            disabled={editable}
          />
          <Typography variant="subtitle2">Vis som overstreget</Typography>
        </ButtonBase>
        <ButtonBase className={classes.row} onClick={handleShowLabelChange}>
          <Checkbox
            checked={showLabel}
            name="show label"
            color="primary"
            disabled={editable}
          />
          <Typography variant="subtitle2">Vis label</Typography>
        </ButtonBase>
      </section>
      <div className={css.buttonArea}>
        {isUpdatingElement && (
          <Button
            variant="contained"
            type="button"
            onClick={handleDeleteEdge}
            style={{ backgroundColor: theme.palette.error.dark, color: "white" }}
          >
            Delete
          </Button>
        )}
        <Button type="button" onClick={() => close()}>
          Annuller
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={handleSave}
          disabled={relationshipLabel.length === 0 && relationshipValue === 0}
        >
          Gem
        </Button>
      </div>
    </div>
  );
};

EdgeForm.propTypes = {
  classes: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
  relationshipLabel: PropTypes.string.isRequired,
  handleChangeLabel: PropTypes.func.isRequired,
  relationshipValue: PropTypes.string.isRequired,
  handleChangeValue: PropTypes.func.isRequired,
  type: PropTypes.string,
  handleTypeChange: PropTypes.func.isRequired,
  color: PropTypes.object.isRequired,
  handleColorChange: PropTypes.func.isRequired,
  showArrow: PropTypes.bool.isRequired,
  handleShowArrowChange: PropTypes.func.isRequired,
  animatedLine: PropTypes.bool.isRequired,
  handleAnimatedLineChange: PropTypes.func.isRequired,
  showLabel: PropTypes.bool.isRequired,
  handleShowLabelChange: PropTypes.func.isRequired,
  lineThrough: PropTypes.bool.isRequired,
  handleLineThroughChange: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  relationships: PropTypes.object.isRequired,
  isUpdatingElement: PropTypes.bool.isRequired,
  handleDeleteEdge: PropTypes.func.isRequired,
};

export default withStyles(styles)(EdgeForm);
