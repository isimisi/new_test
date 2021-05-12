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
import CreatableSelect from 'react-select/creatable';
import { SketchPicker } from 'react-color';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import styles from '../workspace-jss';
import BeizerCurve from './beizerCurve.svg';
import StraightLine from './straightLine.svg';
import SmoothStep from './smoothStep.svg';
import Curve from './curve.svg';

const groupsDropDownOptions = [
  { label: 'Test1' },
  { label: 'Test2' },
  { label: 'Test3' },
  { label: 'Test4' },
  { label: 'Test1' },
  { label: 'Test2' },
  { label: 'Test3' },
  { label: 'Test4' },
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label,
}));

const relationshipTypeOptions = [
  {
    value: 'page_visited',
    label: (
      <>
        <span style={{ paddingRight: '5px' }}>Page Visited</span>
        <img src={StraightLine} alt="straight line" style={{ height: 36 }} />
      </>
    )
  },
  {
    value: 'page_visited',
    label: (
      <>
        <span style={{ paddingRight: '5px' }}>Page Visited</span>
        <img src={BeizerCurve} alt="beizer curve" style={{ height: 36 }} />
      </>
    )
  },
  {
    value: 'page_visited',
    label: (
      <>
        <span style={{ paddingRight: '5px' }}>Page Visited</span>
        <img src={SmoothStep} alt="smooth steo" style={{ height: 36 }} />
      </>
    )
  },
  {
    value: 'page_visited',
    label: (
      <>
        <span style={{ paddingRight: '5px' }}>Page Visited</span>
        <img src={Curve} alt="curve" style={{ height: 36 }} />
      </>
    )
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
    description,
    handleDescriptionChange,
    color,
    handleColorChange,
    showArrow,
    handleShowArrowChange,
    animatedLine,
    handleAnimatedLineChange,
    showLabel,
    handleShowLabelChange,
    handleSave
  } = props;
  const [displayColorPickerColor, setDisplayColorPickerColor] = useState();

  return (
    <div>
      <section className={css.bodyForm}>
        <div className={classes.field}>
          <Select
            classes={classes}
            styles={selectStyles('relative')}
            inputId="react-select-single"
            TextFieldProps={{
              label: 'label',
              InputLabelProps: {
                htmlFor: 'react-select-single',
                shrink: true,
              },
              placeholder: 'label',
            }}
            placeholder="label"
            options={mapSelectOptions(groupsDropDownOptions)}
            value={relationshipLabel && { label: relationshipLabel, value: relationshipLabel }}
            onChange={handleChangeLabel}
          />
        </div>
        {!relationshipLabel && (
          <div className={classes.field} style={{ marginTop: 20 }}>
            <CreatableSelect
              isClearable
              styles={selectStyles('relative')}
              inputId="react-select-single"
              TextFieldProps={{
                label: 'Værdi',
                InputLabelProps: {
                  htmlFor: 'react-select-single',
                  shrink: true,
                },
                placeholder: 'Værdi',
              }}
              placeholder="Værdi"
              value={relationshipValue && { label: relationshipValue, value: relationshipValue }}
              onChange={handleChangeValue}
              options={mapSelectOptions(groupsDropDownOptions)}
            />
          </div>
        )}
        <div className={classes.field} style={{ marginTop: 20 }}>
          <Select
            classes={classes}
            styles={selectStyles('relative')}
            inputId="react-select-single"
            TextFieldProps={{
              label: 'type',
              InputLabelProps: {
                htmlFor: 'react-select-single',
                shrink: true,
              },
              placeholder: 'type',
            }}
            placeholder="type"
            options={relationshipTypeOptions}
            value={relationshipLabel && { label: relationshipLabel, value: relationshipLabel }}
            onChange={handleChangeLabel}
          />
        </div>
        {!relationshipLabel && (
          <div>
            <TextField
              name="description"
              className={classes.field}
              placeholder="Description"
              label="Description"
              multiline
              rows={2}
              onChange={handleDescriptionChange}
              value={description}
            />
          </div>
        )}

        <div className={classes.row}>
          <Typography variant="subtitle2">
                Pick a Color
          </Typography>
          <div className={classes.swatch} onClick={() => setDisplayColorPickerColor(prevVal => !prevVal)}>
            <div className={classes.color} style={{ backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})` }} />
          </div>
          { displayColorPickerColor ? (
            <div className={classes.popover}>
              <div className={classes.cover} onClick={() => setDisplayColorPickerColor(false)} />
              <SketchPicker color={color} onChange={handleColorChange} />
            </div>
          ) : null }
        </div>

        <div className={classes.row}>
          <Checkbox
            checked={showArrow}
            onChange={handleShowArrowChange}
            name="arrow"
            color="primary"
          />
          <Typography variant="subtitle2">
                Vis som pil
          </Typography>
        </div>
        <div className={classes.row}>
          <Checkbox
            checked={animatedLine}
            onChange={handleAnimatedLineChange}
            name="animated"
            color="primary"
          />
          <Typography variant="subtitle2">
                Animeret linje
          </Typography>
        </div>
        <div className={classes.row}>
          <Checkbox
            checked={showLabel}
            onChange={handleShowLabelChange}
            name="show label"
            color="primary"
          />
          <Typography variant="subtitle2">
                Vis label
          </Typography>
        </div>
      </section>
      <div className={css.buttonArea}>
        <Button type="button" onClick={() => close()}>
            Discard
        </Button>
        <Button
          variant="contained"
          color="secondary"
          type="button"
          onClick={handleSave}
        >
            Save
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
  description: PropTypes.string.isRequired,
  handleDescriptionChange: PropTypes.func.isRequired,
  color: PropTypes.object.isRequired,
  handleColorChange: PropTypes.func.isRequired,
  showArrow: PropTypes.bool.isRequired,
  handleShowArrowChange: PropTypes.func.isRequired,
  animatedLine: PropTypes.bool.isRequired,
  handleAnimatedLineChange: PropTypes.func.isRequired,
  showLabel: PropTypes.bool.isRequired,
  handleShowLabelChange: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired
};

export default withStyles(styles)(EdgeForm);
