import React, { MouseEvent, useState } from "react";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import Select from "react-select";
import Fade from "@material-ui/core/Fade";
import { useTranslation } from "react-i18next";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Divider from "@material-ui/core/Divider";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { withStyles } from "@material-ui/core/styles";
import styles from "../workspace-jss";
import { SketchPicker } from "react-color";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import CreatableSelect from "react-select/creatable";

import LabelIcon from "@material-ui/icons/Label";
import {
  Edge,
  FlowElement,
  Node,
  OnLoadParams,

} from "react-flow-renderer";
import ButtonBase from "@material-ui/core/ButtonBase";
import { selectStyles } from "@api/ui/helper";
import IconButton from "@material-ui/core/IconButton";
import { RGBA, SelectChoice } from "@customTypes/data";
import ReactDOM from "react-dom";
import BeizerCurve from "./beizerCurve.svg";
import StraightLine from "./straightLine.svg";
import SmoothStep from "./smoothStep.svg";
import { relationshipTypeOptions } from "./EdgeForm";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";


interface Props {
  classes: any;
  edgePopperRef: SVGElement | null;
  showEdgePopper: boolean;
  currentZoom: number;
  editData: (
    event: MouseEvent,
    element: FlowElement,
    showFull: boolean
  ) => void;
  activeElement: Node | Edge | null;
  edgeLabel: string;
  relationships: any;
  relationshipLabel: string;
  handleChangeLabel: (label: SelectChoice) => void;
  handleEdgeSave: () => void;
  type: string;
  handleTypeChange: (type: SelectChoice) => void;
  edgeColor: RGBA;
  handleColorChange: (color: RGBA) => void;
  showArrow: boolean;
  handleShowArrowChange: () => void;
  animatedLine: boolean;
  handleAnimatedLineChange: () => void;
  showLabel: boolean;
  handleShowLabelChange: () => void;
  lineThrough: boolean;
  handleLineThroughChange: () => void;
  handleDeleteEdge: () => void;
  handleHideEdgePopper: (stopReffrence?: boolean) => void;
  rfInstance: OnLoadParams<any> | null;
}

const popperHeight = 45;
const popperWidth = 382.22;

const EdgePopper = (props: Props) => {
  const {
    classes,
    edgePopperRef,
    showEdgePopper,
    currentZoom,
    editData,
    relationships,
    relationshipLabel,
    handleChangeLabel,
    edgeLabel,
    handleEdgeSave,
    type,
    handleTypeChange,
    edgeColor,
    handleColorChange,
    showArrow,
    handleShowArrowChange,
    animatedLine,
    handleAnimatedLineChange,
    showLabel,
    handleShowLabelChange,
    lineThrough,
    handleLineThroughChange,
    handleDeleteEdge,
    handleHideEdgePopper,
    rfInstance
  } = props;

  // eslint-disable-next-line react/destructuring-assignment
  const activeElement = props.activeElement as Edge;

  const { t } = useTranslation();

  const [labelRef, setLabelRef] = useState<EventTarget | null>(null);
  const [typeRef, setTypeRef] = useState<EventTarget | null>(null);
  const [moreRef, setMoreRef] = useState<EventTarget | null>(null);

  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const toggleDisplayColor = () => {
    setTypeRef(null);
    setLabelRef(null);
    setMoreRef(null);
    setDisplayColorPicker(prevVal => !prevVal);
  };

  const handleEditData = e => {
    editData(e, activeElement, true);
  };

  const toggleLabelMenu = e => {
    setMoreRef(null);
    setTypeRef(null);
    setDisplayColorPicker(false);
    setLabelRef(prevVal => (!prevVal ? e.target : null));
  };

  const toggleTypeMenu = e => {
    setLabelRef(null);
    setMoreRef(null);
    setDisplayColorPicker(false);
    setTypeRef(prevVal => (!prevVal ? e.target : null));
  };

  const toggleMoreMenu = e => {
    setLabelRef(null);
    setTypeRef(null);
    setDisplayColorPicker(false);

    setMoreRef(prevVal => (!prevVal ? e.target : null));
  };

  const handleSave = () => {
    setLabelRef(null);
    setTypeRef(null);
    setDisplayColorPicker(false);
    setMoreRef(null);
    handleEdgeSave();
  };

  const typeIcon = React.useMemo(() => {
    switch (type) {
      case "straight":
        return StraightLine;
      case "custom":
        return BeizerCurve;
      case "smoothstep":
        return SmoothStep;
      default:
        return BeizerCurve;
    }
  }, [type]);

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
  }, [displayColorPicker, edgeColor]);


  const boundingRect = edgePopperRef?.getBoundingClientRect() as DOMRect;


  return (
    <>
      <Popper
        open={Boolean(edgePopperRef) && showEdgePopper}
        // @ts-ignore
        anchorEl={edgePopperRef?.tagName === "path" ? null : edgePopperRef}
        role={undefined}
        transition
        style={{
          zIndex: 1000,
          ...(edgePopperRef?.tagName === "path" ?
            { position: "absolute",

              top: boundingRect.top + boundingRect.height / 2 - popperHeight / 2,
              left: boundingRect.left + boundingRect.width / 2 - popperWidth / 2
            } : {
              marginBottom: 15
            })
        }}
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
                        activeElement.data.label || edgeLabel
                          ? "black"
                          : "#FFDC79"
                    }}
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
                title={`${t("workspaces.edge.type")}`}
                placement="top"
              >
                <ButtonBase onClick={toggleTypeMenu}>
                  <img
                    src={typeIcon}
                    alt="juristic"
                    style={{ width: 23, height: 23, margin: 10 }}
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
                title={`${t("workspaces.edge.edit_color")}`}
                placement="top"
              >
                <ButtonBase
                  className={classes.swatchQuick}
                  onClick={toggleDisplayColor}
                >
                  <div
                    className={classes.colorQuick}
                    style={{
                      backgroundColor: `rgba(${edgeColor.r}, ${edgeColor.g}, ${
                        edgeColor.b
                      }, ${edgeColor.a})`,
                      border: "1px solid gray"
                    }}
                  />
                </ButtonBase>
              </Tooltip>
              {displayColorPicker ? (
                <div className={classes.popover5}>
                  <SketchPicker
                    color={edgeColor}
                    onChange={handleColorChange}
                  />
                </div>
              ) : null}
              <Divider
                flexItem
                className={classes.verDivider}
                orientation="vertical"
              />
              <Tooltip
                arrow
                title={`${t("workspaces.edge.more")}`}
                placement="top"
              >
                <ButtonBase onClick={toggleMoreMenu}>
                  <MoreVertIcon className={classes.nodePopperIcon} />
                </ButtonBase>
              </Tooltip>
              <Divider
                flexItem
                className={classes.verDivider}
                orientation="vertical"
              />
              <Button
                variant="text"
                style={{ color: "#FF8DA0" }}
                onClick={handleDeleteEdge}
              >
                {t("workspace.edit_edge_delete")}
              </Button>
            </Paper>
          </Fade>
        )}
      </Popper>
      <Popper
        open={showEdgePopper && Boolean(labelRef)}
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
                  label: "Relation",
                  InputLabelProps: {
                    htmlFor: "react-select-single-workspace-node",
                    shrink: true
                  },
                  placeholder: "Relation"
                }}
                placeholder={t("workspace.node.label_placeholder")}
                options={relationships.toJS().map(n => ({
                  value: n.label,
                  label: n.label
                }))}
                value={
                  relationshipLabel && {
                    label: relationshipLabel,
                    value: relationshipLabel
                  }
                }
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
        open={showEdgePopper && Boolean(typeRef)}
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
                menuPortalTarget={document.body}
                menuPlacement="auto"
                menuPosition="absolute"
                styles={{
                  ...selectStyles(),
                  valueContainer: provided => ({
                    ...provided,
                    width: "180px"
                  })
                }}
                inputId="react-select-single-edge-workspace-type"
                TextFieldProps={{
                  label: "type",
                  InputLabelProps: {
                    htmlFor: "react-select-single-edge-workspace-type",
                    shrink: true
                  },
                  placeholder: "type"
                }}
                placeholder="type"
                options={relationshipTypeOptions}
                value={
                  type && relationshipTypeOptions.find(x => x.value === type)
                }
                onChange={handleTypeChange}
              />
              <IconButton
                className={classes.labelConfirmButton}
                onClick={() => {
                  handleSave();
                  handleHideEdgePopper(true);
                }}
                size="small"
              >
                <CheckCircleIcon color="primary" fontSize="large" />
              </IconButton>
            </Paper>
          </Fade>
        )}
      </Popper>
      <Popper
        open={showEdgePopper && Boolean(moreRef)}
        // @ts-ignore
        anchorEl={moreRef}
        transition
        style={{ zIndex: 1000, marginTop: 20 }}
        placement="bottom-start"
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <Paper elevation={4} className={classes.attributPaper}>
              <ButtonBase
                className={classes.row}
                onClick={handleShowArrowChange}
              >
                <Checkbox checked={showArrow} name="arrow" color="primary" />
                <Typography variant="subtitle2">
                  {t("workspaces.edge.show_arrow")}
                </Typography>
              </ButtonBase>
              <ButtonBase
                className={classes.row}
                onClick={handleAnimatedLineChange}
              >
                <Checkbox
                  checked={animatedLine}
                  name="animated"
                  color="primary"
                />
                <Typography variant="subtitle2">
                  {t("workspaces.edge.animated")}
                </Typography>
              </ButtonBase>
              <ButtonBase
                className={classes.row}
                onClick={handleLineThroughChange}
              >
                <Checkbox
                  checked={lineThrough}
                  name="line through"
                  color="primary"
                />
                <Typography variant="subtitle2">
                  {t("workspaces.edge.show_strike")}
                </Typography>
              </ButtonBase>
              <ButtonBase
                className={classes.row}
                onClick={handleShowLabelChange}
              >
                <Checkbox
                  checked={showLabel}
                  name="show label"
                  color="primary"
                />
                <Typography variant="subtitle2">
                  {t("workspaces.edge.show_label")}
                </Typography>
              </ButtonBase>
              <div className={classes.moreEdgeSave}>
                <Button
                  variant="contained"
                  color="primary"
                  type="button"
                  onClick={handleSave}
                >
                  Gem
                </Button>
              </div>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default withStyles(styles)(EdgePopper);
