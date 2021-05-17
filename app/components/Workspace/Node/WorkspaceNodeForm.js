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
import { mapSelectOptions, selectStyles } from '@api/ui/helper';
import { SketchPicker } from 'react-color';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
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
    nodeSize,
    handleChangeSize,
    nodeColor,
    handleChangeColor,
    nodeBorderColor,
    handleBorderColorChange,
    handleNodeSave
  } = props;
  const [displayColorPickerColor, setDisplayColorPickerColor] = useState();
  const [displayBorderColorPickerColor, setDisplayBorderColorPickerColor] = useState();
  const choosenNode = nodes.find(r => r.label === nodeLabel);


  return (
    <div>
      <section className={css.bodyForm}>
        <div className={classes.field}>
          <Select
            classes={classes}
            styles={selectStyles('relative')}
            inputId="react-select-single"
            TextFieldProps={{
              label: 'Element',
              InputLabelProps: {
                htmlFor: 'react-select-single',
                shrink: true,
              },
              placeholder: 'Element',
            }}
            placeholder="Vælg dit element"
            options={mapSelectOptions(nodes.map(n => ({ value: n.label, label: n.description })))}
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
        {choosenNode && choosenNode.attributes.map((attribut, index) => (
          <div className={classes.inlineWrap} style={{ marginTop: 15 }} key={attribut.value}>
            <Tooltip title={attribut.label}>
              <div className={classes.field}>
                <Select
                  classes={classes}
                  styles={selectStyles('relative')}
                  inputId="react-select-single"
                  options={[]}
                  placeholder="attribut"
                  value={attribut.label && { label: attribut.label, value: attribut.label }}
                  onChange={(value) => {
                    if (attribut.value) {
                      const newArray = [...attributes];
                      newArray[index] = { ...newArray[index], label: value.value };
                      handleChangeAttributes(newArray);
                    }
                    const newRow = { ...attribut };
                    newRow.label = value.value;
                    const i = attributes.length - 1;
                    const mutableArray = [...attributes];
                    mutableArray.splice(i, 0, newRow);
                    handleChangeAttributes(mutableArray);
                  }}
                />
              </div>
            </Tooltip>
            {attribut.label && (
              <Tooltip title={attribut.value}>
                <div className={classes.field} style={{ marginLeft: 20 }}>
                  <TextField
                    value={attribut.value}
                    placeholder="Value"
                    onChange={(e) => handleChangeAttributes(e.target.value, index, 'value')}
                  />
                </div>
              </Tooltip>
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
          <div className={classes.row} style={{ marginTop: 10, display: 'flex' }}>
            <Typography variant="subtitle2" component="h3">
        Vælg en størrelse
            </Typography>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '70%',
              marginLeft: 20
            }}
            >
              <Button onClick={() => handleChangeSize('Small')} className={classes.size} size="small" variant="contained" color={nodeSize === 'Small' ? 'secondary' : 'inherit'}>Small</Button>
              <Button onClick={() => handleChangeSize('Medium')} className={classes.size} size="small" variant="contained" color={nodeSize === 'Medium' ? 'secondary' : 'inherit'}>Medium</Button>
              <Button onClick={() => handleChangeSize('Large')} className={classes.size} size="small" variant="contained" color={nodeSize === 'Large' ? 'secondary' : 'inherit'}>Large</Button>
            </div>
          </div>
        </>
        )}
      </section>
      <div className={css.buttonArea}>
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
  close: PropTypes.func.isRequired,
  nodes: PropTypes.array.isRequired,
  nodeLabel: PropTypes.string.isRequired,
  handleChangeLabel: PropTypes.func.isRequired,
  attributes: PropTypes.array.isRequired,
  handleChangeAttributes: PropTypes.func.isRequired,
  nodeSize: PropTypes.string.isRequired,
  handleChangeSize: PropTypes.func.isRequired,
  nodeColor: PropTypes.object.isRequired,
  handleChangeColor: PropTypes.func.isRequired,
  nodeBorderColor: PropTypes.object.isRequired,
  handleBorderColorChange: PropTypes.func.isRequired,
  handleNodeSave: PropTypes.func.isRequired
};

export default withStyles(styles)(WorkspaceNodeForm);
