import React, { MouseEvent, useState, memo } from "react";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";

import Fade from "@material-ui/core/Fade";
import { useTranslation } from "react-i18next";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Divider from "@material-ui/core/Divider";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import { withStyles } from "@material-ui/core/styles";
import styles from "../workspace-jss";
import { RGBA, SelectChoice } from "@customTypes/data";
import ListIcon from "@material-ui/icons/List";
import { SketchPicker, ColorResult } from "react-color";
import LabelIcon from "@material-ui/icons/Label";
import ButtonBase from "@material-ui/core/ButtonBase";
import InfoIcon from "@material-ui/icons/Info";
import CreatableSelect from "react-select/creatable";
import { selectStyles } from "@api/ui/helper";
import Select from "react-select";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { red } from "@api/palette/colorfull";
import TextField from "@material-ui/core/TextField";
import { figurTypeOptions } from "./WorkspaceNodeForm";
import ReactDOM from "react-dom";
import FormatColorTextIcon from "@material-ui/icons/FormatColorText";
import { Node } from "react-flow-renderer10";
import { NodeData } from "@customTypes/reducers/workspace";

interface Props {
  classes: any;
  nodePopperRef: EventTarget | null;
  showNodePopper: boolean;
  currentZoom: number;
  close: () => void;
  nodeBorderColor: RGBA;
  handleBorderColorChange: (color: ColorResult) => void;
  nodeColor: RGBA;
  handleColorChange: (color: ColorResult) => void;
  nodes: any[];
  nodeLabel: string;
  handleChangeLabel: (label: SelectChoice) => void;
  handleNodeSave: () => void;
  editData: (
    event: MouseEvent,
    element: Node<NodeData>,
    showFull: boolean
  ) => void;
  getCompanyData: (id) => void;
  loading: boolean;
  activeElement: Node<NodeData>;
  attributesDropDownOptions: any;
  attributes: any;
  handleChangeAttributes: any;
  handelRemoveAttributes: any;
  handleNodeFigur: any;
  nodeFigur: any;
  removeNodeTextTarget: () => void;
  nodeLabelColor: RGBA;
  handleLabelColorChange: (color: RGBA) => void;
}

const NodePopper = (props: Props) => {
  const {
    classes,
    nodePopperRef,
    showNodePopper,
    currentZoom,
    nodeBorderColor,
    handleBorderColorChange,
    nodeColor,
    handleColorChange,
    nodes,
    nodeLabel,
    handleChangeLabel,
    editData,
    getCompanyData,
    handleNodeSave,
    loading,
    attributesDropDownOptions,
    attributes,
    handleChangeAttributes,
    handelRemoveAttributes,
    handleNodeFigur,
    nodeFigur,
    removeNodeTextTarget,
    nodeLabelColor,
    handleLabelColorChange
  } = props;
  // eslint-disable-next-line react/destructuring-assignment
  const activeElement = props.activeElement as Node<NodeData>;

  const choosenNode = nodes.find(r => r.label === nodeLabel);
  const { t } = useTranslation();
  const [labelRef, setLabelRef] = useState<EventTarget | null>(null);
  const [attributRef, setAttributRefRef] = useState<EventTarget | null>(null);
  const [typeRef, setTypeRef] = useState<EventTarget | null>(null);

  const [displayColorPickerColor, setDisplayColorPickerColor] = useState(false);
  const [
    displayBorderColorPickerColor,
    setDisplayBorderColorPickerColor
  ] = useState(false);
  const [
    displayLabelColorPickerColor,
    setDisplayLabelColorPickerColor
  ] = useState(false);

  const toggleDisplayColor = () => {
    setTypeRef(null);
    setDisplayLabelColorPickerColor(false);
    setDisplayBorderColorPickerColor(false);
    setAttributRefRef(null);
    setLabelRef(null);
    setDisplayColorPickerColor(prevVal => !prevVal);
  };

  const toggleDisplayBorderColor = () => {
    setTypeRef(null);
    setDisplayLabelColorPickerColor(false);
    setDisplayColorPickerColor(false);
    setLabelRef(null);
    setAttributRefRef(null);
    setDisplayBorderColorPickerColor(prevVal => !prevVal);
  };

  const toggleDisplayLabelColor = () => {
    setTypeRef(null);
    setDisplayColorPickerColor(false);
    setLabelRef(null);
    setAttributRefRef(null);
    setDisplayBorderColorPickerColor(false);
    setDisplayLabelColorPickerColor(prevVal => !prevVal);
  };

  const toggleLabelMenu = e => {
    removeNodeTextTarget();
    setDisplayLabelColorPickerColor(false);
    setTypeRef(null);
    setDisplayBorderColorPickerColor(false);
    setDisplayColorPickerColor(false);
    setAttributRefRef(null);
    setLabelRef(prevVal => (!prevVal ? e.target : null));
  };

  const toggleAttributMenu = e => {
    setTypeRef(null);
    setDisplayLabelColorPickerColor(false);
    setDisplayBorderColorPickerColor(false);
    setDisplayColorPickerColor(false);
    setLabelRef(null);
    setAttributRefRef(prevVal => (!prevVal ? e.target : null));
  };

  const toggleTypeMenu = e => {
    setDisplayBorderColorPickerColor(false);
    setDisplayLabelColorPickerColor(false);
    setDisplayColorPickerColor(false);
    setAttributRefRef(null);
    setLabelRef(null);
    setTypeRef(prevVal => (!prevVal ? e.target : null));
  };

  const handleEditData = e => {
    removeNodeTextTarget();
    editData(e, activeElement, true);
  };

  const handleGetCompanyData = () => getCompanyData(activeElement.id);

  const handleContextMenu = () => {
    const node = document.querySelector(`[data-id="${activeElement.id}"]`);

    if (node) {
      const event = new MouseEvent("contextmenu", {
        bubbles: true,
        cancelable: false,
        view: window,
        button: 2,
        buttons: 0,
        clientX: node.getBoundingClientRect().x + 400,
        clientY: node.getBoundingClientRect().y - 20
      });
      node.dispatchEvent(event);
    }
  };

  const handleSave = () => {
    setLabelRef(null);
    setAttributRefRef(null);
    setTypeRef(null);
    setDisplayBorderColorPickerColor(false);
    setDisplayColorPickerColor(false);
    handleNodeSave();
  };
  const figurValue = React.useMemo(
    () => nodeFigur && figurTypeOptions.find(x => x.value === nodeFigur),
    [nodeFigur]
  );

  React.useEffect(() => {
    const picker = document.getElementsByClassName("sketch-picker");

    if (picker.length > 0) {
      let div = document.getElementById("saveContainer");

      if (!div) {
        div = document.createElement("div");
        div.setAttribute("id", "saveContainer");
        picker[0].appendChild(div);
      }
      // @ts-ignore

      ReactDOM.render(
        <div className={classes.attributSaveButtonContainer}>
          <button
            className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary"
            tabIndex={0}
            type="button"
            onClick={handleSave}
          >
            <span className="MuiButton-label">Gem</span>
            <span className="MuiTouchRipple-root" />
          </button>
        </div>,
        div
      );
    }
  }, [
    displayBorderColorPickerColor,
    displayColorPickerColor,
    nodeColor,
    nodeBorderColor,
    displayLabelColorPickerColor,
    nodeLabelColor
  ]);

  return (
    <>
      <Popper
        open={Boolean(nodePopperRef) && showNodePopper}
        // @ts-ignore
        anchorEl={nodePopperRef}
        role={undefined}
        transition
        style={{ zIndex: 1000, marginBottom: 30 * currentZoom }}
        placement="top"
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={{ enter: 50 }}>
            <Paper elevation={6} className={classes.nodePopper}>
              <Button variant="text" color="primary" onClick={handleEditData}>
                {t("workspace.edit_node_data")}
              </Button>
              <Divider
                flexItem
                className={classes.verDivider}
                orientation="vertical"
              />
              <Tooltip
                arrow
                title={`${t("workspaces.node.edit_label")}`}
                placement="top"
              >
                <ButtonBase onClick={toggleLabelMenu}>
                  <LabelIcon
                    className={classes.nodePopperIcon}
                    style={{
                      color:
                        activeElement.data.label || nodeLabel
                          ? "black"
                          : "#FFDC79"
                    }}
                  />
                </ButtonBase>
              </Tooltip>
              <Tooltip
                arrow
                title={`${t("workspaces.node.edit_attributes")}`}
                placement="top"
              >
                <ButtonBase
                  onClick={toggleAttributMenu}
                  disabled={!activeElement.data.label}
                >
                  <ListIcon className={classes.nodePopperIcon} />
                </ButtonBase>
              </Tooltip>
              <Divider
                flexItem
                className={classes.verDivider}
                orientation="vertical"
              />
              <Tooltip
                arrow
                title={`${t("workspaces.node.edit_icon")}`}
                placement="top"
              >
                <ButtonBase onClick={toggleTypeMenu}>
                  <CheckBoxOutlineBlankIcon
                    className={classes.nodePopperIcon}
                  />
                </ButtonBase>
              </Tooltip>

              <Divider
                flexItem
                className={classes.verDivider}
                orientation="vertical"
              />
              <Tooltip
                arrow
                title={`${t("workspaces.node.edit_background_color")}`}
                placement="top"
              >
                <ButtonBase
                  className={classes.swatchQuick}
                  onClick={toggleDisplayColor}
                >
                  <div
                    className={classes.colorQuick}
                    style={{
                      backgroundColor: `rgba(${nodeColor.r}, ${nodeColor.g}, ${
                        nodeColor.b
                      }, ${nodeColor.a})`,
                      border: "1px solid gray"
                    }}
                  />
                </ButtonBase>
              </Tooltip>
              {displayColorPickerColor ? (
                <div className={classes.popover3}>
                  <SketchPicker
                    color={nodeColor}
                    onChange={handleColorChange}
                  />
                </div>
              ) : null}
              <Tooltip
                arrow
                title={`${t("workspaces.node.edit_border_color")}`}
                placement="top"
              >
                <ButtonBase
                  className={classes.swatchQuick}
                  onClick={toggleDisplayBorderColor}
                >
                  <div
                    className={classes.colorQuick}
                    style={{
                      border: `4px solid rgba(${nodeBorderColor.r}, ${
                        nodeBorderColor.g
                      }, ${nodeBorderColor.b}, ${nodeBorderColor.a})`
                    }}
                  />
                </ButtonBase>
              </Tooltip>
              {displayBorderColorPickerColor ? (
                <div className={classes.popover2}>
                  <SketchPicker
                    color={nodeBorderColor}
                    onChange={handleBorderColorChange}
                  />
                </div>
              ) : null}
              <Tooltip
                arrow
                title={`${t("workspaces.node.edit_border_color")}`}
                placement="top"
              >
                <ButtonBase
                  className={classes.swatchQuick}
                  onClick={toggleDisplayLabelColor}
                >
                  <FormatColorTextIcon
                    style={{
                      color: `rgba(${nodeLabelColor.r}, ${nodeLabelColor.g}, ${
                        nodeLabelColor.b
                      }, ${nodeLabelColor.a})`,
                      fontSize: 25,
                      stroke: "gray"
                    }}
                  />
                </ButtonBase>
              </Tooltip>
              {displayLabelColorPickerColor ? (
                <div className={classes.popover4}>
                  <SketchPicker
                    color={nodeLabelColor}
                    onChange={handleLabelColorChange}
                  />
                </div>
              ) : null}
              <Divider
                flexItem
                className={classes.verDivider}
                orientation="vertical"
              />
              {activeElement.data.unitNumber && (
                <>
                  <Tooltip
                    arrow
                    title={`${t("workspaces.node.see_company_info")}`}
                    placement="top"
                  >
                    {loading ? (
                      <div className={classes.loadingConatiner}>
                        <CircularProgress size={25} />
                      </div>
                    ) : (
                      <ButtonBase onClick={handleGetCompanyData}>
                        <InfoIcon
                          className={classes.nodePopperIcon}
                          color="primary"
                        />
                      </ButtonBase>
                    )}
                  </Tooltip>
                  <Divider
                    flexItem
                    className={classes.verDivider}
                    orientation="vertical"
                  />
                </>
              )}
              <Tooltip
                arrow
                title={`${t("workspaces.node.see more")}`}
                placement="top"
              >
                <ButtonBase onClick={handleContextMenu}>
                  <MoreVertIcon className={classes.nodePopperIcon} />
                </ButtonBase>
              </Tooltip>
            </Paper>
          </Fade>
        )}
      </Popper>
      <Popper
        open={showNodePopper && Boolean(labelRef)}
        // @ts-ignore
        anchorEl={labelRef}
        transition
        style={{ zIndex: 1000, marginTop: 20 }}
        placement="bottom-start"
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <Paper elevation={4} className={classes.labelPaper}>
              <CreatableSelect
                styles={{
                  ...selectStyles(),
                  valueContainer: provided => ({
                    ...provided,
                    width: "180px"
                  })
                }}
                noOptionsMessage={() => t("generic.no_options")}
                formatCreateLabel={input => t("generic.create_new", { input })}
                inputId="react-select-single-workspace-node"
                autoFocus
                TextFieldProps={{
                  label: "Element",
                  InputLabelProps: {
                    htmlFor: "react-select-single-workspace-node",
                    shrink: true
                  },
                  placeholder: "Element"
                }}
                placeholder={t("workspace.node.label_placeholder")}
                options={nodes.map(n => ({ value: n.label, label: n.label }))}
                value={nodeLabel && { label: nodeLabel, value: nodeLabel }}
                onChange={handleChangeLabel}
              />
              <IconButton
                className={classes.labelConfirmButton}
                onClick={handleSave}
                size="small"
              >
                <CheckCircleIcon color="primary" fontSize="large" />
              </IconButton>
            </Paper>
          </Fade>
        )}
      </Popper>

      <Popper
        open={showNodePopper && Boolean(attributRef)}
        // @ts-ignore
        anchorEl={attributRef}
        transition
        style={{ zIndex: 1000, marginTop: 20 }}
        placement="bottom-start"
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <Paper elevation={4} className={classes.attributPaper}>
              {choosenNode &&
                attributes.map((attribut, index) => (
                  <div className={classes.inlineWrap} style={{ marginTop: 15 }}>
                    <div className={classes.field}>
                      <CreatableSelect
                        styles={{
                          ...selectStyles(),
                          valueContainer: provided => ({
                            ...provided,
                            width: "180px"
                          })
                        }}
                        placeholder="Kendetegn"
                        noOptionsMessage={() => t("generic.no_options")}
                        formatCreateLabel={input =>
                          t("generic.create_new", { input })
                        }
                        options={attributesDropDownOptions}
                        value={
                          attribut.label && {
                            label: attribut.label,
                            value: attribut.label
                          }
                        }
                        isDisabled={Boolean(attribut.label)}
                        isOptionDisabled={option =>
                          attributes.map(a => a.label).includes(option.label)
                        }
                        onChange={value => {
                          const newRow = { ...attribut };
                          newRow.label = value.label;
                          newRow.type = value.type || "Value";
                          newRow.selectionOptions =
                            value.selectionOptions || null;

                          const i = attributes.length - 1;
                          const mutableArray = [...attributes];
                          mutableArray.splice(i, 0, newRow);
                          handleChangeAttributes(
                            mutableArray,
                            { ...newRow },
                            value.__isNew__
                          );
                        }}
                      />
                    </div>
                    {attribut.label && (
                      <>
                        <div
                          className={classes.field}
                          style={{ marginLeft: 20 }}
                        >
                          {attribut.type === "Value" ? (
                            <TextField
                              value={attribut.value}
                              placeholder="Værdi"
                              onChange={e => {
                                const newArray = [...attributes];
                                newArray[index] = {
                                  ...newArray[index],
                                  value: e.target.value
                                };

                                handleChangeAttributes(newArray);
                              }}
                            />
                          ) : (
                            <CreatableSelect
                              styles={{
                                ...selectStyles(),
                                valueContainer: provided => ({
                                  ...provided,
                                  width: "180px"
                                })
                              }}
                              placeholder="Værdi"
                              noOptionsMessage={() => t("generic.no_options")}
                              formatCreateLabel={input =>
                                t("generic.create_new", { input })
                              }
                              options={JSON.parse(attribut.selectionOptions)}
                              value={
                                attribut.value && {
                                  label: attribut.value,
                                  value: attribut.value
                                }
                              }
                              onChange={value => {
                                const newArray = [...attributes];
                                newArray[index] = {
                                  ...newArray[index],
                                  value: value.value
                                };

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
                              show: !newArray[index].show
                            };

                            handleChangeAttributes(newArray);
                          }}
                        >
                          {attribut.show ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                        <IconButton
                          style={{ color: `${red}55`, bottom: 5 }}
                          onClick={() =>
                            handelRemoveAttributes(
                              attribut.workspace_node_attribut_id,
                              index
                            )
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
                  </div>
                ))}
              <div className={classes.attributSaveButtonContainer}>
                <Button color="primary" onClick={handleSave}>
                  {t("save")}
                </Button>
              </div>
            </Paper>
          </Fade>
        )}
      </Popper>

      <Popper
        open={showNodePopper && Boolean(typeRef)}
        // @ts-ignore
        anchorEl={typeRef}
        transition
        style={{ zIndex: 1000, marginTop: 20 }}
        placement="bottom-start"
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <Paper elevation={4} className={classes.labelPaper}>
              <Select
                classes={classes}
                styles={{
                  ...selectStyles(),
                  valueContainer: provided => ({
                    ...provided,
                    width: "180px"
                  })
                }}
                isClearable
                inputId="react-select-single-edge-type"
                TextFieldProps={{
                  label: "type",
                  InputLabelProps: {
                    htmlFor: "react-select-single-edge-type",
                    shrink: true
                  },
                  placeholder: "type"
                }}
                placeholder="type"
                options={figurTypeOptions}
                value={figurValue}
                onChange={handleNodeFigur}
              />
              <IconButton
                className={classes.labelConfirmButton}
                onClick={handleSave}
                size="small"
              >
                <CheckCircleIcon color="primary" fontSize="large" />
              </IconButton>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default memo(withStyles(styles)(NodePopper));
