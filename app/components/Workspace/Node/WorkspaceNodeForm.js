/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles, useTheme } from "@material-ui/core/styles";
import Select from "react-select";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import css from "@styles/Form.scss";
import "@styles/vendors/react-draft-wysiwyg/react-draft-wysiwyg.css";
import { selectStyles } from "@api/ui/helper";
import { SketchPicker } from "react-color";
import Typography from "@material-ui/core/Typography";
import { red } from "@api/palette/colorfull";
import CreatableSelect from "react-select/creatable";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import styles from "../workspace-jss";
import square from "./square.svg";
import triangle from "./triangle.svg";
import circle from "./circle.svg";
import person from "./person.svg";

export const figurTypeOptions = [
  {
    value: "triangle",
    label: (
      <>
        <img src={triangle} alt="triangle" style={{ height: 26 }} />
      </>
    ),
  },
  {
    value: "square",
    label: (
      <>
        <img src={square} alt="square" style={{ height: 26 }} />
      </>
    ),
  },
  {
    value: "circle",
    label: (
      <>
        <img src={circle} alt="circle" style={{ height: 26 }} />
      </>
    ),
  },
  {
    value: "person",
    label: (
      <>
        <img src={person} alt="person" style={{ height: 26 }} />
      </>
    ),
  },
];

const WorkspaceNodeForm = (props) => {
  const {
    classes,
    nodes,
    nodeLabel,
    handleChangeLabel,
    attributes,
    handleChangeAttributes,
    nodeColor,
    handleChangeColor,
    nodeBorderColor,
    handleBorderColorChange,
    handleNodeSave,
    nodeDisplayName,
    handleDisplayNameChange,
    isUpdatingElement,
    handleDeleteNode,
    attributesDropDownOptions,
    handleRemoveAttributes,
    nodeFigur,
    handleNodeFigurChange,
  } = props;
  const [displayColorPickerColor, setDisplayColorPickerColor] = useState();
  const [displayBorderColorPickerColor, setDisplayBorderColorPickerColor] = useState();
  const choosenNode = nodes.find((r) => r.label === nodeLabel);
  const theme = useTheme();

  return (
    <div>
      <section className={css.bodyForm}>
        <div className={classes.field}>
          <CreatableSelect
            classes={classes}
            styles={selectStyles()}
            inputId="react-select-single-workspace-node"
            autoFocus
            TextFieldProps={{
              label: "Element",
              InputLabelProps: {
                htmlFor: "react-select-single-workspace-node",
                shrink: true,
              },
              placeholder: "Element",
            }}
            placeholder="Vælg dit element"
            options={nodes.map((n) => ({ value: n.label, label: n.label }))}
            value={nodeLabel && { label: nodeLabel, value: nodeLabel }}
            onChange={handleChangeLabel}
            menuPortalTarget={document.body}
            menuPlacement="auto"
            menuPosition="absolute"
          />
        </div>
        {choosenNode && (
          <>
            <div>
              <TextField
                name="displayName"
                className={classes.field}
                placeholder="Alias"
                label="Alias"
                value={nodeDisplayName}
                onChange={handleDisplayNameChange}
              />
            </div>
          </>
        )}
        {choosenNode &&
          attributes.map((attribut, index) => (
            <div className={classes.inlineWrap} style={{ marginTop: 15 }}>
              <div className={classes.field}>
                <CreatableSelect
                  styles={selectStyles()}
                  menuPortalTarget={document.body}
                  menuPlacement="auto"
                  menuPosition="absolute"
                  placeholder="Kendetegn"
                  options={attributesDropDownOptions}
                  value={
                    attribut.label && { label: attribut.label, value: attribut.label }
                  }
                  isDisabled={Boolean(attribut.label)}
                  isOptionDisabled={(option) =>
                    attributes.map((a) => a.label).includes(option.label)
                  }
                  onChange={(value) => {
                    const newRow = { ...attribut };
                    newRow.label = value.label;
                    newRow.type = value.type || "Value";
                    newRow.selectionOptions = value.selectionOptions || null;

                    const i = attributes.length - 1;
                    const mutableArray = [...attributes];
                    mutableArray.splice(i, 0, newRow);
                    handleChangeAttributes(mutableArray, { ...newRow }, value.__isNew__);
                  }}
                />
              </div>
              {attribut.label && (
                <>
                  <div className={classes.field} style={{ marginLeft: 20 }}>
                    {attribut.type === "Value" ? (
                      <TextField
                        value={attribut.value}
                        placeholder="Værdi"
                        onChange={(e) => {
                          const newArray = [...attributes];
                          newArray[index] = { ...newArray[index], value: e.target.value };

                          handleChangeAttributes(newArray);
                        }}
                      />
                    ) : (
                      <CreatableSelect
                        styles={selectStyles()}
                        placeholder="Værdi"
                        options={JSON.parse(attribut.selectionOptions)}
                        value={
                          attribut.value && {
                            label: attribut.value,
                            value: attribut.value,
                          }
                        }
                        onChange={(value) => {
                          const newArray = [...attributes];
                          newArray[index] = { ...newArray[index], value: value.value };

                          handleChangeAttributes(newArray);
                        }}
                      />
                    )}
                  </div>
                  <IconButton
                    style={{ bottom: 3 }}
                    onClick={() => {
                      const newArray = [...attributes];
                      newArray[index] = {
                        ...newArray[index],
                        show: !newArray[index].show,
                      };

                      handleChangeAttributes(newArray);
                    }}
                  >
                    {attribut.show ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                  <IconButton
                    style={{ color: `${red}55`, bottom: 5 }}
                    onClick={() =>
                      handleRemoveAttributes(attribut.workspace_node_attribut_id, index)
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              )}
            </div>
          ))}
        {choosenNode && (
          <>
            <div className={classes.field} style={{ marginTop: 20 }}>
              <Select
                classes={classes}
                styles={{ ...selectStyles(), padding: 10 }}
                menuPortalTarget={document.body}
                menuPlacement="auto"
                menuPosition="absolute"
                isClearable
                inputId="react-select-single-edge-type"
                TextFieldProps={{
                  label: "type",
                  InputLabelProps: {
                    htmlFor: "react-select-single-edge-type",
                    shrink: true,
                  },
                  placeholder: "type",
                }}
                placeholder="type"
                options={figurTypeOptions}
                value={nodeFigur && figurTypeOptions.find((x) => x.value === nodeFigur)}
                onChange={handleNodeFigurChange}
              />
            </div>
            <div className={classes.row} style={{ marginTop: 10 }}>
              <Typography variant="subtitle2">Vælg en farve for dit element</Typography>
              <div
                className={classes.swatch}
                onClick={() => setDisplayColorPickerColor((prevVal) => !prevVal)}
              >
                <div
                  className={classes.color}
                  style={{
                    backgroundColor: `rgba(${nodeColor.r}, ${nodeColor.g}, ${
                      nodeColor.b
                    }, ${nodeColor.a})`,
                  }}
                />
              </div>
              {displayColorPickerColor ? (
                <div className={classes.popover}>
                  <div
                    className={classes.cover}
                    onClick={() => setDisplayColorPickerColor(false)}
                  />
                  <SketchPicker color={nodeColor} onChange={handleChangeColor} />
                </div>
              ) : null}
            </div>
            <div className={classes.row} style={{ marginTop: 10 }}>
              <Typography variant="subtitle2">
                Vælg en farve for kanterne på dit element
              </Typography>
              <div
                className={classes.swatch}
                onClick={() => setDisplayBorderColorPickerColor((prevVal) => !prevVal)}
              >
                <div
                  className={classes.color}
                  style={{
                    backgroundColor: `rgba(${nodeBorderColor.r}, ${nodeBorderColor.g}, ${
                      nodeBorderColor.b
                    }, ${nodeBorderColor.a})`,
                  }}
                />
              </div>
              {displayBorderColorPickerColor ? (
                <div className={classes.popover}>
                  <div
                    className={classes.cover}
                    onClick={() => setDisplayBorderColorPickerColor(false)}
                  />
                  <SketchPicker
                    color={nodeBorderColor}
                    onChange={handleBorderColorChange}
                  />
                </div>
              ) : null}
            </div>
          </>
        )}
      </section>
      <div className={css.buttonArea}>
        {isUpdatingElement && (
          <Button
            variant="contained"
            type="button"
            onClick={handleDeleteNode}
            style={{
              backgroundColor: theme.palette.error.dark,
              color: "white",
              marginRight: 10,
            }}
          >
            Slet
          </Button>
        )}
        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={handleNodeSave}
          disabled={!choosenNode}
        >
          Gem
        </Button>
      </div>
    </div>
  );
};

WorkspaceNodeForm.propTypes = {
  classes: PropTypes.object.isRequired,
  nodes: PropTypes.array.isRequired,
  nodeLabel: PropTypes.string.isRequired,
  handleChangeLabel: PropTypes.func.isRequired,
  attributes: PropTypes.array.isRequired,
  handleChangeAttributes: PropTypes.func.isRequired,
  nodeColor: PropTypes.object.isRequired,
  handleChangeColor: PropTypes.func.isRequired,
  nodeBorderColor: PropTypes.object.isRequired,
  handleBorderColorChange: PropTypes.func.isRequired,
  handleNodeSave: PropTypes.func.isRequired,
  nodeDisplayName: PropTypes.string.isRequired,
  handleDisplayNameChange: PropTypes.func.isRequired,
  isUpdatingElement: PropTypes.bool.isRequired,
  handleDeleteNode: PropTypes.func.isRequired,
  attributesDropDownOptions: PropTypes.array.isRequired,
  handleRemoveAttributes: PropTypes.func.isRequired,
  nodeFigur: PropTypes.string,
  handleNodeFigurChange: PropTypes.func.isRequired,
};

WorkspaceNodeForm.defaultProps = {
  nodeFigur: null,
};

export default withStyles(styles)(WorkspaceNodeForm);
