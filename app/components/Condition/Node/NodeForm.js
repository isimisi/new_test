/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import css from "@styles/Form.scss";
import "@styles/vendors/react-draft-wysiwyg/react-draft-wysiwyg.css";
import Select from "react-select";
import { mapSelectOptions, selectStyles } from "@api/ui/helper";
import DeleteIcon from "@material-ui/icons/Delete";
import QueueIcon from "@material-ui/icons/Queue";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@api/palette/colorfull";
import CreatableSelect from "react-select/creatable";
import styles from "../condition-jss";

const ConditionNodeForm = (props) => {
  const {
    classes,
    close,
    nodes,
    nodeLabel,
    handleChangeLabel,
    handleNodeSave,
    handleNodeChange,
    conditionValues,
    nodeAttributes,
    comparisonsOptions,
    addConditionValue,
    deleteConditionValue,
    isUpdatingElement,
    handleDeleteNode,
  } = props;

  const choosenNode = nodes.find((r) => r.label === nodeLabel);

  return (
    <div>
      <section className={css.bodyForm}>
        <div className={classes.field}>
          <CreatableSelect
            classes={classes}
            styles={selectStyles()}
            menuPortalTarget={document.body}
            menuPlacement="auto"
            menuPosition="absolute"
            inputId="react-select-single-node-choose"
            TextFieldProps={{
              label: "Element",
              InputLabelProps: {
                htmlFor: "react-select-single-node-choose",
                shrink: true,
              },
              placeholder: "Element",
            }}
            placeholder="Vælg dit element"
            options={mapSelectOptions(
              nodes.map((n) => ({ value: n.label, label: n.description }))
            )}
            value={nodeLabel && { label: nodeLabel, value: nodeLabel }}
            onChange={handleChangeLabel}
          />
        </div>
        {choosenNode && (
          <div>
            <TextField
              name="description"
              className={classes.field}
              placeholder="Description"
              label="Description"
              multiline
              rows={2}
              disabled
              value={choosenNode.description}
            />
          </div>
        )}
        {conditionValues.map((row, index) => (
          <>
            <div className={classes.inlineWrap}>
              <div className={classes.attrField} style={{ marginLeft: 0 }}>
                <CreatableSelect
                  classes={classes}
                  styles={selectStyles()}
                  menuPortalTarget={document.body}
                  menuPlacement="auto"
                  menuPosition="absolute"
                  options={mapSelectOptions(nodeAttributes)}
                  value={row.attribut && { label: row.attribut, value: row.attribut }}
                  onChange={(value) =>
                    handleNodeChange(value.value, index, "attribut", value.__isNew__)
                  }
                />
              </div>
              <div className={classes.attrField}>
                <Select
                  classes={classes}
                  styles={selectStyles()}
                  menuPortalTarget={document.body}
                  menuPlacement="auto"
                  menuPosition="absolute"
                  options={comparisonsOptions}
                  value={
                    row.comparison_type && {
                      label: row.comparison_type,
                      value: row.comparison_type,
                    }
                  }
                  onChange={(value) =>
                    handleNodeChange(value.value, index, "comparison_type")
                  }
                />
              </div>
              <IconButton
                style={{ color: `${red}55`, bottom: 10, marginLeft: 5 }}
                onClick={() => deleteConditionValue(index)}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                color="primary"
                style={{ bottom: 10, marginLeft: 5 }}
                onClick={addConditionValue}
              >
                <QueueIcon />
              </IconButton>
            </div>
            {!["exists", "does not exist", "any"].includes(row.comparison_type) && (
              <div className={classes.attrField} style={{ marginLeft: 0 }}>
                <TextField
                  value={row.comparison_value}
                  placeholder="Value"
                  onChange={(e) =>
                    handleNodeChange(e.target.value, index, "comparison_value")
                  }
                />
              </div>
            )}
          </>
        ))}
        {conditionValues.length === 0 && (
          <div className={classes.inlineWrap}>
            <IconButton
              color="primary"
              style={{ bottom: 10, marginLeft: 5 }}
              onClick={addConditionValue}
            >
              <QueueIcon />
            </IconButton>
          </div>
        )}
      </section>
      <div className={css.buttonArea}>
        {isUpdatingElement && (
          <Button
            variant="contained"
            type="button"
            onClick={handleDeleteNode}
            style={{ backgroundColor: red, color: "white" }}
          >
            Slet
          </Button>
        )}
        <Button type="button" onClick={close}>
          Annuller
        </Button>
        <Button
          variant="contained"
          color="secondary"
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

ConditionNodeForm.propTypes = {
  classes: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
  nodes: PropTypes.array.isRequired,
  nodeLabel: PropTypes.string.isRequired,
  handleChangeLabel: PropTypes.func.isRequired,
  handleNodeSave: PropTypes.func.isRequired,
  handleNodeChange: PropTypes.func.isRequired,
  conditionValues: PropTypes.array.isRequired,
  nodeAttributes: PropTypes.array.isRequired,
  comparisonsOptions: PropTypes.array.isRequired,
  addConditionValue: PropTypes.func.isRequired,
  deleteConditionValue: PropTypes.func.isRequired,
  isUpdatingElement: PropTypes.bool.isRequired,
  handleDeleteNode: PropTypes.func.isRequired,
};

export default withStyles(styles)(ConditionNodeForm);
