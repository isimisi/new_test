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


function OutputNamingForm(props) {
  const theme = useTheme();

  const {
    classes,
    title,
    description,
    group,
    groupsDropDownOptions,
    onTitleChange,
    onDescriptionChange,
    onGroupChange
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


  return (
    <div style={{ marginBottom: 20 }}>
      <Grid container spacing={3} alignItems="flex-start" direction="row" justify="center">
        <Grid item xs={12} md={12}>
          <Paper className={classes.root}>
            <Typography variant="h5" component="h3">
              Name your Output
            </Typography>
            <div>
              <TextField
                name="title"
                placeholder="Title"
                label="Title"
                className={classes.field}
                onChange={(e) => onTitleChange(e.target.value)}
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
                onChange={(e) => onDescriptionChange(e.target.value)}
                value={description}
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
                  options={mapSelectOptions(groupsDropDownOptions)}
                  value={group && { label: group, value: group }}
                  onChange={(v) => onGroupChange(v.value)}
                />
              </NoSsr>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

OutputNamingForm.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  group: PropTypes.string.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onDescriptionChange: PropTypes.func.isRequired,
  onGroupChange: PropTypes.func.isRequired,
  groupsDropDownOptions: PropTypes.any.isRequired,
};


export default withStyles(styles)(OutputNamingForm);
