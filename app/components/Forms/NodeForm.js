import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import NoSsr from '@material-ui/core/NoSsr';
import Select from 'react-select';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import { useDispatch } from 'react-redux';
import {
  titleChange, descriptionChange, addAtrribut, addGroup
} from '../../containers/Pages/Nodes/reducers/nodeActions';

const mapSelectOptions = (options) => options.map(suggestion => ({
  value: suggestion.value,
  label: (
    <>
      <Tooltip title={suggestion.label}>
        <div style={{ width: '100%', height: '100%' }}>
          <span style={{ paddingRight: '5px' }}>{suggestion.value}</span>
        </div>
      </Tooltip>
    </>
  ),
}));


const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 30
  },
  field: {
    width: '100%',
    marginBottom: 10
  },
  fieldBasic: {
    width: '100%',
    marginBottom: 20,
    marginTop: 10
  },
  inlineWrap: {
    display: 'flex',
    flexDirection: 'row'
  },
  buttonInit: {
    margin: theme.spacing(4),
    textAlign: 'center'
  },
});


function NodeForm(props) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const {
    classes,
    title,
    description,
    attributes,
    group,
    attributesDropDownOptions,
    groupsDropDownOptions
  } = props;


  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit',
      },
    }),
  };

  const handleTitleChange = (e) => {
    dispatch(titleChange(e.target.value));
  };

  const handleDescriptionChange = (e) => {
    dispatch(descriptionChange(e.target.value));
  };


  const handleChange = (value, index, changeType) => {
    const newArray = [...attributes];
    newArray[index] = { ...newArray[index], [changeType]: value };
    dispatch(addAtrribut(newArray));
  };

  const handleNewRow = (attribut, label) => {
    const newRow = { ...attribut };
    newRow.label = label;
    const i = attributes.length - 1;
    const mutableArray = [...attributes];
    mutableArray.splice(i, 0, newRow);

    dispatch(addAtrribut(mutableArray));
  };

  const handleChangeGroups = (value) => {
    dispatch(addGroup(value.value));
  };


  return (
    <div style={{ marginBottom: 20 }}>
      <Grid container spacing={3} alignItems="flex-start" direction="row" justify="center">
        <Grid item xs={12} md={12}>
          <Paper className={classes.root}>
            <Typography variant="h5" component="h3">
              Name your
              {' '}
              Node
            </Typography>
            <div>
              <TextField
                name="title"
                placeholder="Title"
                label="Title"
                className={classes.field}
                onChange={handleTitleChange}
                value={title}
              />
            </div>
            <div className={classes.field}>
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
            {attributes.map((attribut, index) => (
              <div className={classes.inlineWrap}>
                <Tooltip title={attribut.label}>
                  <div className={classes.field}>
                    <Select
                      classes={classes}
                      styles={selectStyles}
                      inputId="react-select-single"
                      options={mapSelectOptions(attributesDropDownOptions)}
                      placeholder="attribut"
                      value={attribut.label && { label: attribut.label, value: attribut.label }}
                      onChange={(value) => {
                        if (attribut.value) {
                          handleChange(value.value, index, 'label');
                        }
                        handleNewRow(attribut, value.value);
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
                        onChange={(e) => handleChange(e.target.value, index, 'value')}
                      />
                    </div>
                  </Tooltip>
                )}
              </div>
            ))}
            <div className={classes.field}>
              <NoSsr>
                <Select
                  classes={classes}
                  styles={selectStyles}
                  inputId="react-select-single"
                  TextFieldProps={{
                    label: 'groups',
                    InputLabelProps: {
                      htmlFor: 'react-select-single',
                      shrink: true,
                    },
                    placeholder: 'groups',
                  }}
                  placeholder="groups"
                  options={mapSelectOptions(groupsDropDownOptions)}
                  value={group && { label: group, value: group }}
                  onChange={handleChangeGroups}
                />
              </NoSsr>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

NodeForm.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  attributes: PropTypes.any.isRequired,
  group: PropTypes.string.isRequired,
  attributesDropDownOptions: PropTypes.any.isRequired,
  groupsDropDownOptions: PropTypes.any.isRequired
};

export default withStyles(styles)(NodeForm);
