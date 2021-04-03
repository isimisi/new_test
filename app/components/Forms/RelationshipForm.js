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
  labelChange, descriptionChange, addGroup
} from '../../containers/Pages/Relationships/reducers/relationshipActions';

const suggestions = [
  { label: 'Test1' },
  { label: 'Test2' },
  { label: 'Test3' },
  { label: 'Test4' },
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label,
}));


const typeSuggestions = [
  { label: 'bezier' },
  { label: 'straight' },
  { label: 'step' },
  { label: 'smoothstep' },
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

  const [label, setLabel] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  const [group, setGroup] = React.useState(null);


  const handleLabelChange = (e) => {
    dispatch(labelChange(e.target.value));
    setLabel(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    dispatch(descriptionChange(e.target.value));
    setDescription(e.target.value);
  };

  const handleChangeGroups = (value) => {
    setGroup(value);
    dispatch(addGroup(value));
  };


  return (
    <div style={{ marginBottom: 20 }}>
      <Grid container spacing={3} alignItems="flex-start" direction="row" justify="center">
        <Grid item xs={12} md={12}>
          <Paper className={classes.root}>
            <Typography variant="h5" component="h3">
              Name your
              {' '}
              Relationship
            </Typography>
            <div>
              <TextField
                name="label"
                placeholder="Label"
                label="Label"
                className={classes.field}
                onChange={handleLabelChange}
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
              <Button variant="contained" color="secondary" onClick={() => onSave(label, description, type, group)}>
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
