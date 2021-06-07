/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import css from '@styles/Form.scss';
import '@styles/vendors/react-draft-wysiwyg/react-draft-wysiwyg.css';
import Select from 'react-select';
import { selectStyles } from '@api/ui/helper';
import { SketchPicker } from 'react-color';
import Typography from '@material-ui/core/Typography';
import { red } from '@api/palette/colorfull';
import CreatableSelect from 'react-select/creatable';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import styles from '../workspace-jss';

const WorkspaceNodeForm = (props) => {
  const {
    classes,
    close,
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
    handleRemoveAttributes
  } = props;
  const [displayColorPickerColor, setDisplayColorPickerColor] = useState();
  const [displayBorderColorPickerColor, setDisplayBorderColorPickerColor] = useState();
  const choosenNode = nodes.find(r => r.label === nodeLabel);


  return (
    <div>
      <section className={css.bodyForm}>
        <div className={classes.field}>
          <CreatableSelect
            classes={classes}
            styles={selectStyles('relative')}
            inputId="react-select-single-workspace-node"
            TextFieldProps={{
              label: 'Element',
              InputLabelProps: {
                htmlFor: 'react-select-single-workspace-node',
                shrink: true,
              },
              placeholder: 'Element',
            }}
            placeholder="Vælg dit element"
            options={nodes.map(n => ({ value: n.label, label: n.label }))}
            value={nodeLabel && { label: nodeLabel, value: nodeLabel }}
            onChange={handleChangeLabel}
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
            <div>
              <TextField
                name="description"
                className={classes.field}
                placeholder="Description"
                label="Description"
                multiline
                rows={2}
                disabled
                value={choosenNode.description || ''}
              />
            </div>
          </>
        )}
        {choosenNode && attributes.map((attribut, index) => (
          <div className={classes.inlineWrap} style={{ marginTop: 15 }}>
            <div className={classes.field}>
              <CreatableSelect
                styles={selectStyles('relative')}
                placeholder="Kendetegn"
                options={attributesDropDownOptions}
                value={attribut.label && { label: attribut.label, value: attribut.label }}
                isDisabled={Boolean(attribut.label)}
                isOptionDisabled={(option) => attributes.map(a => a.label).includes(option.label)}
                onChange={(value) => {
                  const newRow = { ...attribut };
                  newRow.label = value.label;
                  newRow.type = value.type;
                  newRow.selectionOptions = value.selectionOptions;

                  const i = attributes.length - 1;
                  const mutableArray = [...attributes];
                  mutableArray.splice(i, 0, newRow);
                  handleChangeAttributes(mutableArray);
                }}
              />
            </div>
            {attribut.label && (
              <>
                <div className={classes.field} style={{ marginLeft: 20 }}>
                  {attribut.type === 'Value' ? (
                    <TextField
                      value={attribut.value}
                      placeholder="Værdi"
                      onChange={(e) => {
                        const newArray = [...attributes];
                        newArray[index] = { ...newArray[index], value: e.target.value };

                        handleChangeAttributes(newArray);
                      }}
                    />
                  )
                    : (
                      <CreatableSelect
                        styles={selectStyles('relative')}
                        placeholder="Værdi"
                        options={JSON.parse(attribut.selectionOptions)}
                        value={attribut.value && { label: attribut.value, value: attribut.value }}
                        onChange={(value) => {
                          const newArray = [...attributes];
                          newArray[index] = { ...newArray[index], value: value.value };

                          handleChangeAttributes(newArray);
                        }}
                      />
                    )
                  }
                </div>
                <IconButton
                  style={{ bottom: 3 }}
                  onClick={() => {
                    const newArray = [...attributes];
                    newArray[index] = { ...newArray[index], show: !newArray[index].show };

                    handleChangeAttributes(newArray);
                  }}
                >
                  {attribut.show ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
                <IconButton style={{ color: `${red}55`, bottom: 5 }} onClick={() => handleRemoveAttributes(attribut.workspace_node_attribut_id, index)}>
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </div>
        ))}
        {choosenNode
        && (
        <>
          <div className={classes.row} style={{ marginTop: 10 }}>
            <Typography variant="subtitle2">
                Vælg en farve for dit element
            </Typography>
            <div className={classes.swatch} onClick={() => setDisplayColorPickerColor(prevVal => !prevVal)}>
              <div className={classes.color} style={{ backgroundColor: `rgba(${nodeColor.r}, ${nodeColor.g}, ${nodeColor.b}, ${nodeColor.a})` }} />
            </div>
            { displayColorPickerColor ? (
              <div className={classes.popover}>
                <div className={classes.cover} onClick={() => setDisplayColorPickerColor(false)} />
                <SketchPicker color={nodeColor} onChange={handleChangeColor} />
              </div>
            ) : null }
          </div>
          <div className={classes.row} style={{ marginTop: 10 }}>
            <Typography variant="subtitle2">
                Vælg en farve for kanterne på dit element
            </Typography>
            <div className={classes.swatch} onClick={() => setDisplayBorderColorPickerColor(prevVal => !prevVal)}>
              <div className={classes.color} style={{ backgroundColor: `rgba(${nodeBorderColor.r}, ${nodeBorderColor.g}, ${nodeBorderColor.b}, ${nodeBorderColor.a})` }} />
            </div>
            { displayBorderColorPickerColor ? (
              <div className={classes.popover}>
                <div className={classes.cover} onClick={() => setDisplayBorderColorPickerColor(false)} />
                <SketchPicker color={nodeBorderColor} onChange={handleBorderColorChange} />
              </div>
            ) : null }
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
            style={{ backgroundColor: red, color: 'white' }}
          >
            Delete
          </Button>
        )}
        <Button type="button" onClick={close}>
            Discard
        </Button>
        <Button
          variant="contained"
          color="secondary"
          type="button"
          onClick={handleNodeSave}
          disabled={!choosenNode}
        >
            Save
        </Button>
      </div>
    </div>
  );
};

WorkspaceNodeForm.propTypes = {
  classes: PropTypes.object.isRequired,
  close: PropTypes.func,
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
};

export default withStyles(styles)(WorkspaceNodeForm);
