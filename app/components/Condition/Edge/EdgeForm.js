/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import css from '@styles/Form.scss';
import '@styles/vendors/react-draft-wysiwyg/react-draft-wysiwyg.css';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { mapSelectOptions, selectStyles } from '@api/ui/helper';
import { red } from '@api/palette/colorfull';
import styles from '../condition-jss';
import BeizerCurve from '../../Workspace/Edge/beizerCurve.svg';
import StraightLine from '../../Workspace/Edge/straightLine.svg';
import SmoothStep from '../../Workspace/Edge/smoothStep.svg';
import Curve from '../../Workspace/Edge/curve.svg';

const relationshipTypeOptions = [
  {
    value: 'straight',
    label: (
      <>
        <span style={{ paddingRight: '5px' }}>Lige linje</span>
        <img src={StraightLine} alt="straight line" style={{ height: 36 }} />
      </>
    )
  },
  {
    value: 'default',
    label: (
      <>
        <span style={{ paddingRight: '5px' }}>Beizer Kurve</span>
        <img src={BeizerCurve} alt="beizer curve" style={{ height: 36 }} />
      </>
    )
  },
  {
    value: 'smoothstep',
    label: (
      <>
        <span style={{ paddingRight: '5px' }}>Step kurve</span>
        <img src={SmoothStep} alt="smooth step" style={{ height: 36 }} />
      </>
    )
  },
  {
    value: 'custom',
    label: (
      <>
        <span style={{ paddingRight: '5px' }}>Kurvet kurve</span>
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
    type,
    handleTypeChange,
    handleSave,
    relationships,
    comparisonsOptions,
    comparisonType,
    handleComparisonTypeChange,
    comparisonValue,
    handleComparisonValueChange,
    handleDeleteEdge,
    isUpdatingElement
  } = props;

  const editable = relationshipLabel.length === 0;
  const choosenRelationship = relationships.find(r => r.label === relationshipLabel);

  return (
    <div>
      <section className={css.bodyForm}>
        <div className={classes.inlineWrap}>
          <div className={classes.attrField} style={{ marginLeft: 0 }}>
            <CreatableSelect
              classes={classes}
              styles={selectStyles('relative')}
              inputId="react-select-single-edge"
              TextFieldProps={{
                label: 'label',
                InputLabelProps: {
                  htmlFor: 'react-select-single-edge',
                  shrink: true,
                },
                placeholder: 'label',
              }}
              placeholder="label"
              options={mapSelectOptions(relationships.map(r => ({ value: r.label, label: r.description })))}
              value={relationshipLabel && { label: relationshipLabel, value: relationshipLabel }}
              onChange={handleChangeLabel}
            />
          </div>
          <div className={classes.attrField}>
            <Select
              classes={classes}
              styles={selectStyles('relative')}
              options={comparisonsOptions}
              value={comparisonType && { label: comparisonType, value: comparisonType }}
              onChange={(value) => handleComparisonTypeChange(value.value)}
            />
          </div>
        </div>
        {!['exists', 'does not exist', 'any'].includes(comparisonType) && (
          <div className={classes.attrField} style={{ marginLeft: 0 }}>
            <TextField
              value={comparisonValue}
              placeholder="Value"
              style={{ width: '100%' }}
              onChange={(e) => handleComparisonValueChange(e.target.value)}
            />
          </div>
        )}
        {!editable && (
          <div>
            <TextField
              name="description"
              className={classes.field}
              placeholder="Description"
              label="Description"
              multiline
              rows={2}
              disabled
              value={choosenRelationship.description}
            />
          </div>
        )}
        <div className={classes.field} style={{ marginTop: 20 }}>
          <Select
            classes={classes}
            isDisabled={editable}
            styles={selectStyles('relative')}
            inputId="react-select-single-edge-type"
            TextFieldProps={{
              label: 'type',
              InputLabelProps: {
                htmlFor: 'react-select-single-edge-type',
                shrink: true,
              },
              placeholder: 'type',
            }}
            placeholder="type"
            options={relationshipTypeOptions}
            value={type?.length > 0 && relationshipTypeOptions.find(x => x.value === type)}
            onChange={handleTypeChange}
          />
        </div>
      </section>
      <div className={css.buttonArea}>
        {isUpdatingElement && (
          <Button
            variant="contained"
            type="button"
            onClick={handleDeleteEdge}
            style={{ backgroundColor: red, color: 'white' }}
          >
            Slet
          </Button>
        )}
        <Button type="button" onClick={() => close()}>
            Annuller
        </Button>
        <Button
          variant="contained"
          color="secondary"
          type="button"
          onClick={handleSave}
          disabled={relationshipLabel.length === 0 && comparisonValue.length === 0}
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
  type: PropTypes.string,
  handleTypeChange: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  relationships: PropTypes.array.isRequired,
  comparisonsOptions: PropTypes.array.isRequired,
  comparisonType: PropTypes.string.isRequired,
  handleComparisonTypeChange: PropTypes.func.isRequired,
  comparisonValue: PropTypes.any.isRequired,
  handleComparisonValueChange: PropTypes.func.isRequired,
  isUpdatingElement: PropTypes.bool.isRequired,
  handleDeleteEdge: PropTypes.func.isRequired
};

export default withStyles(styles)(EdgeForm);
