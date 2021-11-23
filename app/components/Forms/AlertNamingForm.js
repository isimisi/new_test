import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import NoSsr from '@material-ui/core/NoSsr';
import Select from 'react-select';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from 'react-redux';
import { mapSelectOptions, selectStyles } from '@api/ui/helper';
import {
  titleChange, descriptionChange, addGroup
} from '../../containers/Pages/Alerts/reducers/alertActions';
import {useTranslation} from 'react-i18next';

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


const AlertNamingForm = (props) => {
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const {
    classes,
    title,
    description,
    group,
    groupsDropDownOptions,
  } = props;


  const handleTitleChange = (e) => {
    dispatch(titleChange(e.target.value));
  };

  const handleDescriptionChange = (e) => {
    dispatch(descriptionChange(e.target.value));
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
              {t('alert-naming-form.red_flag_content')}
            </Typography>
            <div>
              <TextField
                name="title"
                placeholder={t('alert-naming-form.red_flag_title')}
                label={t('alert-naming-form.red_flag_title')}
                className={classes.field}
                onChange={handleTitleChange}
                value={title}
              />
            </div>
            <div className={classes.field}>
              <TextField
                name="description"
                className={classes.field}
                placeholder={t('alert-naming-form.red_flag_desc')}
                label={t('alert-naming-form.red_flag_desc')}
                multiline
                onChange={handleDescriptionChange}
                value={description}
              />
            </div>
            <div className={classes.field}>
              <NoSsr>
                <Select
                  classes={classes}
                  styles={selectStyles}
                  inputId="react-select-single-alert-group"
                  TextFieldProps={{
                    label: t('alert-naming-form.red_flag_groups'),
                    InputLabelProps: {
                      htmlFor: 'react-select-single-alert-group',
                      shrink: true,
                    },
                    placeholder: t('alert-naming-form.red_flag_groups'),
                  }}
                  placeholder={t('alert-naming-form.red_flag_groups')}
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
};

AlertNamingForm.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  group: PropTypes.string.isRequired,
  groupsDropDownOptions: PropTypes.any.isRequired,
};


export default withStyles(styles)(AlertNamingForm);
