import React, { MouseEvent, useState } from "react";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Fade from "@material-ui/core/Fade";
import { useTranslation } from "react-i18next";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Divider from "@material-ui/core/Divider";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import { withStyles } from "@material-ui/core/styles";
import styles from "../workspace-jss";
import { RGBA } from "@customTypes/data";
import ListIcon from "@material-ui/icons/List";
import { TwitterPicker, ColorResult } from "react-color";
import LabelIcon from "@material-ui/icons/Label";
import ButtonBase from "@material-ui/core/ButtonBase";
import InfoIcon from "@material-ui/icons/Info";
import CreatableSelect from "react-select/creatable";
import { selectStyles } from "@api/ui/helper";
import Select from "react-select";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import { Node, Edge, FlowElement } from "react-flow-renderer";
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

interface Label {
  value: string;
  label: string;
  __isNew__: boolean;
}

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
  handleChangeLabel: (label: Label) => void;
  handleNodeSave: () => void;
  editData: (
    event: MouseEvent,
    element: FlowElement,
    showFull: boolean
  ) => void;
  getCompanyData: (id) => void;
  loading: boolean;
  activeElement: Node | Edge | null;
  attributesDropDownOptions: any;
  attributes: any;
  handleChangeAttributes: any;
  handelRemoveAttributes: any;
  handleNodeFigur: any;
  nodeFigur: any;
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
    nodeFigur
  } = props;
  // eslint-disable-next-line react/destructuring-assignment
  const activeElement = props.activeElement as Node;

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

  const toggleDisplayColor = () => {
    setTypeRef(null);
    setDisplayBorderColorPickerColor(false);
    setAttributRefRef(null);
    setLabelRef(null);
    setDisplayColorPickerColor(prevVal => !prevVal);
  };

  const toggleDisplayBorderColor = () => {
    setTypeRef(null);
    setDisplayColorPickerColor(false);
    setLabelRef(null);
    setAttributRefRef(null);
    setDisplayBorderColorPickerColor(prevVal => !prevVal);
  };


  const toggleLabelMenu = e => {
    setTypeRef(null);
    setDisplayBorderColorPickerColor(false);
    setDisplayColorPickerColor(false);
    setAttributRefRef(null);
    setLabelRef(prevVal => (!prevVal ? e.target : null));
  };

  const toggleAttributMenu = e => {
    setTypeRef(null);
    setDisplayBorderColorPickerColor(false);
    setDisplayColorPickerColor(false);
    setLabelRef(null);
    setAttributRefRef(prevVal => (!prevVal ? e.target : null));
  };

  const toggleTypeMenu = e => {
    setDisplayBorderColorPickerColor(false);
    setDisplayColorPickerColor(false);
    setAttributRefRef(null);
    setLabelRef(null);
    setTypeRef(prevVal => (!prevVal ? e.target : null));
  };

  const handleEditData = e => {
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
    handleNodeSave();
  };
  const figurValue = React.useMemo(
    () => nodeFigur && figurTypeOptions.find(x => x.value === nodeFigur),
    [nodeFigur]
  );

  React.useEffect(() => {
    const picker = document.getElementsByClassName("twitter-picker");
    if (picker.length > 0) {
      const actPicker = picker[0].lastChild?.lastChild;
      console.log(actPicker);
      // @ts-ignore
      ReactDOM.render(<div className={classes.attributSaveButtonContainer}>
        <Button color="primary" onClick={handleSave}>
          {t("save")}
        </Button>
      </div>, actPicker);
    }
  }, [displayBorderColorPickerColor, displayColorPickerColor, nodeColor, nodeBorderColor]);


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
          <Fade {...TransitionProps}>
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
                  <LabelIcon className={classes.nodePopperIcon} style={{ color: activeElement.data.label ? "black" : "#FFDC79" }} />
                </ButtonBase>
              </Tooltip>
              <Tooltip
                arrow
                title={`${t("workspaces.node.edit_attributes")}`}
                placement="top"
              >
                <ButtonBase onClick={toggleAttributMenu}>
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
                <div className={classes.popover}>
                  <TwitterPicker
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
                  <TwitterPicker
                    color={nodeBorderColor}
                    onChange={handleBorderColorChange}
                  />
                </div>
              ) : null}
              <Divider
                flexItem
                className={classes.verDivider}
                orientation="vertical"
              />
              {activeElement.data.unitNumber && <>
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
              </>}
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
              >
                <CheckCircleIcon />
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
              >
                <CheckCircleIcon />
              </IconButton>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default withStyles(styles)(NodePopper);
