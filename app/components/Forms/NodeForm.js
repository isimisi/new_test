import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import NoSsr from '@material-ui/core/NoSsr';
import Select from 'react-select';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from 'react-redux';
import {
  titleChange, descriptionChange, addAtrribut, addType, addGroup
} from '../../containers/Pages/Nodes/reducers/nodeActions';

const suggestions = [
  { label: 'Test1' },
  { label: 'Test2' },
  { label: 'Test3' },
  { label: 'Test4' },
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label,
}));

const attributeOptions = [
  { label: 'Test Attribute 1' },
  { label: 'Test Attribute 2' },
  { label: 'Test Attribute 3' },
  { label: 'Test Attribute 4' },
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label,
}));

const typeSuggestions = [
  { label: 'input' },
  { label: 'output' },
  { label: 'selectorNode' },
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label,
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
    onSave
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

  const [title, setTitle] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  const [group, setGroup] = React.useState(null);
  const [type, setType] = React.useState(null);
  const [attributes, setAttributes] = React.useState([{
    attribute: null,
    attributeValue: ''
  }]);

  const handleTitleChange = (e) => {
    dispatch(titleChange(e.target.value));
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    dispatch(descriptionChange(e.target.value));
    setDescription(e.target.value);
  };


  const handleChange = (value, index, changeType) => {
    const newArray = [...attributes];
    newArray[index] = { ...newArray[index], [changeType]: value };
    setAttributes(newArray);

    const reduxArray = [...newArray];
    reduxArray.splice(-1, 1);
    const dispatchableArray = reduxArray.map(v => ({ attributType: v.attribute.label, attributValue: v.attributeValue }));
    dispatch(addAtrribut(dispatchableArray));
  };

  const handleChangeType = (value) => {
    setType(value);
    addType(value);
  };
  const handleChangeGroups = (value) => {
    setGroup(value);
    addGroup(value);
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
              />
            </div>
            {attributes.map((attribute, index) => (
              <div className={classes.inlineWrap}>
                <div className={classes.field}>
                  <Select
                    classes={classes}
                    styles={selectStyles}
                    inputId="react-select-single"
                    options={attributeOptions}
                    placeholder="attribute"
                    value={attribute.attribute}
                    onChange={(value) => {
                      if (attribute.attribute) {
                        handleChange(value, index, 'attribute');
                      } else {
                        const newRow = { ...attribute };
                        newRow.attribute = value;
                        setAttributes([newRow, ...attributes]);
                      }
                    }}
                  />
                </div>
                {attribute.attribute && (
                  <div className={classes.field} style={{ marginLeft: 20 }}>
                    <TextField
                      value={attribute.attributeValue}
                      placeholder="Value"
                      onChange={(e) => handleChange(e.target.value, index, 'attributeValue')}
                    />
                  </div>
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
                    label: 'type',
                    InputLabelProps: {
                      htmlFor: 'react-select-single',
                      shrink: true,
                    },
                    placeholder: 'type',
                  }}
                  placeholder="type"
                  options={typeSuggestions}
                  value={type}
                  onChange={handleChangeType}
                />
              </NoSsr>
            </div>
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
                  options={suggestions}
                  value={group}
                  onChange={handleChangeGroups}
                />
              </NoSsr>
            </div>
            <div>
              <Button variant="contained" color="secondary" onClick={() => onSave(title, description, attributes, type, group)}>
                  Save
              </Button>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

NodeForm.propTypes = {
  classes: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default withStyles(styles)(NodeForm);
